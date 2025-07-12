import PropTypes from "prop-types";

const ModalInfo = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl mx-auto md:w-3/5 p-6 rounded-lg shadow-lg flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto">

        {/* Botón para cerrar */}
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl hover:text-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Imagen de perfil */}
        <div className="w-full md:w-1/3 flex items-center justify-center mb-4 md:mb-0">
          <img
            src={`https://pagina-educacion-backend-production.up.railway.app/${data.Foto}`}
            alt={data.NombreCompleto}
            className="rounded-lg w-full h-auto object-cover"
          />
        </div>

        {/* Contenido del modal */}
        <div className="w-full md:w-2/3 md:pl-6">
          <h3 className="text-xl md:text-2xl font-bold text-blue-900 border-b pb-2">
            Nombres Apellidos: {data.NombreCompleto}
          </h3>

          <div className="mt-4">
            <h4 className="text-lg md:text-xl font-semibold text-gray-700 border-b pb-1">
              Correo: <span className="font-normal">{data.Correo}</span>
            </h4>
          </div>

          <div className="mt-4">
            <h4 className="text-lg md:text-xl font-semibold text-gray-700 border-b pb-1">
              Título:
            </h4>
            <p className="mt-2 text-sm md:text-base">
              {data.Titulo}
            </p>
          </div>

          <div className="mt-4">
            <h4 className="text-lg md:text-xl font-semibold text-blue-900 border-b pb-1">
              Publicaciones
            </h4>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full min-w-[600px] border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Título</th>
                    <th className="border border-gray-300 p-2">URL</th>
                  </tr>
                </thead>
                <tbody>
                  {data.publicaciones && data.publicaciones.length > 0 ? (
                    data.publicaciones.map((pub, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-300 p-2 text-sm md:text-base">
                          {pub.Titulo}
                        </td>
                        <td className="border border-gray-300 p-2 text-sm md:text-base">
                          <a
                            href={pub.Url}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Ver publicación
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center p-2">
                        No hay publicaciones disponibles
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalInfo.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    Foto: PropTypes.string,
    NombreCompleto: PropTypes.string,
    Correo: PropTypes.string,
    Titulo: PropTypes.string,
    publicaciones: PropTypes.arrayOf(
      PropTypes.shape({
        Titulo: PropTypes.string,
        Url: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ModalInfo;
