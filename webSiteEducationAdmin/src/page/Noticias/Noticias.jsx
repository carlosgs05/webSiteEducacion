import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import DescripcionModal from "../../components/DescripcionModal";
import ImagenModal from "../../components/ImagenModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import swal from "sweetalert";

const Noticias = () => {
  const [data, setData] = useState([]);
  const [showDescripcionModal, setShowDescripcionModal] = useState(false);
  const [textoActual, setTextoActual] = useState("");
  const [campoActual, setCampoActual] = useState("");
  const [showImagenModal, setShowImagenModal] = useState(false);
  const [imagenActual, setImagenActual] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchData = async () => {
    setLoading(true);
    try {
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

  const handleDelete = (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar esta noticia.",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: {
          text: "Eliminar",
          closeModal: false,
        },
      },
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:8000/api/destroyNoticia/${id}`)
          .then(() => {
            swal("La noticia ha sido eliminada.", {
              icon: "success",
            });
            fetchData();
          })
          .catch(() => {
            swal("Error al eliminar la noticia", {
              icon: "error",
            });
          });
      } else {
        swal("La noticia no se eliminó.");
      }
    });
  };

  const openTextoModal = (texto, campo) => {
    setTextoActual(texto);
    setShowDescripcionModal(true);
    setCampoActual(campo);
  };

  const openImagenPortadaModal = (rutaImagen) => {
    setImagenActual(rutaImagen);
    setShowImagenModal(true);
  };

  const handleEdit = (item) => {
    navigate(`/noticias/editar/${item.IdNoticia}`, {
      state: { editingRecord: item },
    });
    console.log("item", item);
  };

  // Lógica para paginación
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4">
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
                currentItems.map((item, index) => (
                  <tr
                    key={item.IdNoticia}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    <td className="py-3 text-center">
                      <button
                        onClick={() => openTextoModal(item.Nombre, "Título")}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                      >
                        Ver Título
                      </button>
                    </td>
                    <td className="py-3 text-center">{item.Fecha}</td>
                    <td className="py-3 text-center">
                      {item.ImagenPortada ? (
                        <button
                          onClick={() =>
                            openImagenPortadaModal(
                              `http://localhost:8000/${item.ImagenPortada}`
                            )
                          }
                          className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                        >
                          Ver Portada
                        </button>
                      ) : (
                        <span className="text-gray-500">Sin imagen</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() =>
                          openTextoModal(item.Encabezado, "Encabezado")
                        }
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                      >
                        Ver Encabezado
                      </button>
                    </td>
                    <td className="py-3 text-center">
                      <button
                        onClick={() =>
                          openTextoModal(item.Descripcion, "Descripción")
                        }
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                      >
                        Ver Descripción
                      </button>
                    </td>
                    <td className="py-3 text-center align-middle">
                      <div className="flex gap-2 justify-center items-center">
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

        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        {showDescripcionModal && (
          <DescripcionModal
            descripcion={textoActual}
            onClose={() => setShowDescripcionModal(false)}
            nombre={campoActual}
          />
        )}
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
