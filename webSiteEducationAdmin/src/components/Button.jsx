import PropTypes from "prop-types";

const Button = ({ name, link, onClick, isActive, target, bgColor }) => {
  return (
    <a target={target ? target : "_self"} // Si no se proporciona target, usa "_self"
      href={link ? link : "#"} // Si no se proporciona link, usa "#"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault(); // Evita la navegación solo si onClick está definido
          onClick(); // Llama a la función si existe
        }
      }}
      className={`text-center p-2.5 text-white font-semibold rounded transition-all ${isActive ? "bg-[#545454] pointer-events-none" : `${bgColor} hover:bg-[#545454]`
        }`}
    >
      {name}
    </a>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired, // Siempre es obligatorio
  link: PropTypes.string, // Puede ser opcional
  onClick: PropTypes.func, // Puede ser opcional
  isActive: PropTypes.bool, // Puede ser opcional
  target: PropTypes.string, // Puede ser opcional
  bgColor: PropTypes.string.isRequired
};

export default Button;