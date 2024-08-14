import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { closeModal } from '../redux/slices/modalSlice';

const Modal = () => {
  // modal close 시 dispatch
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal fixed bg-black bg-opacity-50 flex items-center justify-center w-full h-full left-0 top-0 z-50 ">
      <div className="form-wrapper bg-gray-600 rounded-md w-1/2 h-[40vh]">
        <IoMdClose onClick={handleCloseModal} />
      </div>
    </div>
  );
};

export default Modal;
