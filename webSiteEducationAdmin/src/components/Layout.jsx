import { useEffect,useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";
const Layout = ({ children }) => {
  // Controla la visibilidad del Sidebar en pantallas menores a lg
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token almacenado");
          return;
        }
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        console.log("Usuario obtenido:", response.data);
      } catch (error) {
        console.error("Error al obtener usuario", error.response || error);
      }
    };
  
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header con botón hamburguesa */}
      <Header 
      onToggleSidebar={handleToggleSidebar} 
      user = {user}
      />

      {/* Contenedor principal */}
      <div className="flex flex-1 relative">
        {/* SIDEBAR - fijo a la izquierda en pantallas lg+, oculto en sm si no está "open" */}
        <aside
          className={`
            bg-[#5c5c5c] text-white 
            lg:static lg:block lg:w-64
            h-screen
            absolute top-0 left-0
            z-40
            transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <Sidebar />
        </aside>

        {/* Overlay oscuro en pantallas menores a lg cuando el sidebar está abierto */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={handleToggleSidebar}
          />
        )}

        {/* MAIN - Ocupa el espacio restante */}
        <main className="flex-1 bg-white overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;