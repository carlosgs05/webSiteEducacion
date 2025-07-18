import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Sidebar from "./Sidebar";
import axios from "axios";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No hay token almacenado");
          return;
        }
        const response = await axios.get("https://pagina-educacion-backend-production.up.railway.app/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener usuario", error.response || error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header onToggleSidebar={handleToggleSidebar} user={user} />
      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`
            bg-[#5c5c5c] text-white 
            lg:block lg:w-64
            absolute top-0 left-0 z-40 transform transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 lg:sticky lg:top-0
          `}
        >
          <Sidebar />
        </aside>
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 lg:hidden"
            onClick={handleToggleSidebar}
          />
        )}
        <main className="flex-1 bg-white overflow-y-auto p-6">
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