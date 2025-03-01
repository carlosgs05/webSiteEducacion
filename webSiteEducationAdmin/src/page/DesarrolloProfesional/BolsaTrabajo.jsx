import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import RegistroModal from "./RegistroModal";
import ConfirmModal from "../../components/ConfirmModal";
import DescripcionModal from "./DescripcionModal";
import ImagenModal from "./ImagenModal";
import RegistrosTable from "./RegistrosTable";
const BolsaTrabajo = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showDescripcionModal, setShowDescripcionModal] = useState(false);
  const [descripcionActual, setDescripcionActual] = useState("");
  const [showImagenModal, setShowImagenModal] = useState(false);
  const [imagenActual, setImagenActual] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const activeSection = "bolsa de trabajo";

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/desarrolloProfesional"
      );
      const filtered = response.data.filter(
        (item) => item.Tipo === activeSection
      );
      setData(filtered);
    } catch (error) {
      console.error("Error al obtener los registros", error);
    }
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
        `http://localhost:8000/api/destroyDesarrolloProfesional/${idToDelete}`
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

  const openDescripcionModal = (descripcion) => {
    setDescripcionActual(descripcion);
    setShowDescripcionModal(true);
  };

  const openImagenModal = (imagen) => {
    setImagenActual(imagen);
    setShowImagenModal(true);
  };

  // Lógica para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4">
          <Button
            name="Nuevo registro"
            onClick={openNewModal}
            bgColor="bg-[#E4BCD3]"
          />
        </div>

        <RegistrosTable
          data={currentItems}
          openDescripcionModal={openDescripcionModal}
          openImagenModal={openImagenModal}
          openEditModal={openEditModal}
          handleDelete={handleDelete}
        />

        {/* Controles de paginación */}
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
          <RegistroModal
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

        {showDescripcionModal && (
          <DescripcionModal
            descripcion={descripcionActual}
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
}

export default BolsaTrabajo
