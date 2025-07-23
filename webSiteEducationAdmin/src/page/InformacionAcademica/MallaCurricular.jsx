import { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import { FaEye, FaEdit, FaTrash, FaPlus, FaFilePdf } from "react-icons/fa";
import Layout from "../../components/Layout";
import LoadingIndicator from "../../components/LoadingIndicator";
import FormCursosModal from "../../components/FormCursosModal";

const MallaCurricular = () => {
  const [malla, setMalla] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const [nombreMalla, setNombreMalla] = useState("");
  const [pdfMalla, setPdfMalla] = useState(null);
  const [pdfRemoved, setPdfRemoved] = useState(false);

  const [showCursosModal, setShowCursosModal] = useState(false);
  const [selectedCurso, setSelectedCurso] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(cursos.length / itemsPerPage);
  const currentCursos = cursos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pdfInputRef = useRef(null);

  const getCleanPdfName = (fullPath) => {
    let name = fullPath.replace(/^.*[\\/]/, "");
    const underscoreIndex = name.indexOf("_");
    if (underscoreIndex !== -1) {
      name = name.substring(underscoreIndex + 1);
    }
    return name;
  };

  const getPdfUrl = () => {
    if (!malla || !malla.pdfMalla) return "";
    return malla.pdfMalla.startsWith("http")
      ? malla.pdfMalla
      : `https://pagina-educacion-backend-production.up.railway.app/${malla.pdfMalla}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://pagina-educacion-backend-production.up.railway.app/api/malla"
        );
        const { malla: mallaData, cursos: cursosData } = response.data;
        setMalla(mallaData || null);
        setCursos(cursosData || []);
        if (mallaData) {
          setNombreMalla(mallaData.nombreMalla || "");
        }
      } catch (error) {
        console.error("Error obteniendo la malla:", error);
        setMalla(null);
        setCursos([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleRegistrar = () => {
    setIsEditing(true);
    setIsNew(true);
    setMalla(null);
    setNombreMalla("");
    setPdfMalla(null);
    setPdfRemoved(false);
    setCurrentPage(1);
  };

  const handleEditar = () => {
    setIsEditing(true);
    setIsNew(false);
    setPdfRemoved(false);
  };

  const handleEliminar = () => {
    if (!malla) return;
    swal({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la malla curricular. ¡No podrás revertirla!",
      icon: "warning",
      buttons: ["Cancelar", "Sí, eliminar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(
            "https://pagina-educacion-backend-production.up.railway.app/api/destroyMalla"
          )
          .then(() => {
            swal(
              "Eliminado",
              "La malla curricular ha sido eliminada.",
              "success"
            ).then(() => {
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error("Error eliminando malla:", error);
            swal(
              "Error",
              "Ocurrió un error al eliminar la malla curricular.",
              "error"
            );
          });
      }
    });
  };

  const handleGuardar = async () => {
    try {
      const formData = new FormData();
      formData.append("nombreMalla", nombreMalla);
      const cursosParaBackend = cursos.map((c) => ({
        Nombre: c.Nombre,
        IdCiclo: c.ciclo?.IdCiclo || null,
      }));
      formData.append("cursos", JSON.stringify(cursosParaBackend));
      if (pdfMalla) {
        formData.append("pdfMalla", pdfMalla);
      }

      if (isNew) {
        await axios.post(
          "https://pagina-educacion-backend-production.up.railway.app/api/storeMalla",
          formData
        );
        swal(
          "Creado",
          "La malla curricular ha sido registrada con éxito.",
          "success"
        ).then(() => {
          window.location.reload();
        });
      } else {
        await axios.post(
          "https://pagina-educacion-backend-production.up.railway.app/api/updateMalla",
          formData
        );
        swal(
          "Actualizado",
          "La malla curricular ha sido actualizada con éxito.",
          "success"
        ).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.error("Error guardando la malla:", error);
      swal("Error", "Ocurrió un error al guardar la malla.", "error");
    }
  };

  const handleCancelar = () => {
    if (malla) {
      setNombreMalla(malla.nombreMalla || "");
      setPdfMalla(null);
      setPdfRemoved(false);
      setIsEditing(false);
    } else {
      setNombreMalla("");
      setPdfMalla(null);
      setPdfRemoved(false);
      setIsEditing(false);
    }
  };

  const handleAgregarCurso = () => {
    setSelectedCurso(null);
    setShowCursosModal(true);
  };

  const handleEditarCurso = (course) => {
    setSelectedCurso(course);
    setShowCursosModal(true);
  };

  const handleAddOrUpdateCursoModal = (curso) => {
    if (!selectedCurso) {
      const nuevoCurso = {
        IdCurso: `temp-${Date.now()}`,
        Nombre: curso.nombre,
        ciclo: {
          IdCiclo: curso.ciclo.value,
          Ciclo: curso.ciclo.label,
        },
      };
      setCursos((prev) => [...prev, nuevoCurso]);
    } else {
      const updatedCourses = [...cursos];
      const indexToUpdate = updatedCourses.findIndex(
        (c) => c.IdCurso === selectedCurso.IdCurso
      );
      if (indexToUpdate !== -1) {
        updatedCourses[indexToUpdate].Nombre = curso.nombre;
        updatedCourses[indexToUpdate].ciclo = {
          IdCiclo: curso.ciclo.value,
          Ciclo: curso.ciclo.label,
        };
      }
      setCursos(updatedCourses);
    }
    setShowCursosModal(false);
    setSelectedCurso(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfMalla(file);
      setPdfRemoved(false);
    }
    e.target.value = "";
  };

  const handleRemovePdf = () => {
    setPdfMalla(null);
    setPdfRemoved(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (isEditing) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!isEditing) return;
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setPdfMalla(file);
      setPdfRemoved(false);
    }
  };

  // Generar números de página con límites
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (pageNum) => setCurrentPage(pageNum);

  if (loading) {
    return (
      <Layout>
        <div className="p-4 flex items-center justify-center">
          <LoadingIndicator />
        </div>
      </Layout>
    );
  }

  if (!malla && !isEditing) {
    return (
      <Layout>
        <div className="h-full p-4 max-w-7xl mx-auto">
          <h1 className="text-2xl text-center font-bold uppercase text-blue-800 mb-8">
            MALLA CURRICULAR
          </h1>
          <div
            className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden gap-4 cursor-pointer hover:border-blue-500 transition-colors bg-white shadow-sm"
            onClick={handleRegistrar}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors p-6">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <FaPlus className="text-3xl text-blue-500" />
              </div>
              <p className="text-lg font-medium text-gray-600">
                Registrar Malla Curricular
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Componente de tabla para cursos
  const CursosTable = ({ cursos, isEditing, onEdit, onDelete }) => (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
      <table className="w-full text-sm">
        <thead className="bg-[#545454] text-white">
          <tr className="h-14">
            <th className="px-4 text-center font-medium">Nombre</th>
            <th className="px-4 text-center font-medium">Ciclo</th>
            {isEditing && (
              <th className="px-4 text-center font-medium">Acciones</th>
            )}
          </tr>
        </thead>
        <tbody>
          {cursos.length === 0 ? (
            <tr className="bg-white">
              <td
                colSpan={3}
                className="py-6 text-center text-gray-500 text-base"
              >
                SIN REGISTROS
              </td>
            </tr>
          ) : (
            cursos.map((course, idx) => (
              <tr
                key={course.IdCurso || idx}
                className={`border-b border-gray-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                <td className="py-4 px-4 text-center font-medium text-gray-700">
                  {course.Nombre}
                </td>
                <td className="py-4 px-4 text-center text-gray-600">
                  {course.ciclo?.Ciclo || "Sin ciclo"}
                </td>
                {isEditing && (
                  <td className="py-4 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => onEdit(course)}
                        title="Editar"
                        className="flex items-center justify-center w-7 h-7 bg-[#262D73] hover:bg-[#36395d] rounded-full cursor-pointer transition-colors duration-200"
                      >
                        <FaEdit className="h-3 w-3 text-white" />
                      </button>
                      <button
                        onClick={() => onDelete(course)}
                        title="Eliminar"
                        className="flex items-center justify-center w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer transition-colors duration-200"
                      >
                        <FaTrash className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <Layout>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl text-center font-bold uppercase text-blue-800 mb-8">
          MALLA CURRICULAR
        </h1>

        {malla && !isEditing && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            <div className="text-gray-600"></div>
            <div className="flex gap-4">
              <button
                onClick={handleEditar}
                className="flex items-center gap-2 bg-[#262D73] hover:bg-[#36395d] text-white font-medium py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Editar malla
              </button>
              <button
                onClick={handleEliminar}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Eliminar malla
              </button>
            </div>
          </div>
        )}

        <div className="space-y-6 bg-white rounded-2xl p-6 shadow-md mb-8">
          <div>
            <label className="block mb-3 text-base font-medium text-gray-700">
              Nombre Malla
            </label>
            <input
              type="text"
              readOnly={!isEditing}
              value={nombreMalla}
              onChange={(e) => setNombreMalla(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#545454]"
            />
          </div>

          <div>
            <label className="block mb-3 text-base font-medium text-gray-700">
              PDF
            </label>
            <div
              className={`relative w-full border-2 border-dashed ${
                isEditing ? "border-blue-400" : "border-gray-300"
              } rounded-xl flex items-center justify-center cursor-pointer transition-colors bg-gray-50`}
              style={{ height: "55px" }}
              onClick={
                isEditing ? () => pdfInputRef.current.click() : undefined
              }
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isEditing ? (
                pdfMalla ? (
                  <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-700 truncate">
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-red-500 text-xl" />
                      <span>{getCleanPdfName(pdfMalla.name)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePdf();
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer transition-colors"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                ) : malla && malla.pdfMalla && !pdfRemoved ? (
                  <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-700 truncate">
                    <div className="flex items-center gap-3">
                      <FaFilePdf className="text-red-500 text-xl" />
                      <span>{getCleanPdfName(malla.pdfMalla)}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePdf();
                      }}
                      className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full cursor-pointer transition-colors"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <FaFilePdf className="text-2xl mb-2" />
                    <p className="text-sm">Agregar PDF o arrastrar y soltar</p>
                  </div>
                )
              ) : malla && malla.pdfMalla && !pdfRemoved ? (
                <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-700 truncate">
                  <div className="flex items-center gap-3">
                    <FaFilePdf className="text-red-500 text-xl" />
                    <span>{getCleanPdfName(malla.pdfMalla)}</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      window.open(getPdfUrl(), "_blank");
                      e.stopPropagation();
                    }}
                    className="absolute top-3 right-3 p-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full cursor-pointer transition-colors"
                  >
                    <FaEye className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="text-gray-400 flex flex-col items-center">
                  <FaFilePdf className="text-2xl mb-2" />
                  <p className="text-sm">Agregar PDF o arrastrar y soltar</p>
                </div>
              )}
            </div>
            <input
              ref={pdfInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              disabled={!isEditing}
              onChange={handleFileChange}
            />
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-700">CURSOS</h2>
              {isEditing && (
                <button
                  onClick={handleAgregarCurso}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <FaPlus className="h-4 w-4" />
                  Agregar curso
                </button>
              )}
            </div>

            <CursosTable
              cursos={currentCursos}
              isEditing={isEditing}
              onEdit={handleEditarCurso}
              onDelete={(course) => {
                const globalIndex = cursos.findIndex(
                  (c) => c.IdCurso === course.IdCurso
                );
                if (globalIndex !== -1) {
                  const newCourses = [...cursos];
                  newCourses.splice(globalIndex, 1);
                  setCursos(newCourses);

                  if (
                    newCourses.length <= (currentPage - 1) * itemsPerPage &&
                    currentPage > 1
                  ) {
                    setCurrentPage((prev) => prev - 1);
                  }
                }
              }}
            />

            {cursos.length > itemsPerPage && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                <div className="text-gray-600 text-sm">
                  Mostrando{" "}
                  {Math.min(
                    (currentPage - 1) * itemsPerPage + 1,
                    cursos.length
                  )}{" "}
                  - {Math.min(currentPage * itemsPerPage, cursos.length)} de{" "}
                  {cursos.length} cursos
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {getPageNumbers().map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      } font-medium cursor-pointer`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-center gap-6 mt-6">
            <button
              onClick={handleGuardar}
              className="flex items-center gap-2 bg-[#262D73] hover:bg-[#36395d] text-white font-medium py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Guardar
            </button>
            <button
              onClick={handleCancelar}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Cancelar
            </button>
          </div>
        )}

        {showCursosModal && (
          <FormCursosModal
            cursoToEdit={selectedCurso}
            onAccept={handleAddOrUpdateCursoModal}
            onClose={() => {
              setShowCursosModal(false);
              setSelectedCurso(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default MallaCurricular;
