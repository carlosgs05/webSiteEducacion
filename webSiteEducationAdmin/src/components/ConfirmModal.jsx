import PropTypes from "prop-types";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo semitransparente */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {/* Contenedor del modal */}
      <div className="relative bg-white p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-300">
        <p className="mb-6 text-lg font-medium text-gray-800 text-center">
          {message}
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={onCancel} 
            className="bg-[#262D73] hover:bg-[#36395d] text-white font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            No
          </button>
          <button 
            onClick={onConfirm} 
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Sí
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmModal.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmModal;
