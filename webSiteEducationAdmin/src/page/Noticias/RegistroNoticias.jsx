import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import PropTypes from "prop-types";
import LoadingIndicator from "../../components/LoadingIndicator";
import AddImageSlider from "../../components/AddImageSlider";
import Layout from "../../components/Layout";
import swal from "sweetalert";
import { Editor } from "@tinymce/tinymce-react";

const RegistroNoticias = (props) => {
  const location = useLocation();
  const editingRecord =
    props.editingRecord ||
    (location.state && location.state.editingRecord) ||
    null;

  const [loading, setLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [imagenPortada, setImagenPortada] = useState(null);
  const [encabezado, setEncabezado] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [additionalImages, setAdditionalImages] = useState([]);
  const [portadaPreview, setPortadaPreview] = useState("");

  useEffect(() => {
    if (editingRecord) {
      setNombre(editingRecord.Nombre || "");
      setFecha(editingRecord.Fecha || "");
      setEncabezado(editingRecord.Encabezado || "");
      setDescripcion(editingRecord.Descripcion || "");
      setPortadaPreview(`https://pagina-educacion-backend-production.up.railway.app/${editingRecord.ImagenPortada}`);
      setAdditionalImages(
        (editingRecord.imagenes || []).map((img) => ({
          preview: `https://pagina-educacion-backend-production.up.railway.app/${img.Imagen}`,
          name: img.Imagen,
          file: null,
        }))
      );
    }
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
    }
  };

  const handleRemovePortada = () => {
    setImagenPortada(null);
    setPortadaPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("Fecha", fecha);
    formData.append("Encabezado", encabezado);
    formData.append("Descripcion", descripcion);

    if (imagenPortada) {
      formData.append("ImagenPortada", imagenPortada);
    }

    additionalImages.forEach((img, index) => {
      if (img.file) {
        formData.append(`Imagenes[${index}]`, img.file);
      }
    });

    try {
      if (editingRecord) {
        await axios.post(
          `https://pagina-educacion-backend-production.up.railway.app/api/updateNoticia/${editingRecord.IdNoticia}?_method=PUT`,
          formData
        );
        swal(
          "¡Noticia actualizada!",
          "La noticia ha sido actualizada con éxito",
          "success"
        );
        window.location.href = "/noticias";
      } else {
        await axios.post("https://pagina-educacion-backend-production.up.railway.app/api/storeNoticia", formData);
        swal(
          "¡Noticia registrada!",
          "La noticia ha sido registrada con éxito",
          "success"
        );
        window.location.href = "/noticias";
      }
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      swal("Error", "Hubo un problema al guardar la noticia", "error");
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl text-center font-bold mb-6 text-gray-800">
          {editingRecord ? "Editar Noticia" : "Nueva Noticia"}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Fila 1 - Título */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#262D73] focus:border-transparent"
            />
          </div>

          {/* Fila 2 - Encabezado y Fecha */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <label className="block text-base font-medium text-gray-700 mb-2">
                Encabezado
              </label>
              <input
                type="text"
                value={encabezado}
                onChange={(e) => setEncabezado(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#262D73] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-base font-medium text-gray-700 mb-2">
                Fecha
              </label>
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#262D73] focus:border-transparent cursor-pointer"
              />
            </div>
          </div>

          {/* Fila 3 - Imagen Portada */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Imagen Portada
            </label>
            <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border-2 border-dashed border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer">
              {/* Input cubre todo para drag&drop y clic */}
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
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition cursor-pointer"
                  >
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 
                           21H7.862a2 2 0 01-1.995-1.858L5 
                           7m5 4v6m4-6v6m1-10V5a2 2 0 
                           00-2-2H9a2 2 0 00-2 2v2m3 
                           0h4"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 pointer-events-none">
                  <svg
                    className="w-12 h-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <span className="text-sm text-center">
                    Haz clic para seleccionar una imagen
                    <br />o arrastra y suelta aquí
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Fila 4 - Editor */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Contenido
            </label>
            <Editor
              apiKey="zsreosue31kcsf5ix18jl7q2kevuuhr3ub3pimiv650qe599"
              value={descripcion}
              onEditorChange={setDescripcion}
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

                /* —— CONFIG LINK DIALOG —— */
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
          </div>

          {/* Fila 5 - Imágenes adicionales */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Galería de imágenes
            </label>
            <AddImageSlider
              initialImages={initialSliderImages}
              onImagesChange={handleImagesChange}
            />
          </div>

          {/* Botones centrados */}
          <div className="flex justify-center gap-6 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#262D73] text-white rounded-lg hover:bg-[#1F265F] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <LoadingIndicator />
                  Guardando...
                </div>
              ) : (
                "Guardar Noticia"
              )}
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        </form>
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
