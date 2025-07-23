import { useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header independiente */}
      <div className="md:ml-64">
        <Header onToggleSidebar={handleToggleSidebar} user={user} />
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (siempre presente pero oculto en móvil) */}
        <Sidebar isOpen={sidebarOpen} toggle={handleToggleSidebar} />
        
        {/* Overlay para móvil */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={handleToggleSidebar}
          />
        )}
        
        {/* Contenido principal */}
        <main className="flex-1 bg-white overflow-y-auto p-6 md:ml-64">
          {typeof children === "function" ? children(user) : children}
        </main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};

export default Layout;