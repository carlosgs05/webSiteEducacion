// src/pages/PersonalDocente.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
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

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl text-center font-medium text-blue-800 uppercase">
            {activeSection}
          </h2>
          <div className="flex mt-5 mb-7">
            <Button
              name="Nuevo registro"
              onClick={openNewModal}
              bgColor="bg-[#4CAF50]"
              className="cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-[#45A049] transition"
            />
          </div>
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className="overflow-x-auto">
            <TableOrganizacion
              data={currentItems}
              openImagenModal={openImagenModal}
              openEditModal={openEditModal}
              openTablePublicacionesModal={openTablePublicacionesModal}
              handleDelete={handleDelete}
            />
          </div>
        )}

        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md cursor-pointer ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

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