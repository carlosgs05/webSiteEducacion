import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import Layout from "../../components/Layout";
import LoadingIndicator from "../../components/LoadingIndicator";
import FormCursosModal from "../../components/FormCursosModal"; // Asegúrate de la ruta

const MallaCurricular = () => {
  const [malla, setMalla] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [nombreMalla, setNombreMalla] = useState("");
  const [pdfMalla, setPdfMalla] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [showCursosModal, setShowCursosModal] = useState(false);

  // Paginación para cursos: 4 registros por página
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(cursos.length / itemsPerPage);
  const currentCursos = cursos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const pdfInputRef = useRef(null);

  // Función para refrescar la malla desde el backend
  useEffect(() => {
    const fetchMalla = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/malla");
        if (response.data && response.data.idMallaCurricular) {
          setMalla(response.data);
          setNombreMalla(response.data.nombreMalla || "");
          setCursos(response.data.cursos || []);
        } else {
          setMalla(null);
        }
      } catch (error) {
        console.error("Error obteniendo la malla:", error);
        setMalla(null);
      }
      setLoading(false);
    };
    fetchMalla();
  }, []);

  const handleRegistrar = () => {
    setIsEditing(true);
    setMalla(null);
    setNombreMalla("");
    setPdfMalla(null);
    setCursos([]);
  };

  const handleEditar = () => {
    setIsEditing(true);
  };

  const handleEliminar = async () => {
    if (!malla) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/malla/${malla.idMallaCurricular}`
      );
      setMalla(null);
      setNombreMalla("");
      setPdfMalla(null);
      setCursos([]);
      setIsEditing(false);
    } catch (error) {
      console.error("Error eliminando malla:", error);
    }
  };

  const handleGuardar = async () => {
    try {
      const formData = new FormData();
      formData.append("nombreMalla", nombreMalla);
      if (pdfMalla) {
        formData.append("pdfMalla", pdfMalla);
      }
      if (malla) {
        await axios.post(
          `http://localhost:8000/api/malla/${malla.idMallaCurricular}?_method=PUT`,
          formData
        );
      } else {
        await axios.post("http://localhost:8000/api/malla", formData);
      }
      const res = await axios.get("http://localhost:8000/api/malla");
      if (res.data && res.data.idMallaCurricular) {
        setMalla(res.data);
        setNombreMalla(res.data.nombreMalla || "");
        setCursos(res.data.cursos || []);
        setIsEditing(false);
      } else {
        setMalla(null);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error guardando la malla:", error);
    }
  };

  const handleCancelar = () => {
    if (malla) {
      setNombreMalla(malla.nombreMalla || "");
      setPdfMalla(null);
      setCursos(malla.cursos || []);
      setIsEditing(false);
    } else {
      setNombreMalla("");
      setPdfMalla(null);
      setCursos([]);
      setIsEditing(false);
    }
  };

  // Abrir modal para agregar curso
  const handleAgregarCurso = () => {
    setShowCursosModal(true);
  };

  // Función para recibir el curso desde el modal
  // Convertimos { nombre, ciclo } en { name, cycle } para que coincida con la tabla.
  const handleAddCursoModal = (curso) => {
    const nuevoCurso = {
      name: curso.nombre,
      cycle: curso.ciclo,
    };
    setCursos([...cursos, nuevoCurso]);
    setShowCursosModal(false);
  };

  // PDF: Seleccionar archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfMalla(file);
    }
    e.target.value = "";
  };

  const handleRemovePdf = () => {
    setPdfMalla(null);
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

  if (!malla && !isEditing) {
    return (
      <Layout>
        <div className="h-full p-4 flex flex-col gap-5">
          <h1 className="text-xl font-medium text-center">MALLA CURRICULAR</h1>
          <div
            className="h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md overflow-hidden gap-10 cursor-pointer"
            onClick={handleRegistrar}
          >
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
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
        <h1 className="text-xl font-medium text-center">MALLA CURRICULAR</h1>

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
          {/* Nombre Malla */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Nombre Malla
            </label>
            <input
              type="text"
              readOnly={!isEditing}
              value={nombreMalla}
              onChange={(e) => setNombreMalla(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* PDF */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">PDF</label>
            <div
              className={`relative w-full h-14 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer ${
                !isEditing ? "pointer-events-none opacity-60" : ""
              }`}
              onClick={() => {
                if (isEditing && !pdfMalla) pdfInputRef.current.click();
              }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {!pdfMalla ? (
                <div className="text-gray-400 flex items-center gap-2">
                  <span className="text-2xl">+</span>
                  <p className="text-sm text-center">
                    Agregar PDF o arrastrar y soltar
                  </p>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center relative px-4">
                  <p className="text-gray-600 text-sm truncate">
                    {pdfMalla.name}
                  </p>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemovePdf();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition cursor-pointer"
                      title="Eliminar PDF"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 
                             01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 00-2-2H9a2 2 0 
                             00-2 2v2m3 0h4"
                        />
                      </svg>
                    </button>
                  )}
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

          {/* CURSOS */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold text-gray-700">CURSOS</h2>
              {isEditing && (
                <button
                  onClick={handleAgregarCurso}
                  className="bg-pink-300 hover:bg-pink-400 text-white px-4 py-2 rounded-md font-semibold transition-colors"
                >
                  Agregar
                </button>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-pink-100 text-gray-700 uppercase text-sm">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Nombre</th>
                    <th className="px-4 py-2 border-b border-gray-200">Ciclo</th>
                    {isEditing && (
                      <th className="px-4 py-2 border-b border-gray-200 text-center">
                        Opciones
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {cursos.length === 0 ? (
                    <tr>
                      <td
                        colSpan={isEditing ? 3 : 2}
                        className="text-center py-3 text-gray-500"
                      >
                        Sin cursos
                      </td>
                    </tr>
                  ) : (
                    currentCursos.map((course, index) => (
                      <tr key={index} className="hover:bg-pink-50">
                        <td className="px-4 py-2 border-b border-gray-200">
                          {course.name}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-200">
                          {course.cycle}
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
                                const newCourses = [...cursos];
                                newCourses.splice(
                                  (currentPage - 1) * itemsPerPage + index,
                                  1
                                );
                                setCursos(newCourses);
                                if (
                                  newCourses.length <= (currentPage - 1) * itemsPerPage &&
                                  currentPage > 1
                                ) {
                                  setCurrentPage(currentPage - 1);
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

        {isEditing && (
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleGuardar}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition-colors"
            >
              GUARDAR
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
