import { createSlice } from '@reduxjs/toolkit';

export const initialPopupState = {
  isShowPopup: false,
  data: {},
};
/*
SHOW_POPUP: Action này sẽ cập nhật State với thông tin sản phẩm tương ứng và hiển thị ra Popup.
HIDE_POPUP: Action này sẽ thay đổi State để ẩn Popup đi.
*/

const popupSlice = createSlice({
  name: 'popup',
  initialState: initialPopupState,
  reducers: {
    SHOW_POPUP(state, action) {
      state.isShowPopup = true;
      state.data = action.payload;
    },
    HIDE_POPUP(state) {
      state.isShowPopup = false;
      state.data = {};
    },
  },
});

export const popupActions = popupSlice.actions;
export default popupSlice.reducer;
