import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // toolkit import
import {
  DELETE_TASK_API_URL,
  GET_TASKS_API_URL,
  POST_TASK_API_URL,
  UPDATE_COMPLETED_TASK_API_URL,
} from '../../utils/apiUrl'; // API Url import
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from '../../utils/requestMethods'; // API Get method import

// 공통된 비동기 액션 생성 로직을 별도의 함수로 분리
// get createthunk 생성
// async 비동기 requestMethod로 보냄 => requestMethod에서 error인지 아닌지 확인
// requestMethod에서 apiUrl 가져옴 (return)
const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (email) => {
    // console.log(apiURL, email);
    const fullPath = `${apiURL}/${email}`;
    return await getRequest(fullPath);
  });
};

// post createthunk 생성
// post body 값을 넣으므로 url, email 넣을 필요가 없음
// postData => formData, JSON 문자열화 (목적 : 다른 언어도 사용)
// postReques (url, options) 두 가지 형태를 받음
// option => defaultOptions (requestMethods.js 참고)
const postItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    const options = {
      body: JSON.stringify(postData), // 표준 JSON 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

// delete createthunk 생성
// deleteRoutes (itemId) => id 받음
// get 방식과 같이 생성 (url을 통해 id를 넣고 삭제)
const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    const options = {
      method: 'DELETE',
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

const updateCompletedItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (options) => {
    console.log(options);
    return await patchRequest(apiURL, options);
  });
};

// Get => getItemsFetchThunk (위의 로직 시작)
export const fetchGetItemsData = getItemsFetchThunk(
  'fetchGetItems', // actionType
  GET_TASKS_API_URL // apiUrl
);

// post
export const fetchPostItemData = postItemFetchThunk(
  'fetchPostItem', // actionType
  POST_TASK_API_URL // apiUrl
);

// delete
export const fetchDeleteItemData = deleteItemFetchThunk(
  'fetchDeleteItem', // actionType
  DELETE_TASK_API_URL // apiUrl
);

// patch
export const fetchUpdateCompletedItemData = updateCompletedItemFetchThunk(
  'fetchUpdateCompleted', // actionType
  UPDATE_COMPLETED_TASK_API_URL // apiUrl
);

// handleFullfilled : 성공 (공통으로 사용)
const handleFullfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

// handleRejected : 오류 (공통으로 사용)
const handleRejected = (state, action) => {
  console.log(action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    getItemsData: null,
    postItemData: null,
    deleteItemData: null,
    UpdateCompletedData: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFullfilled('getItemsData'))
      .addCase(fetchGetItemsData.rejected, handleRejected)
      .addCase(fetchPostItemData.fulfilled, handleFullfilled('postItemData'))
      .addCase(fetchPostItemData.rejected, handleRejected)
      .addCase(
        fetchDeleteItemData.fulfilled,
        handleFullfilled('deleteItemData')
      )
      .addCase(fetchDeleteItemData.rejected, handleRejected)
      .addCase(
        fetchUpdateCompletedItemData.fulfilled,
        handleFullfilled('UpdateCompletedData')
      )
      .addCase(fetchUpdateCompletedItemData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
