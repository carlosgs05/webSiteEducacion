import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import swal from "sweetalert";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../../components/Layout";
import LoadingIndicator from "../../components/LoadingIndicator";
import FormCursosModal from "../../components/FormCursosModal"; // Ajusta la ruta según tu estructura

const MallaCurricular = () => {
  const [malla, setMalla] = useState(null); // Objeto o null
  const [cursos, setCursos] = useState([]); // Todos los cursos
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [nombreMalla, setNombreMalla] = useState("");
  const [pdfMalla, setPdfMalla] = useState(null); // PDF nuevo (si se selecciona)
  const [pdfRemoved, setPdfRemoved] = useState(false); // Controla si se eliminó el PDF existente
  const [showCursosModal, setShowCursosModal] = useState(false);

  // Paginación: 7 registros por página
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(cursos.length / itemsPerPage);
  const currentCursos = cursos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pdfInputRef = useRef(null);

  // Al montar, obtener la malla y cursos del backend
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

  // Cuando se presiona "Registrar Malla" (si no existe malla)
  const handleRegistrar = () => {
    setIsEditing(true);
    setMalla(null);
    setNombreMalla("");
    setPdfMalla(null);
    setPdfRemoved(false);
    setCurrentPage(1);
  };

  // Para editar la malla existente
  const handleEditar = () => {
    setIsEditing(true);
    // Reiniciamos el flag en caso de que se hubiera eliminado el pdf anteriormente
    setPdfRemoved(false);
  };

  // Eliminar la malla con confirmación usando SweetAlert
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
            swal("Eliminado", "La malla curricular ha sido eliminada.", "success").then(() => {
              // Recargar la página para mostrar la opción de registrar una nueva malla
              window.location.reload();
            });
          })
          .catch((error) => {
            console.error("Error eliminando malla:", error);
            swal("Error", "Ocurrió un error al eliminar la malla curricular.", "error");
          });
      }
    });
  };

  // Guardar la malla (crear o actualizar)
  const handleGuardar = async () => {
    try {
      const formData = new FormData();
      formData.append("nombreMalla", nombreMalla);

      // Convertir el arreglo de cursos al formato que espera el backend
      const cursosParaBackend = cursos.map((c) => ({
        Nombre: c.Nombre,
        IdCiclo: c.ciclo?.IdCiclo || null,
      }));
      formData.append("cursos", JSON.stringify(cursosParaBackend));

      // Si se cargó un PDF nuevo, se agrega; de lo contrario, si se eliminó el pdf existente,
      // no se envía nada (o se puede enviar un flag adicional si el backend lo requiere)
      if (pdfMalla) {
        formData.append("pdfMalla", pdfMalla);
      }

      if (malla) {
        // Actualizar malla
        await axios.post(
          `http://localhost:8000/api/malla/${malla.idMallaCurricular}?_method=PUT`,
          formData
        );
      } else {
        // Crear nueva malla
        await axios.post("http://localhost:8000/api/storeMalla", formData);
      }

      // Recargar datos
      const res = await axios.get("http://localhost:8000/api/malla");
      const { malla: newMalla, cursos: newCursos } = res.data;
      setMalla(newMalla || null);
      setCursos(newCursos || []);
      if (newMalla) {
        setNombreMalla(newMalla.nombreMalla || "");
      }
      setIsEditing(false);
      setPdfRemoved(false);
    } catch (error) {
      console.error("Error guardando la malla:", error);
      swal("Error", "Ocurrió un error al guardar la malla.", "error");
    }
  };

  // Cancelar edición: se reinician los estados y flag
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

  // Abrir modal para agregar curso
  const handleAgregarCurso = () => {
    setShowCursosModal(true);
  };

  // Recibir curso desde el modal y ajustar la estructura para la tabla y backend
  const handleAddCursoModal = (curso) => {
    const nuevoCurso = {
      IdCurso: `temp-${Date.now()}`,
      Nombre: curso.nombre,
      ciclo: {
        IdCiclo: curso.ciclo.value,
        Ciclo: curso.ciclo.label,
      },
    };
    setCursos((prev) => [...prev, nuevoCurso]);
    setShowCursosModal(false);
  };

  // Manejo del PDF: file input y drag & drop
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

  // Funciones de paginación para cursos
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

  // Si no hay malla y no estamos editando, mostrar opción para registrar
  if (!malla && !isEditing) {
    return (
      <Layout>
        <div className="h-full p-4 flex flex-col gap-5">
          <h1 className="text-xl font-medium text-center">MALLA CURRICULAR</h1>
          <div
            className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md overflow-hidden gap-10 cursor-pointer"
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

  // Vista de registro/edición
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-xl font-medium text-center">MALLA CURRICULAR</h1>

        {/* Mostrar datos y botones si existe malla y no se está editando */}
        {malla && !isEditing && (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
            <div className="text-gray-600">
              <span className="font-semibold text-lg">MALLA ACTUAL: </span>
              <span className="text-base">{malla.nombreMalla}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleEditar}
                className="bg-pink-300 hover:bg-pink-400 text-white font-semibold px-4 py-2 rounded-md transition-colors"
              >
                Editar malla
              </button>
              <button
                onClick={handleEliminar}
                className="bg-pink-300 hover:bg-pink-400 text-white font-semibold px-4 py-2 rounded-md transition-colors"
              >
                Eliminar malla
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4 mt-6">
          {/* Campo Nombre Malla */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Nombre Malla</label>
            <input
              type="text"
              readOnly={!isEditing}
              value={nombreMalla}
              onChange={(e) => setNombreMalla(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Campo PDF */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">PDF</label>
            <div
              className={`relative w-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer ${
                !isEditing ? "pointer-events-none opacity-60" : ""
              }`}
              style={{ height: "50px" }}
              onClick={() => {
                if (isEditing && !pdfMalla && pdfRemoved === false && !(malla && malla.pdfMalla)) {
                  pdfInputRef.current.click();
                }
                // Si se eliminó el pdf o no existe, se abre el input
                if (isEditing && (!pdfMalla || pdfRemoved)) {
                  pdfInputRef.current.click();
                }
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {pdfMalla ? (
                // Si se cargó un PDF local
                <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-600 truncate">
                  {pdfMalla.name}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePdf();
                      }}
                      className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition cursor-pointer"
                      title="Eliminar PDF"
                    >
                      <FaTrash />
                    </button>
                  )}
                </div>
              ) : (
                // Si no hay PDF local, mostramos el PDF de la malla si existe y no se ha eliminado
                <>
                  {malla && malla.pdfMalla && !pdfRemoved ? (
                    <div className="w-full h-full flex items-center justify-center relative px-4 text-sm text-gray-600 truncate">
                      {malla.pdfMalla.replace(/^.*[\\/]/, "")}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemovePdf();
                          }}
                          className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition cursor-pointer"
                          title="Eliminar PDF"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  ) : (
                    // Si no hay PDF (o fue eliminado) se muestra el placeholder
                    <div className="text-gray-400 flex gap-2.5 items-center">
                      <span className="text-2xl">+</span>
                      <p className="text-sm text-center">Agregar PDF o arrastrar y soltar</p>
                    </div>
                  )}
                </>
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

          {/* CURSOS */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">CURSOS</h2>
            {isEditing && (
              <button
                onClick={handleAgregarCurso}
                className="bg-pink-300 hover:bg-pink-400 text-white px-4 py-2 rounded-md font-semibold transition-colors mb-3"
              >
                Agregar
              </button>
            )}

            <div className="overflow-x-auto border border-gray-200 rounded-md">
              <table className="w-full text-left text-sm">
                <thead className="bg-pink-100 text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Nombre</th>
                    <th className="px-4 py-2 border-b border-gray-200">Ciclo</th>
                    {isEditing && (
                      <th className="px-4 py-2 border-b border-gray-200 text-center">Opciones</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {currentCursos.length === 0 ? (
                    <tr>
                      <td colSpan={isEditing ? 3 : 2} className="text-center py-3 text-gray-500">
                        Sin cursos
                      </td>
                    </tr>
                  ) : (
                    currentCursos.map((course, index) => (
                      <tr key={course.IdCurso || index} className="hover:bg-pink-50">
                        <td className="px-4 py-2 border-b border-gray-200">
                          {course.Nombre}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200">
                          {course.ciclo ? course.ciclo.Ciclo : "Sin ciclo"}
                        </td>
                        {isEditing && (
                          <td className="px-4 py-2 border-b border-gray-200 text-center">
                            <button
                              className="text-blue-500 hover:text-blue-600 mr-3"
                              title="Editar curso"
                            >
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-500 hover:text-red-600"
                              title="Eliminar curso"
                              onClick={() => {
                                const globalIndex = (currentPage - 1) * itemsPerPage + index;
                                const newCourses = [...cursos];
                                newCourses.splice(globalIndex, 1);
                                setCursos(newCourses);
                                if (
                                  newCourses.length <= (currentPage - 1) * itemsPerPage &&
                                  currentPage > 1
                                ) {
                                  setCurrentPage((prev) => prev - 1);
                                }
                              }}
                            >
                              <FaTrash />
                            </button>
                          </td>
                        )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Paginación para cursos */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <div className="inline-flex items-center border rounded-md overflow-hidden">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-3 py-2 text-sm ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
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
                        className={`px-3 py-2 text-sm font-semibold ${
                          isActive
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
                    className={`px-3 py-2 text-sm ${
                      currentPage === totalPages
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
        </div>

        {/* Botones de Guardar / Cancelar solo si se está editando */}
        {isEditing && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleGuardar}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors"
            >
              Guardar
            </button>
            <button
              onClick={handleCancelar}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold transition-colors"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {isEditing && showCursosModal && (
        <FormCursosModal
          onAccept={handleAddCursoModal}
          onClose={() => setShowCursosModal(false)}
        />
      )}
    </Layout>
  );
};

export default MallaCurricular;