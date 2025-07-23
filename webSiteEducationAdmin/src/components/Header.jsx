import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { FaUser, FaChevronDown, FaBars } from "react-icons/fa";

const Header = ({ onToggleSidebar, user }) => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
        <header className="sticky top-0 z-40 flex items-center justify-between bg-gradient-to-r from-[#4a4a4a] to-[#383838] text-white px-6 py-4 shadow-xl backdrop-blur-sm border-b border-gray-600">
      <div className="flex items-center space-x-4">
        <button
          className="md:hidden cursor-pointer bg-gray-700 hover:bg-gray-600 rounded-full p-3 transition-all duration-300 transform hover:scale-105"
          onClick={onToggleSidebar}
          aria-label="Mostrar sidebar"
        >
          <FaBars className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group" ref={dropdownRef}>
          <button
            className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            onClick={toggleUserDropdown}
            aria-label="Menú de usuario"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-[#E4BCD3] to-[#d8a1c3] rounded-full p-0.5">
                <div className="bg-gray-800 rounded-full p-1.5">
                  <FaUser className="w-5 h-5 text-[#E4BCD3]" />
                </div>
              </div>
            </div>
            <div className="text-left hidden lg:block">
              <div className="font-medium text-sm">
                {`${user.name} ${user.last_name}`}
              </div>
              <div className="text-xs text-[#E4BCD3]">Administrador</div>
            </div>
            <FaChevronDown
              className={`w-3 h-3 text-gray-400 transition-transform duration-200 transform ${
                isUserDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>

          {isUserDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 origin-top-right bg-[#4a4a4a] border border-gray-600 rounded-xl shadow-2xl overflow-hidden z-50">
              <a
                href="/perfil"
                className="flex items-center w-full px-4 py-3 text-sm hover:bg-[#E4BCD3] hover:text-[#545454] transition-colors duration-200 cursor-pointer"
              >
                <FaUser className="mr-3" />
                <span>Mi perfil</span>
              </a>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/";
                }}
                className="flex items-center w-full px-4 py-3 text-sm hover:bg-red-500 hover:bg-opacity-20 text-red-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <span className="ml-1 mr-3">→</span>
                <span>Cerrar sesión</span>
              </button>
            </div>
          )}
        </div>
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
