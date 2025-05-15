import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import swal from "sweetalert";
import ModalPortal from "./ModalPortal";

// Icono de papelera
const TrashIcon = () => (
  <svg
    className="w-5 h-5 cursor-pointer hover:text-red-600 transition"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 
         21H7.862a2 2 0 01-1.995-1.858L5 
         7m5 4v6m4-6v6m1-10V5a2 2 0 
         00-2-2H9a2 2 0 00-2 2v2m-2 
         0h12"
    />
  </svg>
);

// Icono de "X" para cerrar el modal
const CloseIcon = () => (
  <svg
    className="w-6 h-6 cursor-pointer hover:text-gray-700 transition"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// Spinner inline para el botón
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
    />
  </svg>
);

/*
SUBMODAL: PublicationModal
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

          <h2 className="text-base font-semibold mb-4 text-gray-700">
            Nueva Publicación
          </h2>

          <div className="space-y-3 text-sm">
            {/* Título */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">
                Título
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
              />
            </div>
            {/* URL */}
            <div>
              <label className="block mb-1 text-gray-600 font-semibold">
                URL
              </label>
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
              className="bg-[#262D73] cursor-pointer text-white py-2 px-5 font-semibold rounded-lg transition duration-200 text-sm hover:bg-[#1F265F]"
            >
              Aceptar
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 cursor-pointer text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-200 text-sm hover:bg-red-600"
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

  // Errores de validación del backend
  const [errors, setErrors] = useState({});

  // Precarga de datos
  useEffect(() => {
    if (editingRecord) {
      setNombres(editingRecord.NombreCompleto || "");
      setCorreo(editingRecord.Correo || "");
      setCargo(editingRecord.Cargo || "");
      setTituloPersona(editingRecord.Titulo || "");
      setPreviewFoto(
        editingRecord.Foto
          ? `http://localhost:8000/${editingRecord.Foto}`
          : null
      );
      setPublicaciones(editingRecord.publicaciones || []);
    } else {
      setNombres("");
      setCorreo("");
      setCargo("");
      setTituloPersona("");
      setFoto(null);
      setPreviewFoto(null);
      setPublicaciones([]);
    }
    setErrors({});
    setCurrentPage(1);
  }, [editingRecord]);

  // Vista previa de la foto local
  useEffect(() => {
    if (foto) {
      const objectUrl = URL.createObjectURL(foto);
      setPreviewFoto(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [foto]);

  // Manejo de la foto
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

  const handleRemovePhoto = () => {
    setFoto(null);
    setPreviewFoto(null);
  };

  // Submodal publicaciones
  const handleOpenSubModal = () => setIsSubModalOpen(true);
  const handleCloseSubModal = () => setIsSubModalOpen(false);
  const handleAddPublication = (newPub) => {
    setPublicaciones((prev) => [...prev, newPub]);
    setCurrentPage(1);
  };
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

  // Limpia errores de un campo al cambiar
  const handleFieldChange = (field, setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // Envío del formulario (sin validación cliente)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("Nombres", nombres);
    formData.append("Correo", correo);
    formData.append("Cargo", cargo);
    formData.append("TituloPersona", tituloPersona);
    formData.append("RolPersona", tipo);
    if (foto) formData.append("Foto", foto);

    publicaciones.forEach((pub, index) => {
      formData.append(`publicaciones[${index}][titulo]`, pub.titulo);
      formData.append(`publicaciones[${index}][url]`, pub.url);
    });

    try {
      const url =
        editingRecord && editingRecord.IdPersona
          ? `http://localhost:8000/api/updateOrganizacion/${editingRecord.IdPersona}`
          : "http://localhost:8000/api/storeOrganizacion";
      const resp = await axios.post(url, formData);
      swal("¡Éxito!", resp.data.message, "success");
      onClose();
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        swal("Error", "Corrige los campos en rojo.", "error");
      } else {
        swal("Error", "Ocurrió un error inesperado.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalPortal>
      {/* Modal Principal */}
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <CloseIcon />
          </button>

          <h2 className="text-2xl text-center font-semibold mb-5 text-gray-700 uppercase">
            {editingRecord ? `Edición ${tipo}` : `Registro ${tipo}`}
          </h2>

          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="text-sm"
          >
            {/* Datos y Foto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-4">
                {/* Nombres */}
                <div>
                  <label className="block mb-1 font-semibold">Nombres</label>
                  <input
                    type="text"
                    value={nombres}
                    onChange={handleFieldChange("Nombres", setNombres)}
                    className={`w-full border p-2 rounded focus:outline-none focus:ring ${
                      errors.Nombres
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 ring-gray-400"
                    }`}
                  />
                  {errors.Nombres && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.Nombres}
                    </p>
                  )}
                </div>

                {/* Correo */}
                <div>
                  <label className="block mb-1 font-semibold">Correo</label>
                  <input
                    type="email"
                    value={correo}
                    onChange={handleFieldChange("Correo", setCorreo)}
                    className={`w-full border p-2 rounded focus:outline-none focus:ring ${
                      errors.Correo
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 ring-gray-400"
                    }`}
                  />
                  {errors.Correo && (
                    <p className="text-red-500 text-xs mt-1">{errors.Correo}</p>
                  )}
                </div>

                {/* Cargo */}
                <div>
                  <label className="block mb-1 font-semibold">Cargo</label>
                  <input
                    type="text"
                    value={cargo}
                    onChange={handleFieldChange("Cargo", setCargo)}
                    className={`w-full border p-2 rounded focus:outline-none focus:ring ${
                      errors.Cargo
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 ring-gray-400"
                    }`}
                  />
                  {errors.Cargo && (
                    <p className="text-red-500 text-xs mt-1">{errors.Cargo}</p>
                  )}
                </div>

                {/* Título */}
                <div>
                  <label className="block mb-1 font-semibold">Título</label>
                  <input
                    type="text"
                    value={tituloPersona}
                    onChange={handleFieldChange(
                      "TituloPersona",
                      setTituloPersona
                    )}
                    className={`w-full border p-2 rounded focus:outline-none focus:ring ${
                      errors.TituloPersona
                        ? "border-red-500 ring-red-200"
                        : "border-gray-300 ring-gray-400"
                    }`}
                  />
                  {errors.TituloPersona && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.TituloPersona}
                    </p>
                  )}
                </div>
              </div>

              {/* Foto */}
              <div className="flex flex-col">
                <label className="block mb-1 font-semibold">Foto</label>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`relative w-full h-[271px] border-2 border-dashed border-gray-300 rounded-md overflow-hidden hover:bg-gray-50 cursor-pointer ${
                    errors.Foto ? "border-red-500" : "border-gray-300"
                  }`}
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
                        Agregar imagen
                        <br />o arrastrar y soltar
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  {previewFoto && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer hover:bg-red-600 transition"
                      title="Eliminar foto"
                    >
                      <TrashIcon />
                    </button>
                  )}
                </div>
                {errors.Foto && (
                  <p className="text-red-500 text-xs mt-1">{errors.Foto[0]}</p>
                )}
              </div>
            </div>

            {/* Publicaciones */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">Publicaciones</h3>
                <button
                  type="button"
                  onClick={handleOpenSubModal}
                  className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold"
                >
                  Agregar
                </button>
              </div>

              <div className="overflow-x-auto border border-gray-300 rounded-md">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-800 text-white uppercase text-sm h-11">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Título</th>
                      <th className="p-2">URL</th>
                      <th className="p-2">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publicaciones.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-gray-500 text-sm"
                        >
                          SIN REGISTROS
                        </td>
                      </tr>
                    )}
                    {currentPublications.map((pub, idx) => {
                      const globalIndex =
                        (currentPage - 1) * itemsPerPage + idx;
                      return (
                        <tr
                          key={globalIndex}
                          className="border-b last:border-0"
                        >
                          <td className="px-2 py-2 text-base">
                            {globalIndex + 1}
                          </td>
                          <td className="px-2 py-2 text-base">
                            <span
                              className={
                                errors[`publicaciones.${globalIndex}.titulo`]
                                  ? "text-red-500"
                                  : ""
                              }
                            >
                              {pub.Titulo || pub.titulo}
                            </span>
                            {errors[`publicaciones.${globalIndex}.titulo`] && (
                              <p className="text-red-500 text-xs">
                                {errors[`publicaciones.${globalIndex}.titulo`]}
                              </p>
                            )}
                          </td>
                          <td className="px-2 py-2 text-base">
                            <span
                              className={
                                errors[`publicaciones.${globalIndex}.url`]
                                  ? "text-red-500"
                                  : ""
                              }
                            >
                              {pub.Url || pub.url}
                            </span>
                            {errors[`publicaciones.${globalIndex}.url`] && (
                              <p className="text-red-500 text-xs">
                                {errors[`publicaciones.${globalIndex}.url`]}
                              </p>
                            )}
                          </td>
                          <td className="px-2 py-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleRemovePublication(globalIndex)
                              }
                              className="cursor-pointer text-red-600 hover:text-red-800 transition"
                            >
                              <TrashIcon />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-2 space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-2 py-1 rounded cursor-pointer border"
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageClick(i + 1)}
                      className={`px-2 py-1 rounded cursor-pointer border ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-white"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="px-2 py-1 rounded cursor-pointer border"
                  >
                    &gt;
                  </button>
                </div>
              )}
            </div>

            {/* Botones Guardar/Cancelar */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 bg-[#262D73] text-white py-2 px-6 rounded-lg font-semibold transition cursor-pointer ${
                  loading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-[#1F265F]"
                }`}
              >
                {loading && <Spinner />}
                {loading ? "Guardando..." : "Guardar"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-red-500 cursor-pointer text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-600 transition"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>

        {isSubModalOpen && (
          <PublicationModal
            onClose={handleCloseSubModal}
            onAccept={handleAddPublication}
          />
        )}
      </div>
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
