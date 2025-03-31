import React from "react";

const Modal = ({ onConfirm, onCancel ,message}) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white w-[500px] flex flex-col gap-4 p-[50px_50px] rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl text-center mb-4">
          {message}
        </h2>
        <div className="flex justify-center items-center gap-14 mt-14">
          <button onClick={onConfirm} className="bg-red-500 text-white py-2 px-10 rounded">
            Yes
          </button>
          <button onClick={onCancel} className="bg-blue-500 text-white py-2 px-10 rounded">
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
