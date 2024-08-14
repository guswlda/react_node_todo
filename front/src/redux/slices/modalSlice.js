import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  // 3 slice 생성
  name: 'modal',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openModal: (state) => {
      // open -> state true
      state.isOpen = true;
    },
    closeModal: (state) => {
      // close -> false
      state.isOpen = false;
    },
  },
});

// export const authActions = authSlice.actions;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
