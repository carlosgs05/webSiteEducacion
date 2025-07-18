import { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../../components/Layout";
import Button from "../../components/Button";
import RegistroModal from "./RegistroModal";
import DescripcionModal from "../../components/DescripcionModal";
import LoadingIndicator from "../../components/LoadingIndicator";
import swal from "sweetalert";

const Documentos = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showDescripcionModal, setShowDescripcionModal] = useState(false);
  const [descripcionActual, setDescripcionActual] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://pagina-educacion-backend-production.up.railway.app/api/documentos");
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener los documentos", error);
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
          .delete(`https://pagina-educacion-backend-production.up.railway.app/api/destroyDocumento/${id}`)
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

  return (
    <Layout>
      <div className="p-4">
        <div className="mb-9">
          <h2 className="text-2xl text-center font-medium text-blue-800 uppercase">
            Documentos
          </h2>
          <div className="my-6">
            <Button
              name="Nuevo Registro"
              onClick={openNewModal}
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
                  <th className="px-4 py-3 text-center">Descripción</th>
                  <th className="px-4 py-3 text-center">URL</th>
                  <th className="px-4 py-3 text-center">Opciones</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr className="bg-white border-b">
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      SIN REGISTROS
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr
                      key={item.IdDocumento}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-gray-100`}
                    >
                      <td className="py-2 px-4 text-center">{item.Titulo}</td>
                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => openDescripcionModal(item.Descripcion)}
                          className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md transition"
                        >
                          Ver Descripción
                        </button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <a
                          href={item.Url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {item.Url}
                        </a>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <div className="flex justify-center space-x-2">
                          <button
                            onClick={() => openEditModal(item)}
                            className="cursor-pointer bg-[#262D73] hover:bg-[#36395d] p-1 rounded-md transition"
                            title="Editar"
                          >
                            <FaEdit className="h-5 w-5 text-white" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.IdDocumento)}
                            className="cursor-pointer bg-red-500 hover:bg-red-600 p-1 rounded-md transition"
                            title="Eliminar"
                          >
                            <FaTrash className="h-5 w-5 text-white" />
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

        {showDescripcionModal && (
          <DescripcionModal
            descripcion={descripcionActual}
            onClose={() => setShowDescripcionModal(false)}
            nombre="Descripción"
          />
        )}
      </div>
    </Layout>
  );
};

export default Documentos;
