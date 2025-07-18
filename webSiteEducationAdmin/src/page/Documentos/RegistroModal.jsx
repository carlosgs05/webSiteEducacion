import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingIndicator from "../../components/LoadingIndicator";

const RegistroModal = ({ onClose, editingRecord }) => {
  const [loading, setLoading] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (editingRecord) {
      setTitulo(editingRecord.Titulo);
      setDescripcion(editingRecord.Descripcion);
      setUrl(editingRecord.Url);
    } else {
      setTitulo("");
      setDescripcion("");
      setUrl("");
    }
  }, [editingRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Titulo", titulo);
    formData.append("Descripcion", descripcion);
    formData.append("Url", url);

    try {
      if (editingRecord) {
        await axios.post(
          `https://pagina-educacion-backend-production.up.railway.app/api/updateDocumento/${editingRecord.IdDocumento}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post("https://pagina-educacion-backend-production.up.railway.app/api/storeDocumento", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="relative bg-white p-6 rounded-2xl shadow-lg w-full max-w-6xl mx-4">
        {/* Botón cerrar (X) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Registro de Documento
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Fila 1 - Título */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-semibold">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Fila 2 - Descripción */}
          <div className="mb-4">
            <label className="block mb-2 text-gray-600 font-semibold">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows="9"
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 resize-vertical"
            />
          </div>

          {/* Fila 3 - URL */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-600 font-semibold">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center justify-center bg-[#262D73] text-white py-2 px-6 font-semibold rounded-lg transition ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#1F265F] cursor-pointer"
              }`}
            >
              {loading ? (
                <>
                  <LoadingIndicator />
                  <span className="ml-2">Guardando...</span>
                </>
              ) : (
                "Guardar"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition hover:bg-red-600 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
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
