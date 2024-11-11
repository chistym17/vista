import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import router from "./assets/Routes/Router.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="light"
    />
  </React.StrictMode>
);
