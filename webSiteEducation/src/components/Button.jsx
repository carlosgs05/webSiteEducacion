import PropTypes from "prop-types";

const Button = ({ bgColor, hoverBgColor, name, link }) => {
  return (
    <a
      href={link}
      className={`w-40 h-14 flex items-center justify-center text-center px-4 py-2 text-white rounded transition-all ${bgColor} ${hoverBgColor}`}
    >
      {name}
    </a>
  );
};

Button.propTypes = {
  bgColor: PropTypes.string.isRequired,
  hoverBgColor: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
export default Button;
