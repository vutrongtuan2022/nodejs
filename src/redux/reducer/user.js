import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa giao diện của người dùng (IUser) trong JavaScript
// Không cần kiểu dữ liệu trong JavaScript, chỉ giữ cấu trúc của đối tượng
const initialState = {
  infoUser: null, // Trạng thái ban đầu,infoUser được gán là null
};
export const userSlice = createSlice({
  name: "user", //Tên của slice
  initialState, //trạng thái ban đầu
  reducers: {
    //Hàm reducer để cập nhật thông tin người dùng
    setInfoUser: (state, action) => {
      state.infoUser = action?.payload; // Cập nhật infoUser bằng dữ liệu nhận được từ action.payload
    },
  },
});
// Xuất ra hàm hành động setInfoUser để sử dụng
export const { setInfoUser } = userSlice.actions;
// Xuất ra reducer của slice này để tích hợp vào store
export default userSlice.reducer;
