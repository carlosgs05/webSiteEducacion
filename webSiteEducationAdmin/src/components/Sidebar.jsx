const Sidebar = () => {
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
          <h2 className="text-xl font-bold hover:text-[#E4BCD3] transition-colors">
            INICIO
          </h2>
        </a>

        {/* Menú de navegación */}
        <ul className="space-y-2">
          <li>
            <a
              href="/homeCarrusel"
              className="block px-3 py-2 rounded hover:bg-[#E4BCD3] hover:text-[#545454] transition-colors"
            >
              Home Carrusel
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-[#E4BCD3] hover:text-[#545454] transition-colors"
            >
              Authentication
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-[#E4BCD3] hover:text-[#545454] transition-colors"
            >
              Buy Cars
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-3 py-2 rounded hover:bg-[#E4BCD3] hover:text-[#545454] transition-colors"
            >
              Messages
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