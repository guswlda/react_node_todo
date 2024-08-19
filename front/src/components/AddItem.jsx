import React from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/slices/modalSlice';

const AddItem = () => {
  // modal dispatch를 통해 상태 변경
  const dispatch = useDispatch();

  // 버튼 클릭 시 modal 오픈 (버튼에 onclick)
  // 할일 추가하기 =>  modalType, task를 가져와야함 (task : null)
  const handleOpenModal = () => {
    dispatch(openModal({ modalType: 'create', task: null }));
  };

  return (
    <div className="add-card w-1/3 h-[25vh] p-[0.25rem]">
      <div className="w-full h-full border border-gray-500 rounded-md flex items-center justify-center">
        <button
          className="flex items-center gap-x-2 group"
          onClick={handleOpenModal}
        >
          <IoAddCircleOutline className="w-8 h-8 font-light group-hover:text-gray-200 cursor-pointer" />
          <span className="font-customFontKr text-gray-400 group-hover:text-gray-200 cursor-pointer ">
            할일 추가하기
          </span>
        </button>
      </div>
    </div>
  );
};

export default AddItem;
