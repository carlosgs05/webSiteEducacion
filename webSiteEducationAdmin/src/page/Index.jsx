import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Layout from "../components/Layout";
import LoadingIndicator from "../components/LoadingIndicator";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showOrgModal, setShowOrgModal] = useState(false);
  const [showDevModal, setShowDevModal] = useState(false);
  const [selectedOrgOption, setSelectedOrgOption] = useState("");
  const [selectedDevOption, setSelectedDevOption] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 310);
    return () => clearTimeout(timer);
  }, []);

  const handleOrgSelection = (option) => {
    setSelectedOrgOption(option);
  };

  const handleDevSelection = (option) => {
    setSelectedDevOption(option);
  };

  const handleOrgSubmit = () => {
    if (!selectedOrgOption) return;
    
    switch(selectedOrgOption) {
      case "autoridades":
        navigate("/organizacion/autoridades");
        break;
      case "personalDocente":
        navigate("/organizacion/personalDocente");
        break;
      case "personalAdministrativo":
        navigate("/organizacion/personalAdministrativo");
        break;
      default:
        break;
    }
    
    setShowOrgModal(false);
    setSelectedOrgOption("");
  };

  const handleDevSubmit = () => {
    if (!selectedDevOption) return;
    
    switch(selectedDevOption) {
      case "pasantias":
        navigate("/desarrolloProfesional/pasantias");
        break;
      case "rsu":
        navigate("/desarrolloProfesional/rsu");
        break;
      case "bolsaDeTrabajo":
        navigate("/desarrolloProfesional/bolsaDeTrabajo");
        break;
      default:
        break;
    }
    
    setShowDevModal(false);
    setSelectedDevOption("");
  };

  // Componente de Modal Reutilizable
  const SelectionModal = ({ 
    isOpen, 
    onClose, 
    title, 
    options, 
    selectedOption, 
    onSelect, 
    onSubmit 
  }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-200">
          {/* Encabezado del Modal */}
          <div className="flex justify-between items-center p-5 bg-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
            <button 
              onClick={onClose}
              className="text-gray-700 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Cuerpo del Modal */}
          <div className="p-6">
            <div className="space-y-3">
              {options.map((option) => (
                <div 
                  key={option.value} 
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedOption === option.value 
                      ? "border-blue-500 bg-blue-50 shadow-sm" 
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                  onClick={() => onSelect(option.value)}
                >
                  <div className="flex items-center justify-center h-6 w-6 rounded-full border border-gray-300 mr-4">
                    {selectedOption === option.value && (
                      <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm font-medium text-gray-800">
                      {option.label}
                    </span>
                  </div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 transition-transform duration-200 ${
                      selectedOption === option.value ? "text-blue-600" : "text-gray-400"
                    }`}
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pie del Modal */}
          <div className="px-6 py-4 bg-gray-200 shadow-gray-700 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-white font-medium bg-red-700 hover:bg-red-800 cursor-pointer transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onSubmit}
              disabled={!selectedOption}
              className={`px-4 py-2 rounded-md text-white font-medium transition-all ${
                selectedOption 
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 cursor-pointer shadow-md" 
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingIndicator size="large" />
        </div>
      ) : (
        <div className="p-4 max-w-7xl mx-auto">
          {/* Título de bienvenida */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-blue-800 mb-4">
              BIENVENIDO AL PANEL DE ADMINISTRACIÓN
            </h1>
            <p className="text-base text-gray-700 max-w-4xl mx-auto">
              Desde aquí puedes gestionar toda la información relevante de la
              escuela. Administra la organización, el desarrollo profesional,
              las noticias y documentos, entre otros aspectos clave para la
              comunidad académica.
            </p>
          </div>

          {/* Secciones administrables en formato de tarjetas modernas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carrusel */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Carrusel
                  </h3>
                  <p className="text-gray-600">
                    Administra las imágenes del carrusel principal de la página
                    de inicio.
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 mt-6 bg-gray-50 border-t border-gray-100">
                <a
                  href="/homeCarrusel"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center cursor-pointer"
                >
                  Gestionar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Organización */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m10-6.13a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Organización
                  </h3>
                  <p className="text-gray-600">
                    Administra la estructura organizativa de la escuela,
                    incluyendo autoridades, docentes y personal administrativo.
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => setShowOrgModal(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center cursor-pointer"
                >
                  Gestionar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desarrollo Profesional */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Desarrollo Profesional
                  </h3>
                  <p className="text-gray-600">
                    Controla las oportunidades de desarrollo profesional, como
                    pasantías, programas de RSU y la bolsa de trabajo.
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={() => setShowDevModal(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center cursor-pointer"
                >
                  Gestionar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Malla Curricular */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 20l9-5-9-5-9 5 9 5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Malla Curricular
                  </h3>
                  <p className="text-gray-600">
                    Actualiza y organiza la malla curricular, asegurando que los
                    planes de estudio estén actualizados.
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <a
                  href="/mallaCurricular"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center cursor-pointer"
                >
                  Gestionar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Noticias */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m2 0a2 2 0 11-4 0 2 2 0 014 0zM7 8h10M7 16h10M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Noticias
                  </h3>
                  <p className="text-gray-600">
                    Publica y gestiona noticias y eventos importantes para la
                    comunidad universitaria.
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 mt-6 bg-gray-50 border-t border-gray-100">
                <a
                  href="/noticias"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center cursor-pointer"
                >
                  Gestionar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Documentos */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="p-6 flex items-start space-x-4">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v4a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 11v6a1 1 0 001 1h16a1 1 0 001-1v-6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    Documentos
                  </h3>
                  <p className="text-gray-600">
                    Sube, edita y organiza documentos administrativos y
                    académicos para el acceso de los usuarios.
                  </p>
                </div>
              </div>
              <div className="px-6 py-3 mt-6 bg-gray-50 border-t border-gray-100">
                <a
                  href="/documentos"
                  className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center cursor-pointer"
                >
                  Gestionar
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Organización */}
      <SelectionModal
        isOpen={showOrgModal}
        onClose={() => {
          setShowOrgModal(false);
          setSelectedOrgOption("");
        }}
        title="Seleccionar tipo de organización"
        options={[
          { value: "autoridades", label: "Autoridades" },
          { value: "personalDocente", label: "Personal Docente" },
          { value: "personalAdministrativo", label: "Personal Administrativo" }
        ]}
        selectedOption={selectedOrgOption}
        onSelect={handleOrgSelection}
        onSubmit={handleOrgSubmit}
      />

      {/* Modal para Desarrollo Profesional */}
      <SelectionModal
        isOpen={showDevModal}
        onClose={() => {
          setShowDevModal(false);
          setSelectedDevOption("");
        }}
        title="Seleccionar área de desarrollo profesional"
        options={[
          { value: "pasantias", label: "Pasantías" },
          { value: "rsu", label: "RSU" },
          { value: "bolsaDeTrabajo", label: "Bolsa de Trabajo" }
        ]}
        selectedOption={selectedDevOption}
        onSelect={handleDevSelection}
        onSubmit={handleDevSubmit}
      />
    </Layout>
  );
};

export default Index;