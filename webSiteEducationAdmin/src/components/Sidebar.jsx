
const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen p-5 shadow-lg">
        <a href="/">
        <h2 className="text-2xl font-bold mb-5">Motiv.</h2>
        </a>
      <ul className="space-y-4">
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          <a href="/homeCarrusel">Home Carrusel</a>
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          <a href="/desarrolloProfesional"> Desarrollo Profesional</a>
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          Authentication
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          Buy Cars
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          Messages
        </li>
        <li className="text-gray-700 hover:text-blue-500 cursor-pointer">
          Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
