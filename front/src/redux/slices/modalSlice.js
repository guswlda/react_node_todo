import { createSlice } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  // 3 slice 생성
  name: 'modal',
  initialState: {
    isOpen: false,
    modalType: 'create',
    task: null,
  },
  reducers: {
    openModal: (state, action) => {
      // open -> state true
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.task = action.payload.task;
      // console.log(state.modalType, state.task.iscompleted);
    },
    // close -> false
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

// export const authActions = authSlice.actions;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
