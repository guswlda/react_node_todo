import React, { useState } from 'react';

import { MdEditDocument } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';

import {
  fetchDeleteItemData,
  fetchGetItemsData,
  fetchUpdateCompletedItemData,
} from '../redux/slices/apiSlice';

// 데이터 베이스에서 값 가져옴
const Item = ({ task }) => {
  const { _id, title, description, date, iscompleted, isimportant, userid } =
    task;
  // console.log(task)

  const dispatch = useDispatch();

  const [isCompleted, setIsCompleted] = useState(iscompleted);

  // 만약 _id primary key가 없다면 잘못된 사용자이다 (react toast 사용)
  // 예약어는 변수로 사용하지 않는 것을 권장 (confirm)
  const deleteItem = async () => {
    const confirm = window.confirm('아이템을 삭제하시겠습니까?');
    // console.log(confirm);
    if (!confirm) return;

    if (!_id) {
      toast.error('잘못된 사용자입니다.');
      return;
    }

    // apiSlice 사용한 fetchDeleteItemData (item 삭제)
    try {
      await dispatch(fetchDeleteItemData(_id)).unwrap(); // unwrap 사용
      toast.success('아이템이 삭제 되었습니다.');
      await dispatch(fetchGetItemsData(userid)).unwrap(); // get userid 사용 (화면이 자동으로 기존의 데이터를 다시 가져옴)
    } catch (error) {
      toast.error('아이템 삭제를 실패하였습니다.');
      console.error(error);
    }
  };

  // setIsCompleted(!isCompleted)을 호출하면 상태 업데이트가 비동기적으로 이루어지기 때문에, isCompleted의 값이 즉시 변경되지 않는다.
  // 따라서 updateCompletedData 객체를 생성할 때 isCompleted의 이전 값이 사용된다. 이로 인해 true/false가 한 단계씩 밀리게 된다.
  // isCompleted를 눌러도 db에서는 값이 변경되지 X
  // 비동기적 생성으로 새로운 값(newIsCompleted) 만들어 db에 fetchUpdateCompletedItemData로 보내줌 (requestMethod)
  // 상태를 미리 업데이트 하여 반영된 값을 전달

  const changeCompleted = async () => {
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);

    const updateCompletedData = {
      itemId: _id,
      isCompleted: newIsCompleted,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    await dispatch(fetchUpdateCompletedItemData(options)).unwrap();
    newIsCompleted
      ? toast.success('할일을 완료하였습니다.')
      : toast.error('할일을 완료하지 못하였습니다.');
    await dispatch(fetchGetItemsData(userid)).unwrap();
  };

  // 수정 버튼을 누를 시 수정 가능 (modalType을 update 시 task 나타남)
  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'update', task }));
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md py-3 px-4 flex flex-col justify-between bg-gray-950">
        <div className="upper">
          <h2 className="text-xl font-normal mb-3 relative pb-2">
            <span className="w-full h-[1px] bg-gray-500 absolute bottom-0"></span>
            {title}
          </h2>
          <p style={{ whiteSpace: 'pre-wrap' }}>{description}</p>
        </div>
        <div className="lower">
          <p className="text-sm mb-1">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-x-2">
              {iscompleted ? (
                <button
                  className="block py-1 px-4 bg-green-400 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  Completed
                </button>
              ) : (
                <button
                  className="block py-1 px-4 bg-cyan-500 text-sm text-white rounded-md"
                  onClick={changeCompleted}
                >
                  InCompleted
                </button>
              )}
              {isimportant && (
                <button className="block py-1 px-4 bg-red-400 text-sm text-white rounded-md">
                  Important
                </button>
              )}
            </div>
            <div className="item-footer-right flex gap-x-4 items-center">
              <button>
                <MdEditDocument className="w-5 h-5" onClick={handleOpenModal} />
              </button>
              <button>
                <FaTrash className="delete" onClick={deleteItem} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
