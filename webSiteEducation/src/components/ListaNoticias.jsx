import { Link } from "react-router";
import PropTypes from "prop-types";
const ListaNoticias = ({ data }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-[#262D73]">Más noticias</h3>
      <div className="w-full h-1 bg-[#D9D9D9]"></div>
      <div className=" mt-2 pt-2 h-[470px] overflow-y-auto">
        {data.map((item) => (
          <Link
            key={item.IdNoticia}
            to={`/novedades/noticias/${item.IdNoticia}`}
            className="flex items-center gap-2 p-2 border-b border-gray-300"
          >
            <img
              src={`http://localhost:8000/${item.ImagenPortada}`}
              alt={item.Nombre}
              className="w-32 h-32  object-cover rounded-md "
            />
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">{item.Fecha}</span>
              <h4 className="text-sm font-semibold text-gray-800">
                {item.Nombre}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
ListaNoticias.propTypes = {
  data: PropTypes.array,
};
export default ListaNoticias;
