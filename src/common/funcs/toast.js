import { toast } from "react-toastify";

export const toastText = (msg) => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    className: "toastify-custom",
    // icon: IconToastifyCustom({ type: "info" }),
  });
};
export const toastSuccess = (msg) => {
  toast.success(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: true,
    className: "toastify-custom-success",
  });
};
export const toastInfo = (msg) => {
  toast.info(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: true,
    className: "toastify-custom-info",
    // icon: IconToastifyCustom({ type: "info" }),
  });
};
export const toastWarn = (msg) => {
  toast.warn(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: true,
    className: "toastify-custom-warn",
    // icon: IconToastifyCustom({ type: "info" }),
  });
};
export const toastError = (msg) => {
  toast.error(msg, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: true,
    className: "toastify-custom-error",
    // icon: IconToastifyCustom({ type: "info" }),
  });
};
