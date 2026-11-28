const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-900/50 !px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <div className="!p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
