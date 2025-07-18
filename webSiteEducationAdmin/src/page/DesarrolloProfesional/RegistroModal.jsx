import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import swal from "sweetalert";
import ModalPortal from "../../components/ModalPortal";

// Iconos
const TrashIcon = () => (
  <svg
    className="w-5 h-5 cursor-pointer hover:text-red-600 transition"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 
         21H7.862a2 2 0 01-1.995-1.858L5 
         7m5 4v6m4-6v6m1-10V5a2 2 0 
         00-2-2H9a2 2 0 00-2 2v2m-2 
         0h12"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6 cursor-pointer hover:text-gray-700 transition"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Spinner inline para el botón
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
    e.dataTransfer.dropEffect = "copy";
  };
  const handleDrop = (e) => {
    e.preventDefault();
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
  const handleRemovePhoto = () => {
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
      const endpoint = editingRecord
        ? `https://pagina-educacion-backend-production.up.railway.app/api/updateDesarrolloProfesional/${editingRecord.IdDesarrollo}?_method=PUT`
        : "https://pagina-educacion-backend-production.up.railway.app/api/storeDesarrolloProfesional";

      await axios.post(endpoint, formData, {
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
    }
  };

  return (
    <ModalPortal>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
        }
      `}</style>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-5xl rounded-2xl shadow-lg p-6 overflow-y-auto max-h-screen">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <CloseIcon />
          </button>

          <h2 className="text-2xl text-center font-semibold mb-6 text-gray-700 uppercase">
            {editingRecord ? `Edición ${tipo}` : `Registro ${tipo}`}
          </h2>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="space-y-6 text-sm"
          >
            {/* URL y Fecha */}
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block mb-1 font-semibold">URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={handleFieldChange("Url", setUrl)}
                  className={`w-full border p-2 rounded focus:outline-none focus:ring-1 ${
                    errors.Url
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 ring-gray-400"
                  }`}
                />
                {errors.Url && (
                  <p className="text-red-500 text-xs mt-1">{errors.Url[0]}</p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Fecha</label>
                <input
                  type="date"
                  value={fecha}
                  onChange={handleFieldChange("Fecha", setFecha)}
                  className={`w-full border p-2 rounded focus:outline-none focus:ring-1 ${
                    errors.Fecha
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 ring-gray-400"
                  }`}
                  style={{ cursor: "pointer" }}
                />
                {errors.Fecha && (
                  <p className="text-red-500 text-xs mt-1">{errors.Fecha[0]}</p>
                )}
              </div>
            </div>

            {/* Imagen y Descripción */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-semibold">Imagen</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`relative w-full h-64 aspect-square border-2 border-dashed rounded-md overflow-hidden hover:bg-gray-50 cursor-pointer ${
                    errors.Imagen ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <span className="text-3xl">+</span>
                      <p className="text-sm text-center">
                        Agregar imagen
                        <br />o arrastrar y soltar
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {preview && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      title="Eliminar imagen"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
                {errors.Imagen && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Imagen[0]}
                  </p>
                )}
              </div>
              <div>
                <label className="block mb-1 font-semibold">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={handleFieldChange("Descripcion", setDescripcion)}
                  className={`w-full h-64 border p-2 rounded focus:outline-none focus:ring-1 ${
                    errors.Descripcion
                      ? "border-red-500 ring-red-200"
                      : "border-gray-300 ring-gray-400"
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
                className={`flex items-center justify-center gap-2 bg-[#262D73] text-white py-2 px-6 rounded-lg font-semibold transition cursor-pointer ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#1F265F]"
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
