import axios from "axios";
import { delay } from "../common/funcs/delay";
import { getKeyCert } from "~/common/funcs/optionConvert";
import { toastInfo, toastSuccess, toastWarn } from "../common/funcs/toast";
import { store } from "../redux/store";
import { logout } from "../redux/reducer/auth";
import { setInfoUser } from "../redux/reducer/user";
//1. Thiết lập axiosClient
const axiosClient = axios.create({
  headers: {
    "Content-Type": "application/json", // Cài đặt mặc định cấu hình HTTP với Content-Type là JSON
  },
  baseURL: (process.env.NODE_ENV = "development"
    ? process.env.NEXT_PUBLIC_API_URL_DEV
    : process.env.NEXT_PUBLIC_API_URL_PRODUCTION), // Dựa trên môi trường hiện tại (development hoặc production), client sẽ gửi yêu cầu đến API URL tương ứng. Nếu ở môi trường development, sử dụng URL từ NEXT_PUBLIC_API_URL_DEV, còn nếu ở production thì dùng NEXT_PUBLIC_API_URL_PRODUCTION.
  timeout: 15000, // Đặt thời gian timeout là 15 giây. Nếu một yêu cầu mất quá nhiều thời gian, nó sẽ bị hủy.
  timeoutErrorMessage: "Timeout error request", // Thông báo lỗi nếu yêu cầu bị timeout
});

//2. Interceptors cho yêu cầu HTTP (request interceptor)
axiosClient.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token; // Lấy token từ state của Redux (store)
  config.headers.Authorization = token ? "Bearer" + token : null; // Nếu có token, thêm token vào header Authorization, nếu không có thì để null
  if (!(config.data instanceof FormData)) {
    // Nếu dữ liệu không phải là FormData (dùng cho upload file)
    config.data = {
      ...getKeyCert(), // Thêm dữ liệu từ hàm getKeyCert() (gồm thời gian và key)
      ...config.data, // Thêm dữ liệu khác vào yêu cầu (nếu có)
    };
  }
  return config; // Trả về config đã được cấu hình
});

//3. Interceptors cho phản hồi HTTP (response interceptor)
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // Nếu có phản hồi và có dữ liệu
      return response.data; // Trả về dữ liệu từ phản hồi
    }
    return response; // Trả về toàn bộ phản hồi nếu không có dữ liệu cụ thể
  },
  (error) => {
    if (error.response && error.response.data) {
      // Nếu có lỗi và phản hồi lỗi có chứa dữ liệu lỗi
      throw error.response.data; // Ném ra dữ liệu lỗi để xử lý sau
    }
    if (!axios.isCancel(error)) throw error; // Nếu không phải lỗi do hủy yêu cầu, ném lỗi khác ra để xử lý
  }
);

export default axiosClient; // Xuất axiosClient để sử dụng trong các phần khác của ứng dụng

export const httpRequest = async ({
  http,
  setLoading,
  msgSuccess = "Thành công",
  showMessageSuccess = false,
  showMessageFailed = false,
  onError = false,
}) => {
  //Nếu có hàm setLoading,đặt trạng thái loading thành true
  setLoading && setLoading(() => true);
  try {
    await delay(500); //tạo độ trễ giả định là 500ms
    const res = await http; //Gửi yêu cầu HTTp và chờ kết quả

    //Nếu kết quả trả về không có lỗi thì mã lỗi là 0
    if (res.error.code === 0) {
      showMessageSuccess &&
        msgSuccess &&
        toastSuccess({ msg: msgSuccess || res?.res?.error?.message });
      setLoading && setLoading(() => false); // Tắt trạng thái loading
      return res.data || true; //Trả về dữ liệu của phản hồi hoặc true nếu không có dữ liệu
    } else {
      // Nếu có lỗi trong phản hồi
      setLoading && setLoading(() => false); // Tắt trạng thái loading
      onError && onError(); //Gọi hàm onError nếu có
      throw res?.onError?.message; //Ném ra lỗi để sử lý ở phần catch
    }
  } catch (err) {
    //Sử lý các trường hợp lỗi khác nhau
    if (err?.status === 401 || err?.status === 403) {
      //Nếu lỗi là do xác thực (401 và 403)
      store.dispatch(logout()); // Đăng xuất người dùng
      store.dispatch(setInfoUser(null));
    } else if (typeof err == "string") {
      //Nếu lỗi laf1 chuỗi (thông báo cụ thể )
      showMessageFailed && toastWarn({ msg: err || "Có lỗi đã xảy ra" }); //Hiển thị thông báo cảnh báo
      setLoading && setLoading(() => false); //Tắt trạng thái loading
    } else if (err.code == "ERR_NETWORK" || err.code == "ECONNABORTED") {
      //Nếu lỗi là do vấn đề mạng
      showMessageFailed && toastInfo({ msg: "kiểm tra kết nối internet" }); //hiển thị thông báo kết nối mạng;
      setLoading && setLoading(() => false); //Tắt trạng thái loading
    } else {
      //Xử lý các lỗi khác
      showMessageFailed &&
        toastWarn({ msg: err?.error?.message || "Có lỗi đã xảy ra" }); // Hiển thị thông báo lỗi
      setLoading && setLoading(() => false); //tắt trạng thái loading
    }
  } finally {
    //Đảm bảo luôn tắt trạng thái loading dù có lỗi hay không
    setLoading && setLoading(() => false);
  }
};
