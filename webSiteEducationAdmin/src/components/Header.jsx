
const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-2xl font-bold">Escuela de Educacion Inicial</h1>
      <div className="flex items-center space-x-4">
        <span className="text-xl cursor-pointer">🔔</span>
        <span className="text-xl cursor-pointer">👤</span>
      </div>
    </header>
  );
};

export default Header;
