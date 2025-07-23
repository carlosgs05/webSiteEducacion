import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import ModalPortal from "../../components/ModalPortal";
import swal from "sweetalert";

// Spinner para el botón
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

const RegistroModal = ({ onClose, editingRecord }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRecord) {
      setTitulo(editingRecord.Titulo || "");
      setDescripcion(editingRecord.Descripcion || "");
      setUrl(editingRecord.Url || "");
    } else {
      setTitulo("");
      setDescripcion("");
      setUrl("");
    }
    setErrors({});
  }, [editingRecord]);

  // Limpia errores de un campo al cambiar
  const handleFieldChange = (field, setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("Titulo", titulo);
    formData.append("Descripcion", descripcion);
    formData.append("Url", url);

    try {
      setUploading(true);
      setProgress(0);

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      };

      if (editingRecord) {
        await axios.post(
          `https://pagina-educacion-backend-production.up.railway.app/api/updateDocumento/${editingRecord.IdDocumento}`,
          formData,
          { 
            headers: { "Content-Type": "multipart/form-data" },
            ...config
          }
        );
        swal("¡Éxito!", "Documento actualizado correctamente", "success");
      } else {
        await axios.post(
          "https://pagina-educacion-backend-production.up.railway.app/api/storeDocumento", 
          formData, 
          {
            headers: { "Content-Type": "multipart/form-data" },
            ...config
          }
        );
        swal("¡Éxito!", "Documento creado correctamente", "success");
      }
      onClose();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        swal("Error", "Corrige los campos en rojo.", "error");
      } else {
        swal("Error", "Ocurrió un error inesperado.", "error");
      }
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <ModalPortal>
      {/* Modal Principal */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[98vh]">
          {/* Encabezado */}
          <div className="bg-[#545454] p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {editingRecord ? "Edición de Documento" : "Registro de Documento"}
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
            <form onSubmit={handleSubmit}>
              {/* Título */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  value={titulo}
                  onChange={handleFieldChange("Titulo", setTitulo)}
                  className={`w-full border ${
                    errors.Titulo ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.Titulo ? "ring-red-200" : "focus:ring-[#262D73]"
                  }`}
                />
                {errors.Titulo && (
                  <p className="text-red-500 text-xs mt-1">{errors.Titulo}</p>
                )}
              </div>

              {/* Descripción */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={descripcion}
                  onChange={handleFieldChange("Descripcion", setDescripcion)}
                  rows="9"
                  className={`w-full border ${
                    errors.Descripcion ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.Descripcion ? "ring-red-200" : "focus:ring-[#262D73]"
                  } resize-vertical`}
                />
                {errors.Descripcion && (
                  <p className="text-red-500 text-xs mt-1">{errors.Descripcion}</p>
                )}
              </div>

              {/* URL */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={handleFieldChange("Url", setUrl)}
                  className={`w-full border ${
                    errors.Url ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.Url ? "ring-red-200" : "focus:ring-[#262D73]"
                  }`}
                />
                {errors.Url && (
                  <p className="text-red-500 text-xs mt-1">{errors.Url}</p>
                )}
              </div>

              {/* Botones Guardar/Cancelar */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 bg-[#262D73] text-white py-2 px-4 rounded-xl font-medium transition ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#363D8F] cursor-pointer"
                  }`}
                >
                  {loading && <Spinner />}
                  {loading ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal de progreso para carga */}
        {uploading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {editingRecord ? "Actualizando" : "Guardando"}
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Por favor, espere mientras se guardan los cambios
                </p>
                
                {/* Barra de progreso con gradiente moderno */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {/* Indicador numérico */}
                <div className="w-full flex justify-between px-1">
                  <span className="text-xs font-medium text-blue-600">0%</span>
                  <span className="text-xs font-medium text-blue-600">
                    {progress}%
                  </span>
                  <span className="text-xs font-medium text-blue-600">100%</span>
                </div>
                
                {/* Indicador de carga animado */}
                <div className="mt-4 flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalPortal>
  );
};

RegistroModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  editingRecord: PropTypes.shape({
    IdDocumento: PropTypes.number,
    Titulo: PropTypes.string,
    Descripcion: PropTypes.string,
    Url: PropTypes.string,
  }),
};

export default RegistroModal;