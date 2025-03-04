import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import ModalPortal from "./ModalPortal";

// Icono de papelera
const TrashIcon = () => (
  <svg
    className="w-4 h-4 cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5
         a2 2 0 00-2-2H9a2 2 0 00-2 2v2m-2 0h12"
    />
  </svg>
);

// Icono de "X" para cerrar el modal
const CloseIcon = () => (
  <svg
    className="w-5 h-5 cursor-pointer"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* 
  SUBMODAL: PublicationModal
  --------------------------
*/
const PublicationModal = ({ onClose, onAccept }) => {
  const [titulo, setTitulo] = useState("");
  const [url, setUrl] = useState("");

  const handleAccept = () => {
    onAccept({ titulo, url });
    onClose();
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md rounded-2xl shadow-lg p-4">
          {/* Botón (X) para cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CloseIcon />
          </button>

          <h2 className="text-base font-semibold mb-4 text-gray-700">Nueva Publicación</h2>

          <div className="space-y-3 text-sm">
            {/* Título */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              />
            </div>
            {/* URL */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handleAccept}
              className="bg-[#262D73] text-white py-2 px-5 font-semibold rounded transition duration-200 text-sm hover:bg-[#1F265F] cursor-pointer"
            >
              Aceptar
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white font-semibold px-5 py-2 rounded shadow-md transition duration-200 text-sm hover:bg-red-600 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

PublicationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

/* 
  MODAL PRINCIPAL: FormModalOrganizacion
  ------------------------------
*/
const FormModalOrganizacion = ({ onClose, editingRecord, tipo }) => {
  const [loading, setLoading] = useState(false);

  // Datos de la persona
  const [nombres, setNombres] = useState("");
  const [correo, setCorreo] = useState("");
  const [cargo, setCargo] = useState("");
  const [tituloPersona, setTituloPersona] = useState("");

  // Foto (archivo y vista previa)
  const [foto, setFoto] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const fileInputRef = useRef(null);

  // Publicaciones
  const [publicaciones, setPublicaciones] = useState([]);

  // Submodal
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  // Paginación (2 por página)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Precarga de datos si editingRecord existe
  useEffect(() => {
    console.log("editingRecord:", editingRecord);
    if (editingRecord) {
      setNombres(editingRecord.NombreCompleto || "");
      setCorreo(editingRecord.Correo || "");
      setCargo(editingRecord.Cargo || "");
      setTituloPersona(editingRecord.Titulo || "");

      // Cargar la foto precargada
      setPreviewFoto(
        editingRecord.Foto ? `http://localhost:8000/${editingRecord.Foto}` : null
      );

      // Usar la propiedad "publicaciones" en minúscula
      setPublicaciones(editingRecord.publicaciones || []);
    } else {
      // Limpiar estados
      setNombres("");
      setCorreo("");
      setCargo("");
      setTituloPersona("");
      setFoto(null);
      setPreviewFoto(null);
      setPublicaciones([]);
    }
  }, [editingRecord]);

  // Manejo de la foto (input y drag & drop)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && /image\/(png|jpe?g)/.test(file.type)) {
      setFoto(file);
    }
    e.target.value = "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && /image\/(png|jpe?g)/.test(droppedFile.type)) {
      setFoto(droppedFile);
    }
  };

  // Actualiza la previsualización solo cuando se selecciona una foto nueva
  useEffect(() => {
    if (foto) {
      const objectUrl = URL.createObjectURL(foto);
      setPreviewFoto(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    // Si no se selecciona una foto nueva, no modificamos previewFoto
  }, [foto]);

  const handleRemovePhoto = () => {
    setFoto(null);
    setPreviewFoto(null);
  };

  // Submodal para publicaciones
  const handleOpenSubModal = () => setIsSubModalOpen(true);
  const handleCloseSubModal = () => setIsSubModalOpen(false);

  const handleAddPublication = (newPub) => {
    setPublicaciones((prev) => [...prev, newPub]);
    setCurrentPage(1);
  };

  // Eliminar publicación
  const handleRemovePublication = (globalIndex) => {
    setPublicaciones((prev) => prev.filter((_, i) => i !== globalIndex));
    if (publicaciones.length - 1 <= (currentPage - 1) * itemsPerPage) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  };

  // Paginación
  const totalPages = Math.ceil(publicaciones.length / itemsPerPage);
  const currentPublications = publicaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };
  const handlePageClick = (pageNum) => setCurrentPage(pageNum);

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Nombres", nombres);
    formData.append("Correo", correo);
    formData.append("Cargo", cargo);
    formData.append("TituloPersona", tituloPersona);
    formData.append("RolPersona", tipo);
    if (foto) formData.append("Foto", foto);

    // Enviar publicaciones: si vienen con mayúscula o minúscula
    publicaciones.forEach((pub, index) => {
      const pubTitulo = pub.titulo || pub.Titulo;
      const pubUrl = pub.url || pub.Url;
      formData.append(`publicaciones[${index}][titulo]`, pubTitulo);
      formData.append(`publicaciones[${index}][url]`, pubUrl);
    });

    try {
      if (editingRecord && editingRecord.IdPersona) {
        await axios.post(
          `http://localhost:8000/api/updateOrganizacion/${editingRecord.IdPersona}?_method=PUT`,
          formData
        );
      } else {
        await axios.post("http://localhost:8000/api/storeOrganizacion", formData);
      }
      onClose();
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
    setLoading(false);
  };

  return (
    <ModalPortal>
      {/* Modal Principal */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg p-5 overflow-y-auto max-h-screen">
          {/* Botón (X) para cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CloseIcon />
          </button>

          <h2 className="text-xl text-center font-semibold mb-5 text-gray-700 uppercase">
            {editingRecord ? `Edición ${tipo}` : `Registro ${tipo}`}
          </h2>

          <form onSubmit={handleSubmit} encType="multipart/form-data" className="text-sm">
            {/* Sección: datos de Persona y Foto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Columna Izquierda */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 text-gray-600 font-semibold">Nombres</label>
                  <input
                    type="text"
                    value={nombres}
                    onChange={(e) => setNombres(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600 font-semibold">Correo</label>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600 font-semibold">Cargo</label>
                  <input
                    type="text"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-gray-600 font-semibold">Título</label>
                  <input
                    type="text"
                    value={tituloPersona}
                    onChange={(e) => setTituloPersona(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                </div>
              </div>

              {/* Columna Derecha: Foto */}
              <div className="flex flex-col justify-start">
                <label className="block mb-1 text-gray-600 font-semibold">Foto</label>
                <div
                  className="relative w-full h-[270px] border-2 border-dashed border-gray-300 rounded-md overflow-hidden hover:bg-gray-50"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  {previewFoto ? (
                    <img
                      src={previewFoto}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <span className="text-2xl">+</span>
                      <p className="text-sm text-center">
                        Agregar imagen<br />o arrastrar y soltar
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleFileChange}
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  {previewFoto && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 cursor-pointer"
                      title="Eliminar foto"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sección de Publicaciones */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Publicaciones</h3>
                <button
                  type="button"
                  onClick={handleOpenSubModal}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded font-semibold text-sm cursor-pointer"
                >
                  Agregar Publicación
                </button>
              </div>

              {/* Tabla de Publicaciones */}
              <div className="overflow-x-auto border border-gray-300 rounded-md">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[#5c5c5c] text-white uppercase">
                    <tr>
                      <th className="py-2 px-2">#</th>
                      <th className="py-2 px-2">Título</th>
                      <th className="py-2 px-2">URL</th>
                      <th className="py-2 px-2">Acciones</th>
                    </tr>
                  </thead>
                  {publicaciones.length === 0 ? (
                    <tbody>
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-gray-500">
                          SIN REGISTROS
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody>
                      {currentPublications.map((pub, index) => {
                        const globalIndex = (currentPage - 1) * itemsPerPage + index;
                        return (
                          <tr key={globalIndex} className="border-b last:border-0">
                            <td className="py-2 px-2">{globalIndex + 1}</td>
                            <td className="py-2 px-2">{pub.Titulo || pub.titulo}</td>
                            <td className="py-2 px-2">{pub.Url || pub.url}</td>
                            <td className="py-2 px-2">
                              <button
                                type="button"
                                onClick={() => handleRemovePublication(globalIndex)}
                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-full text-xs cursor-pointer"
                                title="Eliminar publicación"
                              >
                                <TrashIcon />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  )}
                </table>
              </div>

              {/* Paginación para publicaciones */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <div className="inline-flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`px-3 py-2 text-sm ${currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        } cursor-pointer`}
                    >
                      &lt;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => {
                      const pageNum = i + 1;
                      const isActive = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageClick(pageNum)}
                          className={`px-3 py-2 text-sm font-semibold ${isActive
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                            } cursor-pointer`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-2 text-sm ${currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                        } cursor-pointer`}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Botones Guardar/Cancelar */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`bg-[#262D73] text-white py-2 px-5 font-semibold rounded transition duration-200 text-base ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#1F265F]"
                  } cursor-pointer`}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 text-white font-semibold px-5 py-2 rounded shadow-md transition duration-200 text-base cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Submodal para Agregar Publicación */}
      {isSubModalOpen && (
        <PublicationModal onClose={handleCloseSubModal} onAccept={handleAddPublication} />
      )}
    </ModalPortal>
  );
};

FormModalOrganizacion.propTypes = {
  onClose: PropTypes.func.isRequired,
  tipo: PropTypes.string.isRequired,
  editingRecord: PropTypes.shape({
    IdPersona: PropTypes.number,
    NombreCompleto: PropTypes.string,
    Correo: PropTypes.string,
    Cargo: PropTypes.string,
    Titulo: PropTypes.string,
    Foto: PropTypes.string,
    publicaciones: PropTypes.arrayOf(
      PropTypes.shape({
        titulo: PropTypes.string,
        url: PropTypes.string,
      })
    ),
  }),
};

export default FormModalOrganizacion;


