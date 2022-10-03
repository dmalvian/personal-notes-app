import { toast } from 'react-toastify';

const showFormattedDate = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

const showToast = (message) => {
  toast.success(message, {
    position: "bottom-left",
    theme: "dark",
    type: "success",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
}

export { showFormattedDate, showToast };
