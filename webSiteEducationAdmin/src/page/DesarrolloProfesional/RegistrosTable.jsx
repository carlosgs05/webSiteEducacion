import PropTypes from "prop-types";

const RegistrosTable = ({
  data,
  openDescripcionModal,
  openImagenModal,
  openEditModal,
  handleDelete,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
      <table className="w-full text-sm">
        <thead className="bg-[#545454] text-white">
          <tr className="h-14">
            <th className="px-4 text-center font-medium">Descripción</th>
            <th className="px-4 text-center font-medium">Imagen</th>
            <th className="px-4 text-center font-medium">URL</th>
            <th className="px-4 text-center font-medium">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr className="bg-white">
              <td 
                colSpan={4} 
                className="py-6 text-center text-gray-500 text-base"
              >
                SIN REGISTROS
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={item.IdDesarrollo}
                className={`border-b border-gray-100 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors duration-150`}
              >
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => openDescripcionModal(item.Descripcion)}
                    className="flex items-center justify-center w-7 h-7 mx-auto bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors duration-200"
                    title="Ver descripción"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-gray-600" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() =>
                      openImagenModal(`https://pagina-educacion-backend-production.up.railway.app/${item.Imagen}`)
                    }
                    className="flex items-center justify-center w-7 h-7 mx-auto bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors duration-200"
                    title="Ver imagen"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 text-gray-600" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </td>
                <td className="py-4 px-4 text-center">
                  <a
                    href={item.Url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate max-w-xs block mx-auto"
                    title={item.Url}
                  >
                    {item.Url}
                  </a>
                </td>
                <td className="py-4 px-4">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => openEditModal(item)}
                      title="Editar"
                      className="flex items-center justify-center w-7 h-7 bg-[#262D73] hover:bg-[#36395d] rounded-full cursor-pointer transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(item.IdDesarrollo)}
                      title="Eliminar"
                      className="flex items-center justify-center w-7 h-7 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

RegistrosTable.propTypes = {
  data: PropTypes.array.isRequired,
  openDescripcionModal: PropTypes.func.isRequired,
  openImagenModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default RegistrosTable;