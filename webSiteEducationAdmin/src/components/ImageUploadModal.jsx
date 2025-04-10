import  { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import PropTypes from "prop-types";
const ImageUploadModal = ({ isOpen, file, onClose, onImageSelected }) => {
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);

  // Si el modal no está abierto o no hay archivo, no renderizamos nada.
  if (!isOpen || !file) return null;

  const handleAccept = () => {
    if (editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();
      canvasScaled.toBlob((blob) => {
        onImageSelected(blob);
        handleClose();
      });
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setScale(1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-1/3 min-w-[300px]">
        {/* Botón de cierre */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 uppercase font-semibold text-gray-600 hover:text-gray-800"
        >
          X
        </button>

        <h2 className="text-xl mb-4 text-center">Imagen seleccionada</h2>

        <div className="flex justify-center">
          <AvatarEditor
            ref={editorRef}
            image={file}
            width={300}
            height={300}
            border={40}
            borderRadius={150} // Para forma completamente circular
            color={[255, 255, 255, 0.6]}
            scale={scale}
            rotate={0}
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-700">Zoom</label>
          <input
            type="range"
            min="1"
            max="3"
            step="0.01"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={handleClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAccept}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
ImageUploadModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  file: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onImageSelected: PropTypes.func.isRequired,
};
export default ImageUploadModal;