import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'; // toolkit import
import { GET_TASKS_API_URL } from '../../utils/apiUrl'; // API Url import
import { getRequest } from '../../utils/requestMethods'; // API Get method import

// 공통된 비동기 액션 생성 로직을 별도의 함수로 분리
const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (email) => {
    // console.log(apiURL, email);
    const fullPath = `${apiURL}/${email}`;
    // async 비동기 requestMethod로 보냄 => requestMethod에서 error인지 아닌지 확인
    return await getRequest(fullPath); // requestMethod에서 apiUrl 가져옴 (return)
  });
};

// fetchGetItemsData => getItemsFetchThunk (위의 로직 시작)
export const fetchGetItemsData = getItemsFetchThunk(
  'fetchGetItems', // actionType
  GET_TASKS_API_URL // apiUrl
);

// handleFullfilled
const handleFullfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

// handleRejected : 오류
const handleRejected = (state, action) => {
  console.log(action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    getItemsData: null,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFullfilled('getItemsData'))
      .addCase(fetchGetItemsData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
