import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";

const Navbar = () => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation(); // Hook para obtener la ruta actual

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header")?.offsetHeight || 0;

      if (window.scrollY > headerHeight) {
        setIsOpaque(true);
      } else {
        setIsOpaque(false);
      }
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }

      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Función para verificar si el enlace está activo
  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 w-full px-4 md:px-12 py-1 transition-colors duration-300 z-50 ${
        isOpaque ? "bg-[#545454]" : "bg-[#545454]/80"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse lg:py-4"
        >
          <img src="../src/assets/logo.png" className="h-10" alt="Logo" />
        </a>

        {/* Hamburguesa */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-white rounded-lg lg:hidden hover:ring-2 hover:ring-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Opciones del menú */}
        <div
          ref={mobileMenuRef}
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full lg:block lg:w-auto py-4`}
        >
          {/* Ajuste de espacio horizontal entre li */}
          <ul className="flex flex-col font-medium p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg lg:space-x-12 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 lg:items-center">
            <li>
              <a
                href="/"
                className={`block py-2 px-3 rounded lg:p-0 ${
                  isActive("/")
                    ? "text-white bg-[#E4BCD3] lg:text-[#E4BCD3] lg:bg-transparent"
                    : "text-white bg-transparent"
                } hover:bg-[#E4BCD3] lg:hover:text-[#E4BCD3] lg:hover:bg-transparent`}
              >
                Inicio
              </a>
            </li>

            <li>
              <a
                href="/organizacion"
                className={`block py-2 px-3 rounded lg:p-0 ${
                  isActive("/organizacion")
                    ? "text-white bg-[#E4BCD3] lg:text-[#E4BCD3] lg:bg-transparent"
                    : "text-white bg-transparent"
                } hover:bg-[#E4BCD3] lg:hover:text-[#E4BCD3] lg:hover:bg-transparent`}
              >
                Organización
              </a>
            </li>

            <li>
              <a
                href="/informacionAcademica/perfiles"
                className={`block py-2 px-3 rounded lg:p-0 ${
                  ["/informacionAcademica/perfiles", "/informacionAcademica/mallaCurricular"].some(isActive)
                    ? "text-white bg-[#E4BCD3] lg:text-[#E4BCD3] lg:bg-transparent"
                    : "text-white bg-transparent"
                } hover:bg-[#E4BCD3] lg:hover:text-[#E4BCD3] lg:hover:bg-transparent`}
              >
                <span className="block lg:hidden">Información Académica</span>
                <span className="hidden lg:block">
                  Información <br /> Académica
                </span>
              </a>
            </li>

            <li>
              <a
                href="/organizacion"
                className="block py-2 px-3 text-white lg:text-center lg:leading-tight rounded hover:bg-[#E4BCD3] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#E4BCD3] lg:p-0"
              >
                <span className="block lg:hidden">Desarrollo Profesional</span>
                <span className="hidden lg:block">
                  Desarrollo <br /> Profesional
                </span>
              </a>
            </li>

            {/* Dropdown */}
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full py-2 px-3 lg:p-0 text-white rounded hover:bg-[#E4BCD3] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#E4BCD3]"
              >
                Novedades
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 bg-[#545454]/90 text-white divide-y divide-gray-600 rounded-lg shadow w-44"
                >
                  <ul className="py-2 text-sm">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-[#E4BCD3]"
                      >
                        Noticias
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-[#E4BCD3]"
                      >
                        Publicaciones
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            <li>
              <a
                href="/organizacion"
                className="block py-2 px-3 text-white lg:text-center lg:leading-tight rounded hover:bg-[#E4BCD3] lg:hover:bg-transparent lg:border-0 lg:hover:text-[#E4BCD3] lg:p-0"
              >
                <span className="block lg:hidden">
                  Servicios Administrativos
                </span>
                <span className="hidden lg:block">
                  Servicios <br /> Administrativos
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
