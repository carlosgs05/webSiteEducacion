import { useState } from "react";
import { useLocation } from "react-router";

const Sidebar = () => {
  const location = useLocation();
  const [openOrganizacion, setOpenOrganizacion] = useState(false);
  const [openDesarrollo, setOpenDesarrollo] = useState(false);

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

  return (
    <aside className="w-64 p-5 bg-[#5c5c5c] text-white flex flex-col justify-between">
      {/* Sección superior (Perfil, etc.) */}
      <div>
        {/* Pequeña tarjeta de usuario */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#E4BCD3] flex items-center justify-center text-[#545454] font-bold">
            U
          </div>
          <div>
            <p className="text-sm font-medium">Usuario</p>
            <p className="text-xs text-[#E4BCD3]">Administrador</p>
          </div>
        </div>

        {/* Enlace o título de Inicio */}
        <a href="/" className="block mb-5">
          <h2
            className={`text-xl font-bold transition-colors ${
              isActive("/") ? "bg-[#E4BCD3] text-[#545454]" : "hover:text-[#E4BCD3]"
            }`}
          >
            INICIO
          </h2>
        </a>

        {/* Menú de navegación */}
        <ul className="space-y-2">
          <li>
            <a
              href="/homeCarrusel"
              className={`block px-3 py-2 rounded transition-colors ${
                isActive("/homeCarrusel")
                  ? "bg-[#E4BCD3] text-[#545454]"
                  : "hover:bg-[#E4BCD3] hover:text-[#545454]"
              }`}
            >
              Home Carrusel
            </a>
          </li>
          <li className="w-full">
            {/* Botón principal para Organización */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenOrganizacion(!openOrganizacion);
              }}
              className={`flex items-center justify-between w-full px-3 py-2 rounded transition-colors ${
                isActiveDropdown(organizacionPaths)
                  ? "bg-[#E4BCD3] text-[#545454]"
                  : "hover:bg-[#E4BCD3] hover:text-[#545454]"
              }`}
            >
              Organización
              <span
                className={`transform transition-transform duration-300 ${
                  openOrganizacion ? "rotate-180" : "rotate-0"
                }`}
              >
                v
              </span>
            </button>

            {/* Menú desplegable para Organización */}
            <ul
              className={`overflow-hidden transition-all duration-300 ${
                openOrganizacion ? "max-h-40" : "max-h-0"
              }`}
            >
              <li>
                <a
                  href="/organizacion/autoridades"
                  className={`block px-4 py-2 transition-colors ${
                    isActive("/organizacion/autoridades")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-[#E4BCD3] hover:text-[#545454]"
                  }`}
                >
                  Autoridades
                </a>
              </li>
              <li>
                <a
                  href="/organizacion/personalDocente"
                  className={`block px-4 py-2 transition-colors ${
                    isActive("/organizacion/personalDocente")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-[#E4BCD3] hover:text-[#545454]"
                  }`}
                >
                Personal Docente
                </a>
              </li>
              <li>
                <a
                  href="/organizacion/personalAdministrativo"
                  className={`block px-4 py-2 transition-colors ${
                    isActive("/organizacion/personalAdministrativo")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-[#E4BCD3] hover:text-[#545454]"
                  }`}
                >
                Personal Administrativo
                </a>
              </li>
            </ul>
          </li>
          <li className="w-full">
            {/* Botón principal para Desarrollo Profesional */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setOpenDesarrollo(!openDesarrollo);
              }}
              className={`flex items-center justify-between w-full px-3 py-2 rounded transition-colors ${
                isActiveDropdown(desarrolloPaths)
                  ? "bg-[#E4BCD3] text-[#545454]"
                  : "hover:bg-[#E4BCD3] hover:text-[#545454]"
              }`}
            >
              Desarrollo Profesional
              <span
                className={`transform transition-transform duration-300 ${
                  openDesarrollo ? "rotate-180" : "rotate-0"
                }`}
              >
                v
              </span>
            </button>

            {/* Menú desplegable para Desarrollo Profesional */}
            <ul
              className={`overflow-hidden transition-all duration-300 ${
                openDesarrollo ? "max-h-40" : "max-h-0"
              }`}
            >
              <li>
                <a
                  href="/desarrolloProfesional/pasantias"
                  className={`block px-4 py-2 transition-colors ${
                    isActive("/desarrolloProfesional/pasantias")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-[#E4BCD3] hover:text-[#545454]"
                  }`}
                >
                  Pasantias
                </a>
              </li>
              <li>
                <a
                  href="/desarrolloProfesional/rsu"
                  className={`block px-4 py-2 transition-colors ${
                    isActive("/desarrolloProfesional/rsu")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-[#E4BCD3] hover:text-[#545454]"
                  }`}
                >
                  Rsu
                </a>
              </li>
              <li>
                <a
                  href="/desarrolloProfesional/bolsaDeTrabajo"
                  className={`block px-4 py-2 transition-colors ${
                    isActive("/desarrolloProfesional/bolsaDeTrabajo")
                      ? "bg-[#E4BCD3] text-[#545454]"
                      : "hover:bg-[#E4BCD3] hover:text-[#545454]"
                  }`}
                >
                  Bolsa de trabajo
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a
              href="/noticias"
              className={`block px-3 py-2 rounded transition-colors ${
                isActive("/noticias")
                  ? "bg-[#E4BCD3] text-[#545454]"
                  : "hover:bg-[#E4BCD3] hover:text-[#545454]"
              }`}
            >
              Noticias
            </a>
          </li>
          <li>
            <a
              href="/documentos"
              className={`block px-3 py-2 rounded transition-colors ${
                isActive("/documentos")
                  ? "bg-[#E4BCD3] text-[#545454]"
                  : "hover:bg-[#E4BCD3] hover:text-[#545454]"
              }`}
            >
              Documentos
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-[#E4BCD3] hover:text-[#545454] transition-colors"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Sección inferior (Opcional) */}
      <div className="mt-10">
        <hr className="border-[#868686]/50 mb-4" />
        <p className="text-sm text-center text-[#868686]">
          © 2025 Escuela Inicial
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
