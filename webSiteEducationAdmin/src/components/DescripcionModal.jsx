import PropTypes from "prop-types";
import { X } from "lucide-react";

const DescripcionModal = ({ descripcion, onClose, nombre }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-5 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{nombre}</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: descripcion }}
        />
      </div>
    </div>
  );
};

DescripcionModal.propTypes = {
  descripcion: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  nombre: PropTypes.string.isRequired,
};

export default DescripcionModal;
