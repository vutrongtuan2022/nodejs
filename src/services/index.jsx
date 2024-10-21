import axios from "axios";

//1. Thiết lập axiosClient
const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json", // Cài đặt mặc định cấu hình HTTP
  },
  baseURL: (process.env.NODE_ENV = "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION), //Dựa trên môi trường hiện tại (development hoặc production), client sẽ gửi yêu cầu đến API URL tương ứng. Nếu ở môi trường development, sử dụng URL từ NEXT_PUBLIC_API_URL_DEV, còn nếu ở production thì dùng NEXT_PUBLIC_API_URL_PRODUCTION.
  timeout: 15000, //Đặt thời gian timeout là 15 giây.Nếu một yêu cầu mất quá nhiều thời gian thì nó sẽ hủy
  timeoutErrorMessage: "Timeout error request", //thông báo lỗi nếu yêu cầu bị timeout
});

//2. Interceptors cho yêu cầu HTTP (request interceptor)
axiosClient.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token;
});
