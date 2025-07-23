import PropTypes from "prop-types";
import { X } from "lucide-react";
import ModalPortal from "./ModalPortal";

const ImagenModal = ({ imagen, onClose }) => {
  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#545454] p-4">
            <h3 className="text-xl font-semibold text-white">Vista previa de imagen</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 cursor-pointer"
              title="Cerrar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenedor de imagen responsivo */}
          <div className="p-4">
            <div className="relative w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-inner">
              <img
                src={imagen}
                alt="Imagen"
                className="absolute inset-0 w-full h-full object-fit"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3Ctext x='50%' y='50%' font-family='sans-serif' font-size='16' fill='%236b7280' text-anchor='middle' dominant-baseline='middle'%3EImagen no disponible%3C/text%3E%3C/svg%3E";
                }}
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