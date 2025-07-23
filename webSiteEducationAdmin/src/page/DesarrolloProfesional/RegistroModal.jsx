import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import swal from "sweetalert";
import ModalPortal from "../../components/ModalPortal";
import { X, Trash2, Plus } from "lucide-react";

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

const RegistroModal = ({ onClose, editingRecord, tipo }) => {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [url, setUrl] = useState("");
  const [fecha, setFecha] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // Precarga datos al editar
  useEffect(() => {
    if (editingRecord) {
      setUrl(editingRecord.Url || "");
      setFecha(editingRecord.Fecha || "");
      setDescripcion(editingRecord.Descripcion || "");
      setPreview(
        editingRecord.Imagen
          ? `https://pagina-educacion-backend-production.up.railway.app/${editingRecord.Imagen}`
          : null
      );
    } else {
      setUrl("");
      setFecha("");
      setDescripcion("");
      setImagen(null);
      setPreview(null);
    }
    setErrors({});
  }, [editingRecord]);

  // Vista previa de imagen local
  useEffect(() => {
    if (imagen) {
      const objectUrl = URL.createObjectURL(imagen);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imagen]);

  // Limpia error de un campo al cambiar
  const handleFieldChange = (field, setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // Manejo de archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && /image\/(png|jpe?g)/.test(file.type)) {
      setImagen(file);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.Imagen;
        return next;
      });
    }
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && /image\/(png|jpe?g)/.test(file.type)) {
      setImagen(file);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.Imagen;
        return next;
      });
    }
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setImagen(null);
    setPreview(null);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.Imagen;
      return next;
    });
  };

  // Envío de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("Descripcion", descripcion);
    formData.append("Url", url);
    formData.append("Tipo", tipo);
    formData.append("Fecha", fecha);
    if (imagen) formData.append("Imagen", imagen);

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

      const endpoint = editingRecord
        ? `https://pagina-educacion-backend-production.up.railway.app/api/updateDesarrolloProfesional/${editingRecord.IdDesarrollo}`
        : "https://pagina-educacion-backend-production.up.railway.app/api/storeDesarrolloProfesional";

      await axios.post(endpoint, formData, {
        ...config,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!editingRecord) {
        const titleMap = {
          "bolsa de trabajo": [
            "Bolsa de trabajo registrada!",
            "La bolsa de trabajo ha sido registrada con éxito",
          ],
          pasantias: [
            "Pasantía registrada!",
            "La pasantía ha sido registrada con éxito",
          ],
          default: ["Registro exitoso!", "Se ha registrado con éxito"],
        };
        const [title, text] = titleMap[tipo] || titleMap.default;
        swal(title, text, "success");
      }

      onClose();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        swal("Error", "Corrige los campos en rojo.", "error");
      } else {
        swal("Error", "Ocurrió un error inesperado.", "error");
      }
      console.error(error);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <ModalPortal>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
        }
      `}</style>

      {/* Modal Principal */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-xl flex flex-col max-h-[98vh]">
          {/* Encabezado */}
          <div className="bg-[#545454] p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {editingRecord ? `Edición ${tipo}` : `Registro ${tipo}`}
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
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* URL y Fecha */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    URL
                  </label>
                  <input
                    type="text"
                    value={url}
                    onChange={handleFieldChange("Url", setUrl)}
                    className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.Url
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 ring-[#262D73]"
                    }`}
                  />
                  {errors.Url && (
                    <p className="text-red-500 text-xs mt-1">{errors.Url[0]}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={handleFieldChange("Fecha", setFecha)}
                    className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.Fecha
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 ring-[#262D73]"
                    }`}
                    style={{ cursor: "pointer" }}
                  />
                  {errors.Fecha && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.Fecha[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Imagen y Descripción */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Imagen
                  </label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={() => fileInputRef.current.click()}
                    className={`relative w-full h-64 border-2 border-dashed rounded-xl overflow-hidden cursor-pointer ${
                      errors.Imagen ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePhoto(e);
                          }}
                          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition"
                          title="Eliminar imagen"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                        <div className="mb-3 bg-gray-100 rounded-full p-3">
                          <Plus size={24} />
                        </div>
                        <p className="text-center text-sm">
                          Arrastra una imagen aquí o haz clic para seleccionar
                        </p>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  {errors.Imagen && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.Imagen[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Descripción
                  </label>
                  <textarea
                    value={descripcion}
                    onChange={handleFieldChange("Descripcion", setDescripcion)}
                    className={`w-full h-64 border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.Descripcion
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 ring-[#262D73]"
                    }`}
                  />
                  {errors.Descripcion && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.Descripcion[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Botones */}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 bg-[#262D73] text-white py-2 px-6 rounded-lg font-semibold transition ${
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
                  className="bg-red-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-600 cursor-pointer"
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
                  <span className="text-xs font-medium text-blue-600">
                    100%
                  </span>
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
    Descripcion: PropTypes.string,
    Url: PropTypes.string,
    Fecha: PropTypes.string,
    Imagen: PropTypes.string,
    IdDesarrollo: PropTypes.number,
  }),
  tipo: PropTypes.string.isRequired,
};

export default RegistroModal;
