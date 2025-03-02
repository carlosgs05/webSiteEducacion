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
            `http://localhost:8000/api/updateDocumento/${editingRecord.IdDocumento}?_method=PUT`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        } else {
          await axios.post(
            "http://localhost:8000/api/storeDocumento",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        }
        onClose();
      } catch (error) {
        console.error("Error al enviar el formulario", error);
      }
      setLoading(false);
    };
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 md:w-3/4 lg:w-3/4">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Registro de Documento</h2>
  
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-gray-600 font-semibold">Título</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
  
              <div>
                <label className="block mb-1 text-gray-600 font-semibold">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  rows="4"
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
  
              <div>
                <label className="block mb-1 text-gray-600 font-semibold">URL</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
  
            <div className="flex justify-center gap-2 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#262D73] text-white py-2 px-4 font-semibold rounded-lg ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1F265F]"}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingIndicator />
                    Guardando...
                  </div>
                ) : (
                  "Guardar"
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200 hover:bg-red-600"
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
  
