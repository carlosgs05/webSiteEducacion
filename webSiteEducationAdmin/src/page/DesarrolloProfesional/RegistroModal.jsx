import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingIndicator from "../../components/LoadingIndicator";

const RegistroModal = ({ onClose, editingRecord, tipo }) => {
  const [loading, setLoading] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [url, setUrl] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    if (editingRecord) {
      setDescripcion(editingRecord.Descripcion);
      setUrl(editingRecord.Url);
      setFecha(editingRecord.Fecha);
    } else {
      setDescripcion("");
      setImagen(null);
      setUrl("");
      setFecha("");
    }
  }, [editingRecord]);

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar indicador de carga

    const formData = new FormData();
    formData.append("Descripcion", descripcion);
    if (imagen) formData.append("Imagen", imagen);
    formData.append("Url", url);
    formData.append("Tipo", tipo);
    formData.append("Fecha", fecha);

    try {
      if (editingRecord) {
        await axios.post(
          `http://localhost:8000/api/updateDesarrolloProfesional/${editingRecord.IdDesarrollo}?_method=PUT`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/storeDesarrolloProfesional",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
    setLoading(false); // Ocultar indicador de carga
  };
  return (
    // Fondo semitransparente que oscurece el contenido detrás
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      {/* Contenedor del modal más amplio */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 md:w-3/4 lg:w-3/4">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Registro</h2>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Grid de 2 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Columna 1: Descripción */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="8"
                required
                className="w-full border border-gray-300 p-2 rounded-lg 
                           focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Columna 2: Imagen, URL y Fecha */}
            <div className="flex flex-col gap-4">
              {/* Imagen */}
              <div>
                <label className="block mb-1 text-gray-600 font-semibold">
                  Imagen
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500
                             file:mr-4 file:py-2 file:px-4
                             file:rounded-md file:border-0
                             file:text-sm file:font-semibold
                             file:bg-[#E4BCD3] file:text-white
                             hover:file:bg-[#d3a8b3]"
                />
                {editingRecord && editingRecord.Imagen && !imagen && (
                  <img
                    src={`http://localhost:8000/${editingRecord.Imagen}`}
                    alt="Imagen actual"
                    className="h-20 mt-2 rounded-lg shadow-md"
                  />
                )}
              </div>

              {/* URL */}
              <div>
                <label className="block mb-1 text-gray-600 font-semibold">
                  URL
                </label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg 
                             focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>

              {/* Fecha */}
              <div>
                <label className="block mb-1 text-gray-600 font-semibold">
                  Fecha
                </label>
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                  className="w-full border border-gray-300 p-2 rounded-lg 
                             focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Botones centrados */}
          <div className="flex justify-center gap-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#262D73] text-white py-2 px-4 font-semibold rounded-lg ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1F265F]"
              }`}
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
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg 
                         shadow-md transition duration-200 hover:bg-red-600"
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
    Descripcion: PropTypes.string,
    Url: PropTypes.string,
    Fecha: PropTypes.string,
    Imagen: PropTypes.string,
    IdDesarrollo: PropTypes.number,
  }),
  tipo: PropTypes.string.isRequired,
};

export default RegistroModal;
