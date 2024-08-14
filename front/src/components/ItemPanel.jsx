import React, { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import PageTitle from './PageTitle';
import AddItem from './AddItem';
import Modal from './Modal';
import Item from './Item';

import { useDispatch, useSelector } from 'react-redux';
import { fetchGetItemsData } from '../redux/slices/apiSlice';
import LoadingSkeletion from './LoadingSkeletion';

// useEffect -> dispatch
// authSlice에서 state selector 가져옴
// modal isOpen일 때 (modalSlice) => event 처리하면 값이 true일때 나타남
// token => authData?.sub 전체 데이터로 가져옴 (콘솔 application token 제외)
// redux thunk (apiSlice) 데이터 확인
const ItemPanel = ({ pageTitle }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const userKey = authData?.email;
  // const userKey = authData?.sub;
  const getTasksData = useSelector((state) => state.api.getItemsData);

  const [loading, setLoading] = useState(false);

  // console.log(getTasksData);
  // console.log(userKey);
  // console.log(isOpen);

  // console.log(loading);

  useEffect(() => {
    if (!userKey) {
      return;
    }

    // 비동기 시 trycatch 가능,
    const fetchGetItems = async () => {
      try {
        setLoading(true);
        await dispatch(fetchGetItemsData(userKey)).unwrap(); // useEffect 내부에서 async/await 사용 X => unwrap 사용
      } catch (error) {
        console.error('Failed to fetch items: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGetItems();
  }, [dispatch, userKey]);

  return (
    <div className="panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-0 px-4">
      {userKey ? (
        <div className="panel-wrapper">
          {isOpen && <Modal />}

          <PageTitle title={pageTitle} />

          <div className="items flex flex-wrap">
            {loading ? (
              <SkeletonTheme
                baseColor="#202020"
                highlightColor="#444"
                width="100%"
                height="25vh"
              >
                <LoadingSkeletion />
              </SkeletonTheme>
            ) : (
              getTasksData?.map((item, idx) => <Item key={idx} task={item} />)
            )}

            <AddItem />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <button className="font-customFontKr flex justify-center items-center gap-2 bg-gray-300 text-gray-900 py-2 px-4 rounded-md w-fit">
            <span className="text-sm font-semibold">
              로그인이 필요한 서비스 입니다.
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemPanel;
