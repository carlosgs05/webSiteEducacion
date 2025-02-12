import PropTypes from "prop-types";
const CardDocumento = ({ nombre, descripcion, enlace }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-x-4 border-[#E4BCD3] ">
      <div className="flex items-center mb-4">
        <i
          className="fa-regular fa-folder-open text-xl text-[#262D73] transition-all mr-3"
          data-astro-cid-dohjnao5=""
        ></i>
        <h3 className="text-[#262D73] font-bold">{nombre}</h3>
      </div>
      <p className="text-gray-700 text-sm mb-4">{descripcion}</p>
      <div className="grid grid-cols-1">
        <a
          href={enlace}
          target="_blank"
          className= "border border-blue-800 text-blue-800 rounded-md px-4 py-2 hover:bg-[#545454] hover:border-[#545454] hover:text-white transition text-center"
        >
          Ver
        </a>
      </div>
    </div>
  );
};
CardDocumento.propTypes = {
  nombre: PropTypes.string.isRequired,
  descripcion: PropTypes.string.isRequired,
  enlace: PropTypes.string.isRequired,
};

export default CardDocumento;
