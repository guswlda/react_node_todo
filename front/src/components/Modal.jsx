import React, { useState } from 'react';

import { closeModal } from '../redux/slices/modalSlice';
import { IoMdClose } from 'react-icons/io';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';

import { fetchGetItemsData, fetchPostItemData } from '../redux/slices/apiSlice';

const Modal = () => {
  // modal close 시 dispatch (ModalSlice)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData);
  // console.log(user?.email);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    isCompleted: 'false',
    isImportant: 'false',
    userId: user?.email,
  });

  // onchange title, description, date 등 작성 => 기존 formData 값을 다 가져옴, name과 value 값을 받음
  // prev 기존 객체를 받음 -> name : value를 받아서 업데이트 (checkbox일 때 check 확인, 아닐 시 value 확인 )
  const handleChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // submit event (e), (e.preventDefault(); submit 시 페이지 이동, input 전송 동작 금지)
  // async => 비동기 , trycatch
  const handleSubmit = async (e) => {
    e.preventDefault();

    // user email 없을 시 return
    if (!user.email) {
      toast.error('잘못된 사용자 입니다.');
      return;
    }

    // 제목을 입력하지 않고 create task 누를 시 react-toastify 사용 => alert
    if (!formData.title) {
      toast.error('제목을 입력해 주세요.');
      return;
    }

    if (!formData.description) {
      toast.error('내용을 입력해 주세요.');
      return;
    }

    if (!formData.date) {
      toast.error('날짜를 입력해 주세요.');
      return;
    }

    // console.log(formData);

    // 데이터 베이스 post 이후 바로 화면에 나타내기 위함
    // post로 할일을 추가 -> 할일 추가와 동시에 modal 닫힘
    // dispatch를 통해 getitem 데이터를 화면에 바로 가져옴
    try {
      await dispatch(fetchPostItemData(formData)).unwrap();
      toast.success('할일이 추가되었습니다.');

      handleCloseModal();

      await dispatch(fetchGetItemsData(user?.email)).unwrap();
    } catch (error) {
      console.error('Error adding task: ', error);
      toast.error('할일 추가에 실패하였습니다.');
    }
  };

  //  close 버튼 클릭 시 dispatch (closeModal) => modalSlice
  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className="modal fixed bg-black bg-opacity-50 flex items-center justify-center w-full h-full left-0 top-0 z-50 ">
      <div className="form-wrapper bg-gray-700 rounded-md w-1/2 flex flex-col items-center relative p-4 ">
        <h2 className="text-2xl py-2 border-b border-gray-300 w-fit font-semibold">
          할일 추가하기
        </h2>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="input-control">
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력해주세요."
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="input-control">
            <label htmlFor="description">내용</label>
            <textarea
              id="description"
              name="description"
              placeholder="내용을 입력해주세요."
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="input-control">
            <label htmlFor="date">입력 날짜</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isCompleted">완료 여부</label>
            <input
              type="checkbox"
              id="isCompleted"
              name="isCompleted"
              value={formData.isCompleted}
              onChange={handleChange}
            />
          </div>
          <div className="input-control toggler">
            <label htmlFor="isImportant">중요성 여부</label>
            <input
              type="checkbox"
              id="isImportant"
              name="isImportant"
              value={formData.isImportant}
              onChange={handleChange}
            />
          </div>
          <div className="sub-btn flex justify-end">
            <button
              type="submit"
              className="flex justify-end bg-black w-fit py-3 px-6 rounded-md hover:bg-slate-900"
            >
              Create Task
            </button>
          </div>
        </form>

        <IoMdClose
          onClick={handleCloseModal}
          className="absolute right-10 top-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Modal;
