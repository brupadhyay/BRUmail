import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastStyle = {
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

const toastReducer = (type, message) => {
    switch(type){
        case 'success':
            toast.success(message, toastStyle);
            break;

        case 'error':
            toast.error(message, toastStyle);
            break;
        
        case 'warn':
            toast.warn(message, toastStyle);
            break;

        case 'info':
            toast.info(message, toastStyle);
            break;
        
        default: break;
    }
};

export { toastReducer };