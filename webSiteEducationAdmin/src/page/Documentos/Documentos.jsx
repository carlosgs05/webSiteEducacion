import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import RegistroModal from "./RegistroModal";
import ConfirmModal from "../../components/ConfirmModal";
import DescripcionModal from "../../components/DescripcionModal";
import LoadingIndicator from "../../components/LoadingIndicator";

const Documentos = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showDescripcionModal, setShowDescripcionModal] = useState(false);
  const [descripcionActual, setDescripcionActual] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/documentos");
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los documentos", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Abrir modal para crear un nuevo documento
  const openNewModal = () => {
    setEditingRecord(null);
    setShowModal(true);
  };

  // Abrir modal para editar un documento existente
  const openEditModal = (record) => {
    setEditingRecord(record);
    setShowModal(true);
  };

  // Manejo de eliminación
  const handleDelete = (id) => {
    setIdToDelete(id);
    setConfirmDelete(true);
  };

  const confirmDeleteRecord = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/destroyDocumento/${idToDelete}`);
      fetchData();
      setConfirmDelete(false);
      setIdToDelete(null);
    } catch (error) {
      console.error("Error eliminando el documento", error);
    }
  };

  // Abrir modal para ver descripción
  const openDescripcionModal = (descripcion) => {
    setDescripcionActual(descripcion);
    setShowDescripcionModal(true);
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-4">
          <Button
            name="Nuevo Registro"
            onClick={openNewModal}
            bgColor="bg-[#E4BCD3]"
          />
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-white uppercase bg-[#545454]">
              <tr>
                <th className="px-6 py-3 text-center">TÍTULO</th>
                <th className="px-6 py-3 text-center">DESCRIPCIÓN</th>
                <th className="px-6 py-3 text-center">URL</th>
                <th className="px-6 py-3 text-center">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr className="bg-white border-b border-gray-200">
                  <td colSpan="4" className="py-3 text-center text-gray-500">
                    SIN REGISTROS
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr
                    key={item.IdDocumento}
                    className={`border-b border-gray-200 hover:bg-gray-100 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    }`}
                  >
                    {/* TÍTULO */}
                    <td className="py-3 text-center">{item.Titulo}</td>
  
                    {/* DESCRIPCIÓN (abre modal con botón) */}
                    <td className="py-3 text-center">
                      <button
                        onClick={() => openDescripcionModal(item.Descripcion)}
                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                      >
                        Ver descripción
                      </button>
                    </td>
  
                    {/* URL */}
                    <td className="py-3 text-black text-center">
                      <a
                        href={item.Url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item.Url}
                      </a>
                    </td>
  
                    {/* ACCIONES */}
                    <td className="py-3 text-center align-middle">
                      <div className="flex gap-2 justify-center items-center">
                        <button
                          onClick={() => openEditModal(item)}
                          className="bg-[#262D73] hover:bg-[#36395d] text-white px-3 py-2 rounded transition-colors"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(item.IdDocumento)}
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

        {/* Modal para crear/editar */}
        {showModal && (
          <RegistroModal
            onClose={() => {
              setShowModal(false);
              setEditingRecord(null);
              fetchData();
            }}
            editingRecord={editingRecord}
          />
        )}

        {/* Modal de confirmación */}
        {confirmDelete && (
          <ConfirmModal
            message="¿Está seguro que desea eliminar este documento?"
            onConfirm={confirmDeleteRecord}
            onCancel={() => setConfirmDelete(false)}
          />
        )}

        {/* Modal para ver descripción */}
        {showDescripcionModal && (
          <DescripcionModal
            descripcion={descripcionActual}
            onClose={() => setShowDescripcionModal(false)}
          />
        )}
      </div>
    </Layout>
  );
};

export default Documentos;
