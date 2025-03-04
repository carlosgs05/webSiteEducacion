import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingIndicator from "../../components/LoadingIndicator";
import AddImageSlider from "../../components/AddImageSlider";
import Layout from "../../components/Layout";

const RegistroModal = ({ editingRecord }) => {
  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagenPortada, setImagenPortada] = useState(null);
  const [encabezado, setEncabezado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  // State para las imágenes adicionales gestionadas por AddImageSlider
  const [additionalImages, setAdditionalImages] = useState([]);

  // Rellenamos los campos si estamos editando un registro
  useEffect(() => {
    if (editingRecord) {
      setNombre(editingRecord.Nombre || "");
      setFecha(editingRecord.Fecha || "");
      setEncabezado(editingRecord.Encabezado || "");
      setDescripcion(editingRecord.Descripcion || "");
      setAdditionalImages(
        (editingRecord.imagenes || []).map((img) => ({
          preview: `http://127.0.0.1:8000/imagenes/${img.Imagen}`,
          name: img.Imagen,
          file: null,
        }))
      );
    } else {
      setNombre("");
      setFecha("");
      setEncabezado("");
      setDescripcion("");
      setImagenPortada(null);
      setAdditionalImages([]);
    }
  }, [editingRecord]);

  // Memoizamos el array de imágenes iniciales para AddImageSlider
  const initialSliderImages = useMemo(() => {
    return editingRecord && editingRecord.imagenes
      ? editingRecord.imagenes.map((img) => img.Imagen)
      : [];
  }, [editingRecord]);

  // Callback para actualizar las imágenes adicionales
  const handleImagesChange = (images) => {
    setAdditionalImages(images);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("Fecha", fecha);
    formData.append("Encabezado", encabezado);
    formData.append("Descripcion", descripcion);

    if (imagenPortada) {
      formData.append("ImagenPortada", imagenPortada);
    }

    // Solo enviamos los archivos nuevos (aquellos que tengan la propiedad file)
    additionalImages.forEach((img, index) => {
      if (img.file) {
        formData.append(`Imagenes[${index}]`, img.file);
      }
    });

    try {
      if (editingRecord) {
        // Actualización de noticia usando PUT
        await axios.put(
          `http://localhost:8000/api/updateNoticia/${editingRecord.IdNoticia}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      } else {
        // Creación de nueva noticia usando POST
        await axios.post(
          "http://localhost:8000/api/storeNoticia",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      
      }
      // Aquí podrías redirigir o mostrar un mensaje de éxito
    } catch (error) {
      console.error("Error al enviar el formulario", error);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {editingRecord ? "Editar Noticia" : "Registrar Noticia"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Campo para Nombre */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">
                Nombre
              </label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Campo para Fecha */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">
                Fecha
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Campo para Imagen Portada */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">
                Imagen Portada
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setImagenPortada(e.target.files ? e.target.files[0] : null)
                }
                accept="image/*"
                className="w-full"
              />
            </div>

            {/* Campo para Encabezado */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">
                Encabezado
              </label>
              <input
                type="text"
                value={encabezado}
                onChange={(e) => setEncabezado(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Campo para Descripción */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-gray-600 font-semibold">
                Descripción
              </label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows="4"
                required
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Componente para Imágenes Adicionales */}
            <div className="md:col-span-2">
              <label className="block mb-1 text-gray-600 font-semibold">
                Imágenes Adicionales
              </label>
              <AddImageSlider
                initialImages={initialSliderImages}
                onImagesChange={handleImagesChange}
              />
            </div>
          </div>

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
              className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200 hover:bg-red-600"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

RegistroModal.propTypes = {
  editingRecord: PropTypes.shape({
    IdNoticia: PropTypes.number,
    Nombre: PropTypes.string,
    Fecha: PropTypes.string,
    ImagenPortada: PropTypes.string,
    Encabezado: PropTypes.string,
    Descripcion: PropTypes.string,
    imagenes: PropTypes.arrayOf(
      PropTypes.shape({
        IdImagen: PropTypes.number,
        Imagen: PropTypes.string,
      })
    ),
  }),
};

export default RegistroModal;
