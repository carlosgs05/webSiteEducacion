import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import PropTypes from "prop-types";
import { X } from "lucide-react";
import Layout from "../../components/Layout";
import AddImageSlider from "../../components/AddImageSlider";
import ModalPortal from "../../components/ModalPortal";
import swal from "sweetalert";
import { Editor } from "@tinymce/tinymce-react";

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

const RegistroNoticias = (props) => {
  const location = useLocation();
  const editingRecord =
    props.editingRecord ||
    (location.state && location.state.editingRecord) ||
    null;

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagenPortada, setImagenPortada] = useState(null);
  const [encabezado, setEncabezado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [portadaPreview, setPortadaPreview] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingRecord) {
      setNombre(editingRecord.Nombre || "");
      setFecha(editingRecord.Fecha || "");
      setEncabezado(editingRecord.Encabezado || "");
      setDescripcion(editingRecord.Descripcion || "");
      setPortadaPreview(
        editingRecord.ImagenPortada
          ? `https://pagina-educacion-backend-production.up.railway.app/${editingRecord.ImagenPortada}`
          : ""
      );
      setAdditionalImages(
        (editingRecord.imagenes || []).map((img) => ({
          preview: `https://pagina-educacion-backend-production.up.railway.app/${img.Imagen}`,
          name: img.Imagen,
          file: null,
        }))
      );
    }
    setErrors({});
  }, [editingRecord]);

  const initialSliderImages = useMemo(() => {
    return editingRecord && editingRecord.imagenes
      ? editingRecord.imagenes.map((img) => img.Imagen)
      : [];
  }, [editingRecord]);

  const handleImagesChange = (images) => {
    setAdditionalImages(images);
  };

  const handlePortadaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenPortada(file);
      setPortadaPreview(URL.createObjectURL(file));
      setErrors((prev) => ({ ...prev, imagenPortada: null }));
    }
  };

  const handleRemovePortada = () => {
    setImagenPortada(null);
    setPortadaPreview("");
  };

  // Limpia errores de un campo al cambiar
  const handleFieldChange = (field, setter) => (e) => {
    setter(e.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("Fecha", fecha);
    formData.append("Encabezado", encabezado);
    formData.append("Descripcion", descripcion);

    if (imagenPortada) {
      formData.append("ImagenPortada", imagenPortada);
    } else if (!editingRecord) {
      setErrors((prev) => ({
        ...prev,
        imagenPortada: "La imagen de portada es requerida",
      }));
      setLoading(false);
      return;
    }

    additionalImages.forEach((img, index) => {
      if (img.file) {
        formData.append(`Imagenes[${index}]`, img.file);
      }
    });

    try {
      setUploading(true);
      setProgress(0);

      const config = {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      };

      if (editingRecord) {
        await axios.post(
          `https://pagina-educacion-backend-production.up.railway.app/api/updateNoticia/${editingRecord.IdNoticia}?_method=PUT`,
          formData,
          config
        );
        swal(
          "¡Éxito!",
          "La noticia ha sido actualizada correctamente",
          "success"
        );
      } else {
        await axios.post(
          "https://pagina-educacion-backend-production.up.railway.app/api/storeNoticia",
          formData,
          config
        );
        swal(
          "¡Éxito!",
          "La noticia ha sido registrada correctamente",
          "success"
        );
      }
      window.location.href = "/noticias";
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
        swal("Error", "Corrige los campos en rojo.", "error");
      } else {
        swal("Error", "Ocurrió un error inesperado.", "error");
      }
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4">
        {/* Modal Principal */}
        <div className="relative w-full flex flex-col">
          {/* Encabezado */}
          <div className="p-4 flex justify-center items-center">
            <h2 className="text-2xl font-bold text-blue-800">
              {editingRecord ? "Edición de Noticia" : "Registro de Noticia"}
            </h2>
          </div>

          {/* Contenido con scroll interno */}
          <div className="p-5 overflow-y-auto flex-1">
            <form onSubmit={handleSubmit}>
              {/* Fila 1 - Título */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  value={nombre}
                  onChange={handleFieldChange("Nombre", setNombre)}
                  className={`w-full border ${
                    errors.Nombre ? "border-red-500" : "border-gray-300"
                  } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                    errors.Nombre ? "ring-red-200" : "focus:ring-[#262D73]"
                  }`}
                />
                {errors.Nombre && (
                  <p className="text-red-500 text-xs mt-1">{errors.Nombre}</p>
                )}
              </div>

              {/* Fila 2 - Encabezado y Fecha */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="md:col-span-3">
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Encabezado
                  </label>
                  <input
                    type="text"
                    value={encabezado}
                    onChange={handleFieldChange("Encabezado", setEncabezado)}
                    className={`w-full border ${
                      errors.Encabezado ? "border-red-500" : "border-gray-300"
                    } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.Encabezado ? "ring-red-200" : "focus:ring-[#262D73]"
                    }`}
                  />
                  {errors.Encabezado && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.Encabezado}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={handleFieldChange("Fecha", setFecha)}
                    className={`w-full border ${
                      errors.Fecha ? "border-red-500" : "border-gray-300"
                    } p-3 rounded-lg focus:outline-none focus:ring-2 ${
                      errors.Fecha ? "ring-red-200" : "focus:ring-[#262D73]"
                    } cursor-pointer`}
                  />
                  {errors.Fecha && (
                    <p className="text-red-500 text-xs mt-1">{errors.Fecha}</p>
                  )}
                </div>
              </div>

              {/* Fila 3 - Imagen Portada */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Imagen Portada
                </label>
                <div
                  className={`relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 ${
                    errors.imagenPortada
                      ? "border-red-500"
                      : "border-gray-300 border-dashed"
                  } cursor-pointer`}
                >
                  <input
                    type="file"
                    onChange={handlePortadaChange}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {portadaPreview ? (
                    <>
                      <img
                        src={portadaPreview}
                        alt="Preview"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemovePortada}
                        className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition cursor-pointer"
                        title="Eliminar portada"
                      >
                        <X size={18} />
                      </button>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4">
                      <div className="mb-3 bg-gray-100 rounded-full p-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </div>
                      <p className="text-center text-sm">
                        Arrastra una imagen aquí o haz clic para seleccionar
                      </p>
                    </div>
                  )}
                </div>
                {errors.imagenPortada && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.imagenPortada}
                  </p>
                )}
              </div>

              {/* Fila 4 - Editor */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Contenido
                </label>
                <Editor
                  apiKey="zsreosue31kcsf5ix18jl7q2kevuuhr3ub3pimiv650qe599"
                  value={descripcion}
                  onEditorChange={(content) => {
                    setDescripcion(content);
                    setErrors((prev) => ({ ...prev, Descripcion: null }));
                  }}
                  init={{
                    language: "es",
                    height: 400,
                    menubar: "file edit view insert format tools",
                    plugins: [
                      "autolink",
                      "lists",
                      "link",
                      "preview",
                      "searchreplace",
                      "visualblocks",
                      "insertdatetime",
                      "media",
                      "table",
                      "paste",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic underline | " +
                      "alignleft aligncenter alignright alignjustify | " +
                      "bullist numlist outdent indent | link unlink | help",
                    branding: false,
                    elementpath: false,
                    statusbar: false,
                    link_title: false,
                    rel_list: false,
                    target_list: [
                      { title: "Misma ventana", value: "" },
                      { title: "Nueva pestaña", value: "_blank" },
                    ],
                    default_link_target: "",
                    link_dialog_fields: "href target",
                    setup: (editor) => {
                      editor.on("OpenWindow", (e) => {
                        setTimeout(() => {
                          const dialogEl = e.windowApi.getEl();
                          dialogEl
                            .querySelectorAll(".tox-form__group")
                            .forEach((group) => {
                              const label = group.querySelector(
                                ".tox-form__group-label"
                              );
                              if (
                                label &&
                                label.textContent.trim() === "Texto a mostrar"
                              ) {
                                group.style.display = "none";
                              }
                            });
                        }, 0);
                      });
                    },
                    content_style:
                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  }}
                />
                {errors.Descripcion && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.Descripcion}
                  </p>
                )}
              </div>

              {/* Fila 5 - Imágenes adicionales */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Galería de imágenes
                </label>
                <AddImageSlider
                  initialImages={initialSliderImages}
                  onImagesChange={handleImagesChange}
                />
              </div>

              {/* Botones */}
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center justify-center gap-2 bg-[#262D73] text-white py-2 px-6 rounded-xl font-medium transition ${
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
                  onClick={() => window.history.back()}
                  className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-xl transition cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Modal de progreso para carga */}
        {uploading && (
          <ModalPortal>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
              <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all">
                <div className="flex flex-col items-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {editingRecord ? "Actualizando" : "Guardando"}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Por favor, espere mientras se guardan los cambios
                  </p>
                  
                  {/* Barra de progreso con gradiente moderno */}
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  
                  {/* Indicador numérico */}
                  <div className="w-full flex justify-between px-1">
                    <span className="text-xs font-medium text-blue-600">0%</span>
                    <span className="text-xs font-medium text-blue-600">
                      {progress}%
                    </span>
                    <span className="text-xs font-medium text-blue-600">100%</span>
                  </div>
                  
                  {/* Indicador de carga animado */}
                  <div className="mt-4 flex space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ModalPortal>
        )}
      </div>
    </Layout>
  );
};

RegistroNoticias.propTypes = {
  editingRecord: PropTypes.shape({
    IdNoticia: PropTypes.number,
    Nombre: PropTypes.string,
    Fecha: PropTypes.string,
    ImagenPortada: PropTypes.string,
    Encabezado: PropTypes.string,
    Descripcion: PropTypes.string,
    imagenes: PropTypes.arrayOf(
      PropTypes.shape({
        IdImagen: PropTypes.number,
        Imagen: PropTypes.string,
      })
    ),
  }),
};

export default RegistroNoticias;