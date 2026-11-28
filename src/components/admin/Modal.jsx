import useModalCloseOnEscape from "../../hook/useModalCloseOnEscape";

const Modal = ({ children, onClose }) => {
  useModalCloseOnEscape(onClose);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* الخلفية */}
      <div
        className="absolute inset-0 !bg-green-900/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* محتوى المودال */}
      <div className="relative !bg-white w-[95%] sm:w-[90%] md:w-[700px] max-h-[90vh] overflow-y-auto !rounded-2xl !shadow-xl !p-6 animate-fadeIn">
        {children}
      </div>
    </div>
  );
};

export default Modal;
