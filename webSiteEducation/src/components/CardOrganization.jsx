import PropTypes from "prop-types";

const CardOrganization = ({ photo, name, role }) => {
  return (
    <div className="w-64 text-center mx-auto">
      {/* Foto */}
      <div className="relative w-full h-64">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover rounded-md shadow-[6px_6px_10px_rgba(0,0,0,0.25)]"
        />
        {/* Botón de "+" */}
        <div className="absolute pb-1 -bottom-1 text-center -right-4 text-2xl w-10 h-10 font-bold bg-[#E4BCD3] text-[#262D73] flex items-center justify-center rounded-full shadow-md cursor-pointer">
          +
        </div>
      </div>

      {/* Nombre y Cargo */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-[#262D73]">{name}</h3>
        <p className="text-[#545454] font-semibold">{role}</p>
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
