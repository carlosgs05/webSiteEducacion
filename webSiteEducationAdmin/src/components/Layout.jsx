import PropTypes from 'prop-types';
import Header from './Header';
import Sidebar from './sidebar';

const Layout = ({ children }) => {
  return (
    <div className="relative">
      {/* Contenido del Layout (por encima del overlay) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Área de contenido con Sidebar y Main */}
        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-8 bg-white/90 backdrop-blur-md">
            {/* Contenido dinámico (children) */}
            <div className="p-6">
              {children}
            </div>
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
