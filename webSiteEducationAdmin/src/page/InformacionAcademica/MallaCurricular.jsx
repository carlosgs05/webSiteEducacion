import { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import { FaEye } from "react-icons/fa";
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
  const itemsPerPage = 3;
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
      : `http://127.0.0.1:8000/${malla.pdfMalla}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/malla");
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
          .delete("http://localhost:8000/api/destroyMalla")
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
        await axios.post("http://localhost:8000/api/storeMalla", formData);
        swal(
          "Creado",
          "La malla curricular ha sido registrada con éxito.",
          "success"
        ).then(() => {
          window.location.reload();
        });
      } else {
        await axios.post("http://localhost:8000/api/updateMalla", formData);
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
        <div className="h-full p-4 flex flex-col gap-5">
          <h1 className="text-2xl text-center font-medium text-blue-800 uppercase">
            MALLA CURRICULAR
          </h1>
          <div
            className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md overflow-hidden gap-10 cursor-pointer hover:border-gray-400 transition-colors"
            onClick={handleRegistrar}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors p-6">
              <span className="text-6xl font-light">+</span>
              <p className="text-lg text-center">Registrar Malla Curricular</p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl text-center font-medium text-blue-800 uppercase">
          MALLA CURRICULAR
        </h1>

        {malla && !isEditing && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 m-4">
            <div className="text-gray-600">
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEditar}
                className="text-[#262D73] hover:text-[#363D8F] font-medium transition-colors cursor-pointer"
              >
                Editar malla
              </button>
              <button
                onClick={handleEliminar}
                className="text-red-600 hover:text-red-700 font-medium transition-colors cursor-pointer"
              >
                Eliminar malla
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-base font-medium text-gray-600">
              Nombre Malla
            </label>
            <input
              type="text"
              readOnly={!isEditing}
              value={nombreMalla}
              onChange={(e) => setNombreMalla(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#545454]"
            />
          </div>

          <div>
            <label className="block mb-2 text-base font-medium text-gray-600">
              PDF
            </label>
            <div
              className={`relative w-full border-2 border-dashed ${
                isEditing ? "border-gray-400" : "border-gray-300"
              } rounded-md flex items-center justify-center cursor-pointer transition-colors`}
              style={{ height: "50px" }}
              onClick={
                isEditing ? () => pdfInputRef.current.click() : undefined
              }
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isEditing ? (
                pdfMalla ? (
                  <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-600 truncate">
                    {getCleanPdfName(pdfMalla.name)}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePdf();
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
                        />
                      </svg>
                    </button>
                  </div>
                ) : malla && malla.pdfMalla && !pdfRemoved ? (
                  <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-600 truncate">
                    {getCleanPdfName(malla.pdfMalla)}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePdf();
                      }}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-md cursor-pointer transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="text-gray-400 flex gap-2 items-center">
                    <span className="text-2xl">+</span>
                    <p className="text-sm">Agregar PDF o arrastrar y soltar</p>
                  </div>
                )
              ) : malla && malla.pdfMalla && !pdfRemoved ? (
                <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-600 truncate">
                  {getCleanPdfName(malla.pdfMalla)}
                  <button
                    type="button"
                    onClick={(e) => {
                      window.open(getPdfUrl(), "_blank");
                      e.stopPropagation();
                    }}
                    className="absolute top-2 right-2 p-1 bg-gray-600 hover:bg-gray-700 text-white rounded-md cursor-pointer transition-colors"
                  >
                    <FaEye className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="text-gray-400 flex gap-2 items-center">
                  <span className="text-2xl">+</span>
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
            <h2 className="text-base font-medium text-gray-700 mb-3">CURSOS</h2>
            {isEditing && (
              <button
                onClick={handleAgregarCurso}
                className="mb-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Agregar curso
              </button>
            )}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#545454] text-white uppercase text-xs">
                  <tr className="h-12">
                    <th className="px-4 py-3">Nombre</th>
                    <th className="px-4 py-3">Ciclo</th>
                    {isEditing && (
                      <th className="px-4 py-3 text-center">Acciones</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentCursos.length === 0 ? (
                    <tr className="bg-white border-b">
                      <td
                        colSpan={3}
                        className="py-4 text-center text-gray-500"
                      >
                        SIN REGISTROS
                      </td>
                    </tr>
                  ) : (
                    currentCursos.map((course, index) => (
                      <tr
                        key={course.IdCurso || index}
                        className={`border-b ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                      >
                        <td className="px-4 py-3">{course.Nombre}</td>
                        <td className="px-4 py-3">
                          {course.ciclo?.Ciclo || "Sin ciclo"}
                        </td>
                        {isEditing && (
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center space-x-3">
                              <button
                                onClick={() => handleEditarCurso(course)}
                                className="bg-[#262D73] hover:bg-[#36395d] text-white p-1 rounded-md transition-colors cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-1.414-6.414L16 3m0 0l-3 3m3-3L19 6"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => {
                                  const globalIndex =
                                    (currentPage - 1) * itemsPerPage + index;
                                  const newCourses = [...cursos];
                                  newCourses.splice(globalIndex, 1);
                                  setCursos(newCourses);
                                  if (
                                    newCourses.length <=
                                      (currentPage - 1) * itemsPerPage &&
                                    currentPage > 1
                                  ) {
                                    setCurrentPage((prev) => prev - 1);
                                  }
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white p-1 rounded-md transition-colors cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2"
                                  />
                                </svg>
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

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-1.5 text-sm ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageClick(pageNum)}
                        className={`px-3 py-1.5 text-sm ${
                          pageNum === currentPage
                            ? "bg-[#545454] text-white cursor-pointer"
                            : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1.5 text-sm ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleGuardar}
              className="bg-[#262D73] hover:bg-[#36395d] text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer"
            >
              Guardar
            </button>
            <button
              onClick={handleCancelar}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md font-medium transition-colors cursor-pointer"
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
