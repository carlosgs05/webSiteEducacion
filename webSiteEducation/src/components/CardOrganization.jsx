import PropTypes from "prop-types";

const CardOrganization = ({ photo, name, role }) => {
  return (
    <div className="w-64 p-4 shadow-md rounded-md text-center">
      {/* Foto */}
      <div className="relative">
        <img
          src={photo}
          alt={name}
          className="w-full h-64 object-cover rounded-md"
        />
        {/* Botón de "+" */}
        <div className="absolute bottom-2 right-2 w-10 h-10 bg-pink-200 text-pink-600 flex items-center justify-center rounded-full shadow-md cursor-pointer">
          +
        </div>
      </div>

      {/* Nombre y Cargo */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-500">{role}</p>
      </div>
    </div>
  );
};
CardOrganization.propTypes = {
  photo: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
export default CardOrganization;