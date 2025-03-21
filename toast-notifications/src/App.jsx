import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";

const Toast = ({ message, type, onClose, id }) => {
  useEffect(() => {
    const timerID = setTimeout(() => {
      onClose(id);
    }, 3000);

    return () => clearTimeout(timerID);
  }, [onClose, id]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      style={{
        padding: "12px 20px",
        backgroundColor:
          type === "success" ? "green" : type === "error" ? "red" : "blue",
        color: "white",
        borderRadius: "5px",
        fontSize: "14px",
        marginBottom: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        minWidth: "200px",
      }}
    >
      {message}
    </motion.div>
  );
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    setToasts((prevToasts) => [...prevToasts, { message, type, id: uuidv4() }]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <>
      <div>
        <button onClick={() => addToast("Success Message", "success")}>
          Show Success
        </button>
        <button onClick={() => addToast("Error Message", "error")}>
          Show Error
        </button>
        <button onClick={() => addToast("Info Message", "info")}>
          Show Info
        </button>
      </div>

      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          zIndex: 1000,
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <Toast key={toast.id} {...toast} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

const App = () => {
  return (
    <div>
      <ToastContainer />
    </div>
  );
};

export default App;
