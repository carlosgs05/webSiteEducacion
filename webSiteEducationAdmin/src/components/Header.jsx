const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-[#5c5c5c] text-white h-20">
      {/* Logo o Título */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Escuela de Educacion Inicial</h1>
      </div>

      {/* Barra de búsqueda e iconos */}
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-3 py-2 rounded-full text-[#545454] placeholder-[#868686] focus:outline-none focus:ring-2 focus:ring-[#E4BCD3]"
          />
          <span className="absolute right-3 top-2 text-[#868686] cursor-pointer hover:text-[#E4BCD3] transition-colors">
            🔍
          </span>
        </div>
        <span className="text-xl cursor-pointer hover:text-[#E4BCD3] transition-colors">
          🔔
        </span>
        <span className="text-xl cursor-pointer hover:text-[#E4BCD3] transition-colors">
          👤
        </span>
      </div>
    </header>
  );
};

export default Header;