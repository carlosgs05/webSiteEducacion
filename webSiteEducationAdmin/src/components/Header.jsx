import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Header = ({ onToggleSidebar, user }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Cierra el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setProfileOpen(!profileOpen);
  };

  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#5c5c5c] text-white h-20">
      {/* Logo o Título */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Escuela de Educación Inicial</h1>
      </div>

      {/* Barra de iconos y botón hamburguesa */}
      <div className="flex items-center space-x-4">
        {/* Contenedor para el dropdown de perfil que incluye ícono y datos */}
        <div
          className="relative flex items-center cursor-pointer"
          onClick={handleProfileClick}
          ref={dropdownRef}
        >
          {/* Ícono de perfil */}
          <svg
            className="w-8 h-8 text-white hover:text-[#E4BCD3] transition-colors"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M18 14a6 6 0 10-12 0 7 7 0 00-2 4.9V21a1 1 0 001 1h14a1 1 0 001-1v-2.1a7 7 0 00-2-4.9zm-6-4a4 4 0 100-8 4 4 0 000 8z"
              clipRule="evenodd"
            />
          </svg>
          {/* Nombre y rol del usuario: se muestran desde pantallas pequeñas en adelante */}
          <div className="ml-2 hidden sm:flex flex-col">
            <span className="text-sm font-medium">
              {user?.name || "Cargando..."}
            </span>
            <span className="text-xs text-[#E4BCD3]">Administrador</span>
          </div>

          {/* Dropdown */}
          {profileOpen && (
            <div className="absolute top-full right-0 mt-2 w-44 bg-white text-[#545454] rounded shadow-lg py-2 z-50">
              <a
                href="/perfil"
                className="block px-4 py-2 hover:bg-[#E4BCD3] hover:text-[#545454]"
              >
                Mi Perfil
              </a>
              <button
                type="button"
                className="w-full text-left px-4 py-2 hover:bg-[#E4BCD3] hover:text-[#545454]"
                onClick={() => {
                  // Lógica para cerrar sesión
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>

        {/* Botón hamburguesa - visible solo en pantallas menores a lg */}
        <button
          className="lg:hidden p-2 focus:outline-none hover:text-[#E4BCD3] transition-colors"
          onClick={onToggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  onToggleSidebar: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default Header;
