import PropTypes from "prop-types";

const Button = ({ name, link, onClick, isActive }) => {
  return (
    <a
      href={link}
      onClick={(e) => {
        e.preventDefault(); // Evita la navegación del enlace
        onClick(); // Llama a la función onClick pasada como prop
      }}
      className={`w-40 h-14 flex items-center justify-center text-center px-4 py-2 text-white rounded transition-all ${
        isActive
          ? "bg-[#545454] pointer-events-none"
          : "bg-[#E4BCD3] hover:bg-[#545454]"
      }`}
    >
      {name}
    </a>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default Button;
