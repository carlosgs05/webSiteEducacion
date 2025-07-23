import PropTypes from "prop-types";

const TableOrganizacion = ({
  data,
  openImagenModal,
  openEditModal,
  openTablePublicacionesModal,
  handleDelete,
}) => (
  <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-md">
    <table className="w-full text-sm">
      <thead className="bg-[#545454] text-white">
        <tr className="h-14">
          <th className="px-4 text-center font-medium">Nombres</th>
          <th className="px-4 text-center font-medium">Correo</th>
          <th className="px-4 text-center font-medium">Cargo</th>
          <th className="px-4 text-center font-medium">Título</th>
          <th className="px-4 text-center font-medium">Foto</th>
          <th className="px-4 text-center font-medium">Publicaciones</th>
          <th className="px-4 text-center font-medium">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className="bg-white">
            <td colSpan={7} className="py-6 text-center text-gray-500 text-base">
              SIN REGISTROS
            </td>
          </tr>
        ) : (
          data.map((item, idx) => (
            <tr
              key={item.IdPersona}
              className={`border-b border-gray-100 ${
                idx % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-gray-100 transition-colors duration-150`}
            >
              <td className="py-4 px-4 text-center font-medium text-gray-700">{item.NombreCompleto}</td>
              <td className="py-4 px-4 text-center text-gray-600">{item.Correo}</td>
              <td className="py-4 px-4 text-center text-gray-600">{item.Cargo}</td>
              <td className="py-4 px-4 text-center text-gray-600">{item.Titulo}</td>
              <td className="py-4 px-4 text-center">
                <button
                  onClick={() =>
                    openImagenModal(`https://pagina-educacion-backend-production.up.railway.app/${item.Foto}`)
                  }
                  className="flex items-center justify-center w-7 h-7 mx-auto bg-gray-100 hover:bg-gray-200 rounded-full cursor-pointer transition-colors duration-200"
                  title="Ver foto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </td>
              <td className="py-4 px-4 text-center">
                {item.publicaciones?.length ? (
                  <button
                    onClick={() => openTablePublicacionesModal(item.publicaciones)}
                    className="flex items-center justify-center w-7 h-7 mx-auto bg-blue-100 hover:bg-blue-200 rounded-full cursor-pointer transition-colors duration-200"
                    title="Ver publicaciones"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                ) : (
                  <span className="text-gray-400 text-sm">—</span>
                )}
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
                    onClick={() => handleDelete(item.IdPersona)}
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

TableOrganizacion.propTypes = {
  data: PropTypes.array.isRequired,
  openImagenModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openTablePublicacionesModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TableOrganizacion;