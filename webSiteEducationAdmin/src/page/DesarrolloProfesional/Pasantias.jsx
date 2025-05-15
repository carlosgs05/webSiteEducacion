import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import RegistroModal from "./RegistroModal";
import DescripcionModal from "../../components/DescripcionModal";
import ImagenModal from "../../components/ImagenModal";
import RegistrosTable from "./RegistrosTable";
import LoadingIndicator from "../../components/LoadingIndicator";
import swal from "sweetalert";

const Pasantias = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showDescripcionModal, setShowDescripcionModal] = useState(false);
  const [descripcionActual, setDescripcionActual] = useState("");
  const [showImagenModal, setShowImagenModal] = useState(false);
  const [imagenActual, setImagenActual] = useState("");
  const [loading, setLoading] = useState(false);
  // Estados para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const activeSection = "Pasantías";

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/desarrolloProfesional"
      );
      const filtered = response.data.filter(
        (item) => item.Tipo === activeSection.toLowerCase()
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

  // Manejo de eliminación
  const handleDelete = (id) => {
    swal({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar este registro.",
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
            `http://localhost:8000/api/destroyDesarrolloProfesional/${id}`
          )
          .then(() => {
            swal("El registro ha sido eliminado.", {
              icon: "success",
            });
            fetchData();
          })
          .catch(() => {
            swal("Error al eliminar el registro", {
              icon: "error",
            });
          });
      } else {
        swal("El registro no se eliminó.");
      }
    });
  };

  const openDescripcionModal = (descripcion) => {
    setDescripcionActual(descripcion);
    setShowDescripcionModal(true);
  };

  const openImagenModal = (imagen) => {
    setImagenActual(imagen);
    setShowImagenModal(true);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
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
          <RegistrosTable
            data={currentItems}
            openDescripcionModal={openDescripcionModal}
            openImagenModal={openImagenModal}
            openEditModal={openEditModal}
            handleDelete={handleDelete}
          />
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

        {showModal && (
          <RegistroModal
            onClose={() => {
              setShowModal(false);
              setEditingRecord(null);
              fetchData();
            }}
            editingRecord={editingRecord}
            tipo={activeSection.toLowerCase()}
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
};

export default Pasantias;
