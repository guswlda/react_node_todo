import { createSlice } from '@reduxjs/toolkit';
// 1. slice 생성

const initialState = {
  // 2. 초기 상태 정의
  authData: JSON.stringify(localStorage.getItem('authData')) || null,
  token: localStorage.getItem('token') | null,
};

export const authSlice = createSlice({
  // 3 slice 생성
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // update 상태값 변경
      state.authData = action.payload.authData;
      state.token = action.payload.token;
      localStorage.setItem('authData', JSON.stringify(action.payload.authData));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      // 상태값 비움
      state.authData = null;
      state.token = null;
      localStorage.removeItem('authData');
      localStorage.removeItem('token');
    },
  },
});

// export const authActions = authSlice.actions;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer; // 4. export 된 함수들을 store에 등록
