import PropTypes from "prop-types";
import Header from "./Header";
import Sidebar from "./sidebar";

const Layout = ({ children }) => {
  return (
    <div className="relative">
      {/* Contenido principal con flex y min-h-screen */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Contenedor con sidebar y main */}
        <div className="flex flex-1">
          <Sidebar />

          {/* MAIN: hacemos flex-col para ocupar toda la altura y poder centrar vertical/horizontal */}
          <main className="flex-1 bg-white/90 backdrop-blur-md flex flex-col p-6">
            {/* <div className="flex-1 p-6 flex items-center justify-center"> */}
              {children}
          </main>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
