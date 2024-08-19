import React, { useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
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
// token => authData?.sub 전체 데이터로 가져옴 (콘솔 application token 제외) ?는 null일 경우
// redux thunk (apiSlice) 데이터 확인
// const userKey = authData?.sub; => .sub (함수로 값을 가져옴)
const ItemPanel = ({ pageTitle, filterCompleted, filterImportant }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.authData);
  const isOpen = useSelector((state) => state.modal.isOpen);
  const userKey = authData?.email;
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

    // async 비동기 시 trycatch 가능, userkey를 사용하여 로딩 시 getitem 가져옴
    // loading skeleton (loadingskeletion.jsx 사용)
    // loading true가 될 때 로딩을 한 후 fetchGetItemsData(DB 전체 값) 불러와서 화면에 보여줌
    // finally (false) : loading 동작 off
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

  // 1. home 메뉴를 선택할 때:
  // - all메뉴를 선택하면 첫번째 filter 조건이 true이므로 모든 task를 반환
  // - 1번에서 반환된 모든 tasks를 대상으로 두번째 filter 조건을 적용
  // - filterImportant가 undefined이면 조건이 true 이므로 모든 task를 반환

  // 2. Completed 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 true이면 task.iscompleled가 true인 task만 반환

  // 3. Proceeding 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 false이므로 return 문으로 이동하여 filterCompleted 조건을 판단
  // - filterCompleted가 false이면 task.iscompleled가 false인 task만 반환

  // 4. Important 메뉴를 선택할 때:
  // - 첫번째 필터 조건에서 if문이 true이므로 두번째 필터 조건으로 이동
  // - 두번째 filter 조건에서 filterImportant가 없으면 true이므로 모든 task를 반환(home, Completed, Proceeding과 동일)
  // - filterImportant가 true이면 task.isimportant가 true인 task만 반환

  // completed 페이지 filterCompleted = all (home) / iscompleted (true) completed 페이지
  // getTasksData => (props를 통해 ) filteredTask를 통해 filter (all일 경우 true, all 아니라면 return iscompleted)
  // filter 한번 더 받아 important undefinde 일 시 모두 나타냄 / important(true) 경우 important 페이지

  const filteredTasks = getTasksData
    ?.filter((task) => {
      if (filterCompleted === 'all') return true;
      return filterCompleted ? task.iscompleted : !task.iscompleted;
    })
    .filter((task) => {
      if (filterImportant === undefined) return true;
      return filterImportant ? task.isimportant : !task.isimportant;
    });
  console.log(filteredTasks);

  return (
    <div className="panel bg-[#212121] w-4/5 h-full rounded-md border border-gray-500 py-5 px-4 overflow-y-auto">
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
              filteredTasks?.map((item, idx) => <Item key={idx} task={item} />)
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
