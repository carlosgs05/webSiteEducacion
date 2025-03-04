import PropTypes from "prop-types";
import { X } from "lucide-react";
import ModalPortal from "./ModalPortal";

const ImagenModal = ({ imagen, onClose }) => {
  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-5 relative max-w-2xl w-full">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-2 mb-4">
            <h3 className="text-xl font-semibold text-gray-800">Imagen</h3>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-red-500 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenedor fijo para la imagen */}
          <div className="flex justify-center">
            <div className="w-[600px] h-[500px] overflow-hidden rounded-lg">
              <img
                src={imagen}
                alt="Imagen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

ImagenModal.propTypes = {
  imagen: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImagenModal;