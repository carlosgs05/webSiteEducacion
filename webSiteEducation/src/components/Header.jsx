import Navbar from "./Navbar";
import PropTypes from "prop-types";

const Header = ({ title }) => (
  <header className="relative border-b border-gray-300 overflow-hidden">
    {/* Imagen de fondo */}
    <div className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]">
      <img
        src="/webSiteEducacion/assets/portada-inicial.jpg"
        alt="Portada inicial"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Navbar */}
    <div className="absolute inset-x-0 top-0 z-10">
      <Navbar />
    </div>

    {/* Título */}
    <div className="absolute inset-0 flex items-center  px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-white text-right drop-shadow-lg">
        {title}
      </h1>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
