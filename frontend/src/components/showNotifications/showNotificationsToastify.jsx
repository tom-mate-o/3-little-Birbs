import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './costumToastifyCss.css'; 



export default function showNotifications(message, type) {
    const options = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
            fontSize: '15px',
            whiteSpace: 'pre-wrap',
        },
        className: 'custom-toast'
        
    };

    const customsuccess = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        style: {
            fontSize: '15px',
            backgroundColor: "#13C460",
            whiteSpace: 'pre-wrap',
        },
        className: 'custom-toast'
        
    };


    const customwarn = {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
          fontSize: '15px',
          backgroundColor: "darkorange",
          whiteSpace: 'pre-wrap',
      },
      className: 'custom-toast'
      
  };

    switch(type) {
        case 'success':
          toast.success(message, options);
          break;
        case 'error':
          toast.error(message, options);
          break;
        case 'info':
          toast.info(message, options);
          break;
        case 'warn':
          toast.warn(message, customwarn);
          break;
        default:
          toast(message, options);
      }
    }

