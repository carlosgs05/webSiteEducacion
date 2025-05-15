import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hoverNov, setHoverNov] = useState(false);
  const [hoverServ, setHoverServ] = useState(false);
  const [mobileNovOpen, setMobileNovOpen] = useState(false);
  const [mobileServOpen, setMobileServOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const enlaces = [
    { label: 'Inicio', href: '/' },
    { label: 'Organización', href: '/organizacion' },
    { label: 'Información Académica', href: '/informacionAcademica/perfiles' },
    { label: 'Desarrollo Profesional', href: '/desarrolloProfesional' },
  ];

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transform transition-transform duration-300
        ${scrolled ? 'bg-[#303030]/40 backdrop-blur-md shadow-lg' : 'bg-[#303030]/20 backdrop-blur-sm'}
        translate-y-0`}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="/assets/logo.png" className="h-10" alt="Logo" />
        </a>

        {/* Botón menú hamburguesa móvil */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-800 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menú escritorio */}
        <ul className="hidden lg:flex space-x-8 text-white font-medium items-center">
          {enlaces.map((it) => (
            <li key={it.href}>
              <a href={it.href} className="relative py-2 hover:text-purple-600 group">
                {it.label}
                <span className="absolute left-0 bottom-0 block h-0.5 w-0 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
          {/* Dropdown Novedades */}
          <li className="relative" onMouseEnter={() => setHoverNov(true)} onMouseLeave={() => setHoverNov(false)}>
            <button className="flex items-center space-x-1 py-2">
              <span>Novedades</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 10 6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            {hoverNov && (
              <div className="absolute top-full bg-white/90 backdrop-blur-sm shadow-lg rounded-lg w-44 text-gray-800">
                <ul className="py-2">
                  <li><a href="/novedades/noticias" className="block px-4 py-2 hover:bg-gray-100">Noticias</a></li>
                  <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Publicaciones</a></li>
                </ul>
              </div>
            )}
          </li>
          {/* Dropdown Servicios Adm. */}
          <li className="relative" onMouseEnter={() => setHoverServ(true)} onMouseLeave={() => setHoverServ(false)}>
            <button className="flex items-center space-x-1 py-2">
              <span>Servicios Adm.</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 10 6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            {hoverServ && (
              <div className="absolute top-full bg-white/90 backdrop-blur-sm shadow-lg rounded-lg w-48 text-gray-800">
                <ul className="py-2">
                  <li><a href="/serviciosAdministrativos/mesa-de-partes" className="block px-4 py-2 hover:bg-gray-100">Mesa de partes</a></li>
                  <li><a href="https://transparencia-universitaria.unitru.edu.pe" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-gray-100">Portal de transparencia</a></li>
                  <li><a href="https://reclamos.servicios.gob.pe" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 hover:bg-gray-100">Libro de reclamaciones</a></li>
                  <li><a href="/serviciosAdministrativos/documentos-tramites" className="block px-4 py-2 hover:bg-gray-100">Documentación</a></li>
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>

      {/* Menú móvil*/}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-4">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-800 font-medium">
            {enlaces.map((it) => (
              <li key={it.href}>
                <a href={it.href} className="block py-2 text-center border-b border-gray-200">{it.label}</a>
              </li>
            ))}

            {/* Dropdown Novedades */}
            <li className="col-span-2">
              <button onClick={() => setMobileNovOpen(!mobileNovOpen)} className="w-full flex justify-between items-center py-2 border-b border-gray-200">
                <span>Novedades</span>
                <svg className={`w-5 h-5 transform transition-transform ${mobileNovOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileNovOpen && (
                <ul className="pl-4 space-y-1">
                  <li><a href="/novedades/noticias" className="block py-1">Noticias</a></li>
                  <li><a href="#" className="block py-1">Publicaciones</a></li>
                </ul>
              )}
            </li>

            {/* Dropdown Servicios Adm. */}
            <li className="col-span-2">
              <button onClick={() => setMobileServOpen(!mobileServOpen)} className="w-full flex justify-between items-center py-2 border-b border-gray-200">
                <span>Servicios Adm.</span>
                <svg className={`w-5 h-5 transform transition-transform ${mobileServOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileServOpen && (
                <ul className="pl-4 space-y-1">
                  <li><a href="/serviciosAdministrativos/mesa-de-partes" className="block py-1">Mesa de partes</a></li>
                  <li><a href="https://transparencia-universitaria.unitru.edu.pe" target="_blank" rel="noopener noreferrer" className="block py-1">Portal de transparencia</a></li>
                  <li><a href="https://reclamos.servicios.gob.pe" target="_blank" rel="noopener noreferrer" className="block py-1">Libro de reclamaciones</a></li>
                  <li><a href="/serviciosAdministrativos/documentos-tramites" className="block py-1">Documentación</a></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
