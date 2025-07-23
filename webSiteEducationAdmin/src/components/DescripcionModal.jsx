import PropTypes from "prop-types";
import { X } from "lucide-react";
import ModalPortal from "./ModalPortal";

const DescripcionModal = ({ descripcion, onClose, nombre }) => {
  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
          {/* Encabezado */}
          <div className="bg-[#545454] p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {nombre}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 cursor-pointer"
              title="Cerrar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido con scroll interno */}
          <div className="p-5 overflow-y-auto flex-1">
            <div
              className="prose max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: descripcion }}
            />
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

DescripcionModal.propTypes = {
  descripcion: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  nombre: PropTypes.string.isRequired,
};

export default DescripcionModal;