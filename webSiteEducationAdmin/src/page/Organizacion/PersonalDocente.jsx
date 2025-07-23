import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import FormModalOrganizacion from "../../components/FormModalOrganizacion";
import ConfirmModal from "../../components/ConfirmModal";
import ImagenModal from "../../components/ImagenModal";
import TableOrganizacion from "../../components/TableOrganizacion";
import TablePublicacionesModal from "../../components/TablePublicacionesModal";
import LoadingIndicator from "../../components/LoadingIndicator";

const PersonalDocente = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showImagenModal, setShowImagenModal] = useState(false);
  const [imagenActual, setImagenActual] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Publicaciones modal
  const [showPublicacionesModal, setShowPublicacionesModal] = useState(false);
  const [publicacionesActual, setPublicacionesActual] = useState([]);

  const activeSection = "Personal Docente";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://pagina-educacion-backend-production.up.railway.app/api/organizacion"
      );
      setData(
        response.data.filter((item) => item.RolPersona === activeSection)
      );
    } catch (error) {
      console.error("Error al obtener registros", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openNewModal = () => {
    setEditingRecord(null);
    setShowModal(true);
  };

  const openEditModal = (rec) => {
    setEditingRecord(rec);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteRecord = async () => {
    try {
      await axios.delete(
        `https://pagina-educacion-backend-production.up.railway.app/api/destroyOrganizacion/${idToDelete}`
      );
      fetchData();
    } catch (error) {
      console.error("Error eliminando registro", error);
    }
    setConfirmDelete(false);
    setIdToDelete(null);
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    setIdToDelete(null);
  };

  const openImagenModal = (img) => {
    setImagenActual(img);
    setShowImagenModal(true);
  };

  const openTablePublicacionesModal = (pubs) => {
    setPublicacionesActual(pubs);
    setShowPublicacionesModal(true);
  };

  const indexLast = currentPage * itemsPerPage;
  const indexFirst = indexLast - itemsPerPage;
  const currentItems = data.slice(indexFirst, indexLast);
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
            {activeSection}
          </h2>
          <div className="flex my-10">
            <button
              onClick={openNewModal}
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
              Nuevo registro
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <LoadingIndicator size="large" />
          </div>
        ) : (
          <div className="mb-8">
            <TableOrganizacion
              data={currentItems}
              openImagenModal={openImagenModal}
              openEditModal={openEditModal}
              openTablePublicacionesModal={openTablePublicacionesModal}
              handleDelete={handleDelete}
            />
          </div>
        )}

        {data.length > itemsPerPage && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="text-gray-600 text-sm">
              Mostrando {indexFirst + 1} - {Math.min(indexLast, data.length)} de{" "}
              {data.length} registros
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

        {showModal && (
          <FormModalOrganizacion
            onClose={() => {
              setShowModal(false);
              setEditingRecord(null);
              fetchData();
            }}
            editingRecord={editingRecord}
            tipo={activeSection}
          />
        )}

        {confirmDelete && (
          <ConfirmModal
            message="¿Está seguro que desea eliminar este registro?"
            onConfirm={confirmDeleteRecord}
            onCancel={cancelDelete}
          />
        )}

        {showImagenModal && (
          <ImagenModal
            imagen={imagenActual}
            onClose={() => setShowImagenModal(false)}
          />
        )}

        {showPublicacionesModal && (
          <TablePublicacionesModal
            publicaciones={publicacionesActual}
            onClose={() => setShowPublicacionesModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default PersonalDocente;
