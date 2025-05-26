import React from "react";
import Router from "./router/Router";
import { Bounce, ToastContainer, toast } from "react-toastify";

import 'primeicons/primeicons.css';
        
export default function App() {
  return (
    <div>
      <Router />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="light"
        transition={Bounce}
        draggable
        pauseOnFocusLoss
        pauseOnHover
      />
    </div>
  );
}
