import Navbar from "./Navbar";
import PropTypes from "prop-types";
const Header = ({ tittle }) => {
  return (
    <header className=" border-gray-500">
      <img
        src="/assets/portada-inicial.jpg"
        alt="Foto"
        className="w-full object-cover"
      />
      <Navbar />
      <div className="absolute top-[35%] left-[15%]   text-white">
        <h1 className="text-4xl font-bold">{tittle}</h1>
      </div>
    </header>
  );
};

Header.propTypes = {
  tittle: PropTypes.string.isRequired,
};
export default Header;
