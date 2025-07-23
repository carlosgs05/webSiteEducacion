import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Layout from "../../components/Layout";
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
      const response = await axios.get(
        "https://pagina-educacion-backend-production.up.railway.app/api/noticias"
      );
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
          .delete(
            `https://pagina-educacion-backend-production.up.railway.app/api/destroyNoticia/${id}`
          )
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
    setCampoActual(campo);
    setShowDescripcionModal(true);
  };

  const openImagenPortadaModal = (rutaImagen) => {
    setImagenActual(
      `https://pagina-educacion-backend-production.up.railway.app/${rutaImagen}`
    );
    setShowImagenModal(true);
  };

  const handleEdit = (item) => {
    navigate(`/noticias/editar/${item.IdNoticia}`, {
      state: { editingRecord: item },
    });
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Generar números de página con límites
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl text-center font-bold uppercase text-blue-800">
            Noticias
          </h2>
          <div className="flex my-10">
            <a
              href="/noticias/registro"
              className="flex items-center gap-2 bg-[#4CAF50] hover:bg-[#45A049] text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Nueva Noticia
            </a>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingIndicator size="large" />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
            <table className="w-full text-sm">
              <thead className="bg-[#545454] text-white">
                <tr className="h-14">
                  <th className="px-4 text-center font-medium">Título</th>
                  <th className="px-4 text-center font-medium">Fecha</th>
                  <th className="px-4 text-center font-medium">Portada</th>
                  <th className="px-4 text-center font-medium">Encabezado</th>
                  <th className="px-4 text-center font-medium">Descripción</th>
                  <th className="px-4 text-center font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr className="bg-white">
                    <td 
                      colSpan={6} 
                      className="py-6 text-center text-gray-500 text-base"
                    >
                      SIN REGISTROS
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, idx) => (
                    <tr
                      key={item.IdNoticia}
                      className={`border-b border-gray-100 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100 transition-colors duration-150`}
                    >
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => openTextoModal(item.Nombre, "Título")}
                          className="flex items-center justify-center w-7 h-7 mx-auto bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors duration-200"
                          title="Ver título"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 text-gray-600" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center text-gray-700">
                        {item.Fecha}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {item.ImagenPortada ? (
                          <button
                            onClick={() => openImagenPortadaModal(item.ImagenPortada)}
                            className="flex items-center justify-center w-7 h-7 mx-auto bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors duration-200"
                            title="Ver portada"
                          >
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 text-gray-600" 
                              viewBox="0 0 20 20" 
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => openTextoModal(item.Encabezado, "Encabezado")}
                          className="flex items-center justify-center w-7 h-7 mx-auto bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors duration-200"
                          title="Ver encabezado"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 text-gray-600" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <button
                          onClick={() => openTextoModal(item.Descripcion, "Descripción")}
                          className="flex items-center justify-center w-7 h-7 mx-auto bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors duration-200"
                          title="Ver descripción"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-4 w-4 text-gray-600" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            title="Editar"
                            className="flex items-center justify-center w-7 h-7 bg-[#262D73] hover:bg-[#36395d] rounded-full cursor-pointer transition-colors duration-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(item.IdNoticia)}
                            title="Eliminar"
                            className="flex items-center justify-center w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer transition-colors duration-200"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
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

        {data.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
            <div className="text-gray-600 text-sm">
              Mostrando {indexOfFirstItem + 1} -{" "}
              {Math.min(indexOfLastItem, data.length)} de {data.length} registros
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  } font-medium cursor-pointer`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {showDescripcionModal && (
          <DescripcionModal
            descripcion={textoActual}
            nombre={campoActual}
            onClose={() => setShowDescripcionModal(false)}
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