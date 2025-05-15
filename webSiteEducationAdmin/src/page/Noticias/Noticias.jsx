import { useState, useEffect } from "react";
import axios from "axios";
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
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-9">
          <h2 className="text-2xl text-center font-medium text-blue-800 uppercase">
            Noticias
          </h2>
          <div className="my-6">
            <Button
              name="Nueva Noticia"
              link="/noticias/registro"
              bgColor="bg-[#4CAF50]"
              className="cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#45A049] transition"
            />
          </div>
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#545454] text-white uppercase text-xs">
                <tr className="h-12">
                  <th className="px-4 py-3 text-center">Título</th>
                  <th className="px-4 py-3 text-center">Fecha</th>
                  <th className="px-4 py-3 text-center">Imagen Portada</th>
                  <th className="px-4 py-3 text-center">Encabezado</th>
                  <th className="px-4 py-3 text-center">Descripción</th>
                  <th className="px-4 py-3 text-center">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr className="bg-white border-b">
                    <td colSpan="6" className="py-4 text-center text-gray-500">
                      SIN REGISTROS
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr
                      key={item.IdNoticia}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => openTextoModal(item.Nombre, "Título")}
                          className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md transition"
                        >
                          Ver Título
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">{item.Fecha}</td>
                      <td className="py-2 px-4 text-center">
                        {item.ImagenPortada ? (
                          <button
                            onClick={() =>
                              openImagenPortadaModal(
                                `http://localhost:8000/${item.ImagenPortada}`
                              )
                            }
                            className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md transition"
                          >
                            Ver Portada
                          </button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() =>
                            openTextoModal(item.Encabezado, "Encabezado")
                          }
                          className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md transition"
                        >
                          Ver Encabezado
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() =>
                            openTextoModal(item.Descripcion, "Descripción")
                          }
                          className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md transition"
                        >
                          Ver Descripción
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="cursor-pointer bg-[#262D73] hover:bg-[#36395d] p-1 rounded-md transition"
                            title="Editar"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-1.414-6.414L16 3m0 0l-3 3m3-3L19 6"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item.IdNoticia)}
                            className="cursor-pointer bg-red-500 hover:bg-red-600 p-1 rounded-md transition"
                            title="Eliminar"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded-md cursor-pointer ${
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
