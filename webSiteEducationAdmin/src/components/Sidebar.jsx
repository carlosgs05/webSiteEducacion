import { useState } from "react";
import { useLocation, useMatch } from "react-router";
import {
  FaHome,
  FaImages,
  FaSitemap,
  FaUserTie,
  FaChalkboardTeacher,
  FaUserCog,
  FaUserGraduate,
  FaBriefcase,
  FaHandsHelping,
  FaSearchDollar,
  FaBookOpen,
  FaNewspaper,
  FaFileAlt,
  FaChevronDown,
  FaChevronRight,
  FaUser
} from "react-icons/fa";

const Sidebar = ({ isOpen = true, toggle = () => {} }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  // Función para verificar si la ruta actual coincide exactamente
  const isActive = (path) => location.pathname === path;

  // Función para verificar si alguna de las rutas del dropdown está activa
  const isActiveDropdown = (paths = []) =>
    paths.some((path) => location.pathname === path);

  // Definimos los paths de cada dropdown
  const organizacionPaths = [
    "/organizacion/autoridades",
    "/organizacion/personalDocente",
    "/organizacion/personalAdministrativo",
  ];

  const desarrolloPaths = [
    "/desarrolloProfesional/pasantias",
    "/desarrolloProfesional/rsu",
    "/desarrolloProfesional/bolsaDeTrabajo",
  ];

  // Devuelve un objeto match si la ruta actual encaja, o null en caso contrario
  const noticiasMatch = useMatch("/noticias/*");

  // Manejar apertura/cierre de dropdowns
  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-[#4a4a4a] to-[#383838] text-white
        transform ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 ease-in-out z-50
        flex flex-col border-r border-gray-600 shadow-2xl overflow-y-auto
      `}
    >
      {/* Branding */}
      <div className="flex items-center p-[calc(var(--spacing)*4.3)] mb-5">
        <div className="w-full flex items-center justify-center pt-8">
          <h1 className="text-lg uppercase font-bold bg-gradient-to-r from-[#E4BCD3] to-[#d8a1c3] bg-clip-text text-transparent">
            Educación Inicial
          </h1>
        </div>
        <button
          className="ml-auto md:hidden text-xl leading-none cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-full p-1.5 transition-all"
          onClick={toggle}
          aria-label="Cerrar sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Menú de navegación */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="mb-6">
          <div
            className={`px-3 py-2.5 text-gray-400 text-sm font-semibold tracking-wider uppercase ${
              isActive("/inicio") ? "mb-2" : "mb-0"
            }`}
          >
            GENERAL
          </div>
          <button
            onClick={() => (window.location.href = "/inicio")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
              isActive("/inicio")
                ? "bg-[#E4BCD3] text-[#545454]"
                : "hover:bg-gray-700"
            }`}
          >
            <div
              className={`rounded-lg p-1.5 transition-colors ${
                isActive("/inicio")
                  ? "bg-[#d8a1c3]"
                  : "bg-gray-700 group-hover:bg-[#E4BCD3]"
              }`}
            >
              <FaHome
                className={`w-3.5 h-3.5 ${
                  isActive("/inicio") ? "text-gray-800" : "text-white"
                }`}
              />
            </div>
            <span className="ml-3">Dashboard</span>
          </button>
          <button
            onClick={() => (window.location.href = "/perfil")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
              isActive("/perfil")
                ? "bg-[#E4BCD3] text-[#545454]"
                : "hover:bg-gray-700"
            }`}
          >
            <div
              className={`rounded-lg p-1.5 transition-colors ${
                isActive("/perfil")
                  ? "bg-[#d8a1c3]"
                  : "bg-gray-700 group-hover:bg-[#E4BCD3]"
              }`}
            >
              <FaUser
                className={`w-3.5 h-3.5 ${
                  isActive("/perfil") ? "text-gray-800" : "text-white"
                }`}
              />
            </div>
            <span className="ml-3">Mi perfil</span>
          </button>
        </div>

        <div className="mb-6">
          <div
            className={`px-3 py-2.5 text-gray-400 text-sm font-semibold tracking-wider uppercase ${
              isActive("/homeCarrusel") ? "mb-2" : "mb-0"
            }`}
          >
            PESTAÑAS
          </div>
          <button
            onClick={() => (window.location.href = "/homeCarrusel")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
              isActive("/homeCarrusel")
                ? "bg-[#E4BCD3] text-[#545454]"
                : "hover:bg-gray-700"
            }`}
          >
            <div
              className={`rounded-lg p-1.5 transition-colors ${
                isActive("/homeCarrusel")
                  ? "bg-[#d8a1c3]"
                  : "bg-gray-700 group-hover:bg-[#E4BCD3]"
              }`}
            >
              <FaImages
                className={`w-3.5 h-3.5 ${
                  isActive("/homeCarrusel") ? "text-gray-800" : "text-white"
                }`}
              />
            </div>
            <span className="ml-3">Home Carrusel</span>
          </button>

          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("organizacion")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
                isActiveDropdown(organizacionPaths)
                  ? "bg-[#E4BCD3] text-[#545454]"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`rounded-lg p-1.5 transition-colors ${
                    isActiveDropdown(organizacionPaths)
                      ? "bg-[#d8a1c3]"
                      : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                  }`}
                >
                  <FaSitemap
                    className={`w-3.5 h-3.5 ${
                      isActiveDropdown(organizacionPaths)
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                  />
                </div>
                <span className="ml-3">Organización</span>
              </div>
              {openDropdown === "organizacion" ? (
                <FaChevronDown className="w-2.5 h-2.5 text-gray-400" />
              ) : (
                <FaChevronRight className="w-2.5 h-2.5 text-gray-400" />
              )}
            </button>

            {openDropdown === "organizacion" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-600">
                <button
                  onClick={() =>
                    (window.location.href = "/organizacion/autoridades")
                  }
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer group ${
                    isActive("/organizacion/autoridades")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`rounded-lg p-1 transition-colors ${
                      isActive("/organizacion/autoridades")
                        ? "bg-[#d8a1c3]"
                        : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                    }`}
                  >
                    <FaUserTie
                      className={`w-3 h-3 ${
                        isActive("/organizacion/autoridades")
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <span className="ml-2">Autoridades</span>
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/organizacion/personalDocente")
                  }
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer group ${
                    isActive("/organizacion/personalDocente")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`rounded-lg p-1 transition-colors ${
                      isActive("/organizacion/personalDocente")
                        ? "bg-[#d8a1c3]"
                        : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                    }`}
                  >
                    <FaChalkboardTeacher
                      className={`w-3 h-3 ${
                        isActive("/organizacion/personalDocente")
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <span className="ml-2">Personal Docente</span>
                </button>

                <button
                  onClick={() =>
                    (window.location.href =
                      "/organizacion/personalAdministrativo")
                  }
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer group ${
                    isActive("/organizacion/personalAdministrativo")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`rounded-lg p-1 transition-colors ${
                      isActive("/organizacion/personalAdministrativo")
                        ? "bg-[#d8a1c3]"
                        : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                    }`}
                  >
                    <FaUserCog
                      className={`w-3 h-3 ${
                        isActive("/organizacion/personalAdministrativo")
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <span className="ml-2">Personal Administrativo</span>
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => handleDropdownToggle("desarrollo")}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
                isActiveDropdown(desarrolloPaths)
                  ? "bg-[#E4BCD3] text-[#545454]"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex items-center">
                <div
                  className={`rounded-lg p-1.5 transition-colors ${
                    isActiveDropdown(desarrolloPaths)
                      ? "bg-[#d8a1c3]"
                      : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                  }`}
                >
                  <FaUserGraduate
                    className={`w-3.5 h-3.5 ${
                      isActiveDropdown(desarrolloPaths)
                        ? "text-gray-800"
                        : "text-white"
                    }`}
                  />
                </div>
                <span className="ml-3">Desarrollo Profesional</span>
              </div>
              {openDropdown === "desarrollo" ? (
                <FaChevronDown className="w-2.5 h-2.5 text-gray-400" />
              ) : (
                <FaChevronRight className="w-2.5 h-2.5 text-gray-400" />
              )}
            </button>

            {openDropdown === "desarrollo" && (
              <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-600">
                <button
                  onClick={() =>
                    (window.location.href = "/desarrolloProfesional/pasantias")
                  }
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer group ${
                    isActive("/desarrolloProfesional/pasantias")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`rounded-lg p-1 transition-colors ${
                      isActive("/desarrolloProfesional/pasantias")
                        ? "bg-[#d8a1c3]"
                        : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                    }`}
                  >
                    <FaBriefcase
                      className={`w-3 h-3 ${
                        isActive("/desarrolloProfesional/pasantias")
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <span className="ml-2">Pasantías</span>
                </button>

                <button
                  onClick={() =>
                    (window.location.href = "/desarrolloProfesional/rsu")
                  }
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer group ${
                    isActive("/desarrolloProfesional/rsu")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`rounded-lg p-1 transition-colors ${
                      isActive("/desarrolloProfesional/rsu")
                        ? "bg-[#d8a1c3]"
                        : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                    }`}
                  >
                    <FaHandsHelping
                      className={`w-3 h-3 ${
                        isActive("/desarrolloProfesional/rsu")
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <span className="ml-2">RSU</span>
                </button>

                <button
                  onClick={() =>
                    (window.location.href =
                      "/desarrolloProfesional/bolsaDeTrabajo")
                  }
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-all text-left text-sm cursor-pointer group ${
                    isActive("/desarrolloProfesional/bolsaDeTrabajo")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div
                    className={`rounded-lg p-1 transition-colors ${
                      isActive("/desarrolloProfesional/bolsaDeTrabajo")
                        ? "bg-[#d8a1c3]"
                        : "bg-gray-700 group-hover:bg-[#E4BCD3]"
                    }`}
                  >
                    <FaSearchDollar
                      className={`w-3 h-3 ${
                        isActive("/desarrolloProfesional/bolsaDeTrabajo")
                          ? "text-gray-800"
                          : "text-white"
                      }`}
                    />
                  </div>
                  <span className="ml-2">Bolsa de trabajo</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => (window.location.href = "/mallaCurricular")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
              isActive("/mallaCurricular")
                ? "bg-[#E4BCD3] text-[#545454]"
                : "hover:bg-gray-700"
            }`}
          >
            <div
              className={`rounded-lg p-1.5 transition-colors ${
                isActive("/mallaCurricular")
                  ? "bg-[#d8a1c3]"
                  : "bg-gray-700 group-hover:bg-[#E4BCD3]"
              }`}
            >
              <FaBookOpen
                className={`w-3.5 h-3.5 ${
                  isActive("/mallaCurricular") ? "text-gray-800" : "text-white"
                }`}
              />
            </div>
            <span className="ml-3">Malla Curricular</span>
          </button>

          <button
            onClick={() => (window.location.href = "/noticias")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
              noticiasMatch
                ? "bg-[#E4BCD3] text-[#545454]"
                : "hover:bg-gray-700"
            }`}
          >
            <div
              className={`rounded-lg p-1.5 transition-colors ${
                noticiasMatch
                  ? "bg-[#d8a1c3]"
                  : "bg-gray-700 group-hover:bg-[#E4BCD3]"
              }`}
            >
              <FaNewspaper
                className={`w-3.5 h-3.5 ${
                  noticiasMatch ? "text-gray-800" : "text-white"
                }`}
              />
            </div>
            <span className="ml-3">Noticias</span>
          </button>

          <button
            onClick={() => (window.location.href = "/documentos")}
            className={`w-full flex items-center px-3 py-2.5 rounded-xl transition-all text-left text-sm cursor-pointer group ${
              isActive("/documentos")
                ? "bg-[#E4BCD3] text-[#545454]"
                : "hover:bg-gray-700"
            }`}
          >
            <div
              className={`rounded-lg p-1.5 transition-colors ${
                isActive("/documentos")
                  ? "bg-[#d8a1c3]"
                  : "bg-gray-700 group-hover:bg-[#E4BCD3]"
              }`}
            >
              <FaFileAlt
                className={`w-3.5 h-3.5 ${
                  isActive("/documentos") ? "text-gray-800" : "text-white"
                }`}
              />
            </div>
            <span className="ml-3">Documentos</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
