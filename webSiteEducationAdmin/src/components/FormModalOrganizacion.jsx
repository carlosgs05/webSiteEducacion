import { useState, useEffect, useRef } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import swal from "sweetalert";
import ModalPortal from "./ModalPortal";
import { X, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";

// Spinner para el botón
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
  const [errors, setErrors] = useState({ titulo: null, url: null });

  const validate = () => {
    const newErrors = { titulo: null, url: null };
    let isValid = true;

    if (!titulo.trim()) {
      newErrors.titulo = "El título es obligatorio";
      isValid = false;
    }

    if (!url.trim()) {
      newErrors.url = "La URL es obligatoria";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAccept = () => {
    if (validate()) {
      onAccept({ titulo, url });
      onClose();
    }
  };

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
    if (errors.titulo) {
      setErrors((prev) => ({ ...prev, titulo: null }));
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    if (errors.url) {
      setErrors((prev) => ({ ...prev, url: null }));
    }
  };

  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
          {/* Encabezado */}
          <div className="bg-[#545454] p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              Nueva Publicación
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 cursor-pointer"
              title="Cerrar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-5 space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                value={titulo}
                onChange={handleTituloChange}
                className={`w-full border ${
                  errors.titulo ? "border-red-500" : "border-gray-300"
                } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.titulo ? "ring-red-200" : "focus:ring-[#262D73]"
                } text-sm`}
              />
              {errors.titulo && (
                <p className="text-red-500 text-xs mt-1">{errors.titulo}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                URL
              </label>
              <input
                type="text"
                value={url}
                onChange={handleUrlChange}
                className={`w-full border ${
                  errors.url ? "border-red-500" : "border-gray-300"
                } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                  errors.url ? "ring-red-200" : "focus:ring-[#262D73]"
                } text-sm`}
              />
              {errors.url && (
                <p className="text-red-500 text-xs mt-1">{errors.url}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-5 py-4 flex justify-end gap-3 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-[#262D73] hover:bg-[#363D8F] text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer text-sm"
            >
              Aceptar
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
          ? `https://pagina-educacion-backend-production.up.railway.app/${editingRecord.Foto}`
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
          ? `https://pagina-educacion-backend-production.up.railway.app/api/updateOrganizacion/${editingRecord.IdPersona}`
          : "https://pagina-educacion-backend-production.up.railway.app/api/storeOrganizacion";
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
        <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col max-h-[98vh]">
          {/* Encabezado */}
          <div className="bg-[#545454] p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-white">
              {editingRecord ? `Edición ${tipo}` : `Registro ${tipo}`}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 cursor-pointer"
              title="Cerrar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido con scroll interno */}
          <div className="p-5 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Datos y Foto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  {/* Nombres */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Nombres
                    </label>
                    <input
                      type="text"
                      value={nombres}
                      onChange={handleFieldChange("Nombres", setNombres)}
                      className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.Nombres
                          ? "border-red-500 ring-red-200"
                          : "border-gray-300 ring-[#262D73]"
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
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <input
                      type="email"
                      value={correo}
                      onChange={handleFieldChange("Correo", setCorreo)}
                      className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.Correo
                          ? "border-red-500 ring-red-200"
                          : "border-gray-300 ring-[#262D73]"
                      }`}
                    />
                    {errors.Correo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.Correo}
                      </p>
                    )}
                  </div>

                  {/* Cargo */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Cargo
                    </label>
                    <input
                      type="text"
                      value={cargo}
                      onChange={handleFieldChange("Cargo", setCargo)}
                      className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.Cargo
                          ? "border-red-500 ring-red-200"
                          : "border-gray-300 ring-[#262D73]"
                      }`}
                    />
                    {errors.Cargo && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.Cargo}
                      </p>
                    )}
                  </div>

                  {/* Título */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Título
                    </label>
                    <input
                      type="text"
                      value={tituloPersona}
                      onChange={handleFieldChange(
                        "TituloPersona",
                        setTituloPersona
                      )}
                      className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 ${
                        errors.TituloPersona
                          ? "border-red-500 ring-red-200"
                          : "border-gray-300 ring-[#262D73]"
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
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Foto
                  </label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className={`relative w-full h-[330px] border-2 border-dashed rounded-xl overflow-hidden cursor-pointer ${
                      errors.Foto ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    {previewFoto ? (
                      <>
                        <img
                          src={previewFoto}
                          alt="Vista previa"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={handleRemovePhoto}
                          className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full cursor-pointer hover:bg-red-600 transition"
                          title="Eliminar foto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-4">
                        <div className="mb-3 bg-gray-100 rounded-full p-3">
                          <Plus size={24} />
                        </div>
                        <p className="text-center text-sm">
                          Arrastra una imagen aquí o haz clic para seleccionar
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
                  </div>
                  {errors.Foto && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.Foto[0]}
                    </p>
                  )}
                </div>
              </div>

              {/* Publicaciones */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">Publicaciones</h3>
                  <button
                    type="button"
                    onClick={handleOpenSubModal}
                    className="flex items-center gap-2 cursor-pointer bg-[#4CAF50] hover:bg-[#45A049] text-white px-4 py-2 rounded-lg transition font-medium text-sm"
                  >
                    <Plus size={18} />
                    Agregar publicación
                  </button>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <table className="w-full text-sm">
                    <thead className="bg-[#545454] text-white">
                      <tr className="h-12">
                        <th className="px-4 text-left">#</th>
                        <th className="px-4 text-left">Título</th>
                        <th className="px-4 text-left">URL</th>
                        <th className="px-4 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publicaciones.length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-6 text-center text-gray-500 text-sm"
                          >
                            SIN REGISTROS
                          </td>
                        </tr>
                      ) : (
                        currentPublications.map((pub, idx) => {
                          const globalIndex =
                            (currentPage - 1) * itemsPerPage + idx;
                          return (
                            <tr
                              key={globalIndex}
                              className={`border-b border-gray-100 ${
                                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                              }`}
                            >
                              <td className="px-4 py-3 text-gray-600">
                                {globalIndex + 1}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={
                                    errors[
                                      `publicaciones.${globalIndex}.titulo`
                                    ]
                                      ? "text-red-500"
                                      : "text-gray-800"
                                  }
                                >
                                  {pub.Titulo || pub.titulo}
                                </span>
                                {errors[
                                  `publicaciones.${globalIndex}.titulo`
                                ] && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {
                                      errors[
                                        `publicaciones.${globalIndex}.titulo`
                                      ]
                                    }
                                  </p>
                                )}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={
                                    errors[`publicaciones.${globalIndex}.url`]
                                      ? "text-red-500"
                                      : "text-gray-800"
                                  }
                                >
                                  {pub.Url || pub.url}
                                </span>
                                {errors[`publicaciones.${globalIndex}.url`] && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors[`publicaciones.${globalIndex}.url`]}
                                  </p>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemovePublication(globalIndex)
                                  }
                                  className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                  title="Eliminar"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-600">
                      Página {currentPage} de {totalPages}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        }`}
                      >
                        <ChevronLeft size={16} />
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          type="button"
                          key={i}
                          onClick={() => handlePageClick(i + 1)}
                          className={`flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                            currentPage === i + 1
                              ? "bg-[#262D73] text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          } cursor-pointer`}
                        >
                          {i + 1}
                        </button>
                      ))}

                      <button
                        type="button"
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          currentPage === totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                        }`}
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones Guardar/Cancelar */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 bg-[#262D73] text-white py-2 px-4 rounded-xl font-medium transition ${
                    loading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-[#363D8F] cursor-pointer"
                  }`}
                >
                  {loading && <Spinner />}
                  {loading ? "Guardando..." : "Guardar"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Submodal para publicaciones */}
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
