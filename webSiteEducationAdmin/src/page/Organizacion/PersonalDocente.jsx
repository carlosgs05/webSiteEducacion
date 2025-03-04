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
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Estados para modal de publicaciones
  const [showPublicacionesModal, setShowPublicacionesModal] = useState(false);
  const [publicacionesActual, setPublicacionesActual] = useState([]);

  const activeSection = "Personal Docente";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/organizacion");
      const filtered = response.data.filter(
        (item) => item.RolPersona === activeSection
      );
      setData(filtered);
    } catch (error) {
      console.error("Error al obtener los registros", error);
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

  const openEditModal = (record) => {
    setEditingRecord(record);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setIdToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteRecord = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/destroyOrganizacion/${idToDelete}`
      );
      fetchData();
      setConfirmDelete(false);
      setIdToDelete(null);
    } catch (error) {
      console.error("Error eliminando el registro", error);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
    setIdToDelete(null);
  };

  const openImagenModal = (imagen) => {
    setImagenActual(imagen);
    setShowImagenModal(true);
  };

  // Nuevo: abre el modal de publicaciones
  const openTablePublicacionesModal = (publicaciones) => {
    setPublicacionesActual(publicaciones);
    setShowPublicacionesModal(true);
  };

  // Lógica para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-8">
          <h2 className="text-xl text-center font-semibold mb-5 text-gray-700 uppercase">
            {activeSection}
          </h2>
          <Button name="Nuevo registro" onClick={openNewModal} bgColor="bg-[#E4BCD3]" />
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <div>
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
          <ImagenModal imagen={imagenActual} onClose={() => setShowImagenModal(false)} />
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