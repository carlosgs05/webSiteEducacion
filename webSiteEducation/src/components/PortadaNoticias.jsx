import { Link } from "react-router";
import PropTypes from "prop-types";

const PortadaNoticias = ({ data }) => {
  if (!data || data.length < 3) {
    return <p>No hay suficientes noticias para mostrar.</p>;
  }
  const noticiaPrincipal = data[0];
  const noticiasSecundarias = data.slice(1, 3);

  return (
    <div className="grid gap-4">
      {/* Noticia Principal */}
      <Link
        to={`/novedades/noticias/${noticiaPrincipal.IdNoticia}`}
        className="relative group block overflow-hidden border border-blue-300 rounded-lg"
      >
        <img
          src={`https://pagina-educacion-backend-production.up.railway.app/${noticiaPrincipal.ImagenPortada}`}
          alt={noticiaPrincipal.Nombre}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
          <h2 className="text-white text-xl font-bold mt-2">
            {noticiaPrincipal.Nombre}
          </h2>
          <p className="text-gray-300 text-base mt-1">
            {noticiaPrincipal.Fecha}
          </p>
        </div>
      </Link>

      {/* Noticias Secundarias */}
      <div className="grid grid-cols-2 gap-4">
        {noticiasSecundarias.map((item) => (
          <Link
            key={item.id}
            to={`/novedades/noticias/${item.IdNoticia}`}
            className="relative group block overflow-hidden border border-blue-300 rounded-lg"
          >
            <img
              src={`https://pagina-educacion-backend-production.up.railway.app/${item.ImagenPortada}`}
              alt={item.Nombre}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2">
              <h3 className="text-white text-base font-semibold">
                {item.Nombre}
              </h3>
              <p className="text-gray-300 text-sm">{item.Fecha}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
PortadaNoticias.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      IdNoticia: PropTypes.number.isRequired, 
      url: PropTypes.string.isRequired,
      ImagenPortada: PropTypes.string.isRequired,
      Titulo: PropTypes.string.isRequired,
      Nombre: PropTypes.string.isRequired,
      Fecha: PropTypes.string.isRequired,
    })
  ),
};
PortadaNoticias.defaultProps = {
  data: [],
};
export default PortadaNoticias;
