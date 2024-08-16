import React, { useState } from 'react';

import { MdEditDocument } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

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

  const changeCompleted = () => {
    setIsCompleted(!isCompleted);

    const updateCompletedData = {
      itemId: _id,
      isCompleted: isCompleted,
    };

    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateCompletedData),
    };

    dispatch(fetchUpdateCompletedItemData(options));
  };

  return (
    <div className="item w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md py-3 px-4 flex flex-col justify-between bg-gray-950">
        <div className="upper">
          <h2 className="text-xl font-normal mb-3 relative pb-2">
            <span className="w-full h-[1px] bg-gray-500 absolute bottom-0"></span>
            {title}
          </h2>
          <p>{description}</p>
        </div>
        <div className="lower">
          <p className="text-sm mb-1">{date}</p>
          <div className="item-footer flex justify-between">
            <div className="item-footer-left flex gap-x-2">
              {isCompleted ? (
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

              <button className="block py-1 px-4 bg-red-400 text-sm text-white rounded-md">
                Important
              </button>
            </div>
            <div className="item-footer-right flex gap-x-4 items-center">
              <button>
                <MdEditDocument className="w-5 h-5" />
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
