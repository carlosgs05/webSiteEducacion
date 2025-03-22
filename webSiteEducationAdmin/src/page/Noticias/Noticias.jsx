import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import ConfirmModal from "../../components/ConfirmModal"; 
import DescripcionModal from "../../components/DescripcionModal"; // Modal para mostrar texto (Título, Encabezado, Descripción)
import ImagenModal from "../../components/ImagenModal";           // Modal para mostrar la imagen de portada
import LoadingIndicator from "../../components/LoadingIndicator";

const Noticias = () => {
  const [data, setData] = useState([]);

  const [showDescripcionModal, setShowDescripcionModal] = useState(false);
  const [textoActual, setTextoActual] = useState("");

  const [showImagenModal, setShowImagenModal] = useState(false);
  const [imagenActual, setImagenActual] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const [loading, setLoading] = useState(false);

  // Hook para redireccionar
  const navigate = useNavigate();

  // 1. Obtener registros desde la API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Ajusta la URL según tu endpoint, por ejemplo /api/noticias
      const response = await axios.get("http://localhost:8000/api/noticias");
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Manejo de eliminación
  const handleDelete = (id) => {
    setIdToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteRecord = async () => {
    try {
      // Ajusta la URL según tu ruta de eliminación, por ejemplo /api/destroyNoticia/{id}
      await axios.delete(`http://localhost:8000/api/destroyNoticia/${idToDelete}`);
      fetchData();
      setConfirmDelete(false);
      setIdToDelete(null);
    } catch (error) {
      console.error("Error eliminando la noticia:", error);
    }
  };

  // 2. Abrir modal de texto para Título, Encabezado, Descripción
  const openTextoModal = (texto) => {
    setTextoActual(texto);
    setShowDescripcionModal(true);
  };

  // 3. Abrir modal para imagen de portada
  const openImagenPortadaModal = (rutaImagen) => {
    setImagenActual(rutaImagen);
    setShowImagenModal(true);
  };

  // Función para editar: redirige a la página de registro enviando los datos de la noticia a editar
  const handleEdit = (item) => {
    navigate(`/noticias/editar/${item.IdNoticia}`, { state: { editingRecord: item } });
    console.log("item", item);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4">
          {/* Botón para crear nueva noticia */}
          <Button
            name="Nueva Noticia"
            link="/noticias/registro"
            bgColor="bg-[#545454]"
          />
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-white uppercase bg-[#545454]">
              <tr>
                <th className="px-6 py-3 text-center">TÍTULO</th>
                <th className="px-6 py-3 text-center">FECHA</th>
                <th className="px-6 py-3 text-center">IMAGEN PORTADA</th>
                <th className="px-6 py-3 text-center">ENCABEZADO</th>
                <th className="px-6 py-3 text-center">DESCRIPCIÓN</th>
                <th className="px-6 py-3 text-center">OPCIONES</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr className="bg-white border-b border-gray-200">
                  <td colSpan="6" className="py-3 text-center text-gray-500">
                    SIN REGISTROS
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={item.IdNoticia}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {/* TÍTULO (abre modal de texto) */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => openTextoModal(item.Nombre)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                      >
                        Ver Título
                      </button>
                    </td>

                    {/* FECHA */}
                    <td className="py-3 text-center">{item.Fecha}</td>

                    {/* IMAGEN PORTADA */}
                    <td className="py-3 text-center">
                      {item.ImagenPortada ? (
                        <button
                          onClick={() => openImagenPortadaModal(item.ImagenPortada)}
                          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                        >
                          Ver Portada
                        </button>
                      ) : (
                        <span className="text-gray-500">Sin imagen</span>
                      )}
                    </td>

                    {/* ENCABEZADO */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => openTextoModal(item.Encabezado)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                      >
                        Ver Encabezado
                      </button>
                    </td>

                    {/* DESCRIPCIÓN */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => openTextoModal(item.Descripcion)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                      >
                        Ver Descripción
                      </button>
                    </td>

                    {/* OPCIONES: Editar / Eliminar */}
                    <td className="py-3 text-center align-middle">
                      <div className="flex gap-2 justify-center items-center">
                        {/* Botón para editar: redirige a la página de registro con los datos del item */}
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-[#262D73] hover:bg-[#36395d] text-white px-3 py-2 rounded transition-colors"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.IdNoticia)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-colors"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {/* Modal de confirmación para eliminación */}
        {confirmDelete && (
          <ConfirmModal
            message="¿Está seguro que desea eliminar esta noticia?"
            onConfirm={confirmDeleteRecord}
            onCancel={() => setConfirmDelete(false)}
          />
        )}

        {/* Modal para ver texto (Título, Encabezado, Descripción) */}
        {showDescripcionModal && (
          <DescripcionModal
            texto={textoActual}
            onClose={() => setShowDescripcionModal(false)}
          />
        )}

        {/* Modal para ver la imagen de portada */}
        {showImagenModal && (
          <ImagenModal
            imagen={imagenActual}
            onClose={() => setShowImagenModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Noticias;
