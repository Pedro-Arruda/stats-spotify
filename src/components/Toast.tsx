import { toast, ToastOptions } from "react-toastify";

export const infoToast = (
  message: string,
  description?: string,
  options?: ToastOptions
) =>
  toast.info(
    <>
      <p>{message}</p>
      {description && <span>{description}</span>}
    </>,
    {
      position: "bottom-right",
      theme: "colored",
      style: {
        background: "var(--info)",
      },
      closeButton: false,
      hideProgressBar: true,
      ...options,
    }
  );

export const successToast = (
  message: string,
  description?: string,
  options?: ToastOptions
) =>
  toast.success(
    <>
      <p>{message}</p>
      {description && <span>{description}</span>}
    </>,
    {
      position: "bottom-right",
      theme: "dark",
      style: {
        background: "#181818",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#48BF70",
      },
      closeButton: false,
      hideProgressBar: true,
      ...options,
    }
  );

export const warnToast = (
  message: string,
  description?: string,
  options?: ToastOptions
) =>
  toast.warning(
    <>
      <p>{message}</p>
      {description && <span>{description}</span>}
    </>,
    {
      position: "bottom-right",
      theme: "colored",
      style: {
        background: "var(--warning)",
        color: "var(--text)",
      },
      closeButton: false,
      hideProgressBar: true,
      ...options,
    }
  );

export const errorToast = (
  message: string,
  description?: string,
  options?: ToastOptions
) =>
  toast.error(
    <>
      <p>{message}</p>
      {description && <span>{description}</span>}
    </>,
    {
      position: "bottom-right",
      theme: "dark",
      style: {
        background: "#181818",
        borderStyle: "solid",
        borderWidth: "1px",
        borderColor: "#D71818",
      },
      closeButton: false,
      hideProgressBar: true,
      ...options,
    }
  );
