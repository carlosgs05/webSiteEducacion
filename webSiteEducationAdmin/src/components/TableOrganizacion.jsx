import PropTypes from "prop-types";

const TableOrganizacion = ({
  data,
  openImagenModal,
  openEditModal,
  openTablePublicacionesModal,
  handleDelete,
}) => (
  <table className="w-full text-sm text-left">
    <thead className="bg-[#545454] text-white uppercase text-xs">
      <tr className="h-12">
        <th className="px-4 text-center">Nombres</th>
        <th className="px-4 text-center">Correo</th>
        <th className="px-4 text-center">Cargo</th>
        <th className="px-4 text-center">Título</th>
        <th className="px-4 text-center">Foto</th>
        <th className="px-4 text-center">Publicaciones</th>
        <th className="px-4 text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {data.length === 0 ? (
        <tr className="bg-white border-b">
          <td colSpan={7} className="py-4 text-center text-gray-500">
            SIN REGISTROS
          </td>
        </tr>
      ) : (
        data.map((item, idx) => (
          <tr
            key={item.IdPersona}
            className={`border-b ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:bg-gray-100`}
          >
            <td className="py-2 px-4 text-center">{item.NombreCompleto}</td>
            <td className="py-2 px-4 text-center">{item.Correo}</td>
            <td className="py-2 px-4 text-center">{item.Cargo}</td>
            <td className="py-2 px-4 text-center">{item.Titulo}</td>
            <td className="py-2 px-4 text-center">
              <button
                onClick={() =>
                  openImagenModal(`http://localhost:8000/${item.Foto}`)
                }
                className="cursor-pointer bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded-md transition"
              >
                Ver
              </button>
            </td>
            <td className="py-2 px-4 text-center">
              {item.publicaciones?.length ? (
                <button
                  onClick={() =>
                    openTablePublicacionesModal(item.publicaciones)
                  }
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md transition"
                >
                  Listar
                </button>
              ) : (
                <span className="text-gray-400">—</span>
              )}
            </td>
            <td className="py-2 px-4 text-center">
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => openEditModal(item)}
                  title="Editar"
                  className="cursor-pointer bg-[#262D73] hover:bg-[#36395d] p-1 rounded-md transition"
                >
                  {/* Pencil SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v12a2 2 0 
                         002 2h12a2 2 0 002-2v-5m-1.414-6.414L16 
                         3m0 0l-3 3m3-3L19 6"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(item.IdPersona)}
                  title="Eliminar"
                  className="cursor-pointer bg-red-500 hover:bg-red-600 p-1 rounded-md transition"
                >
                  {/* Trash SVG */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 
                         0116.138 21H7.862a2 2 0 
                         01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V5a2 2 0 
                         00-2-2H9a2 2 0 00-2 2v2m3 0h4"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

TableOrganizacion.propTypes = {
  data: PropTypes.array.isRequired,
  openImagenModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  openTablePublicacionesModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TableOrganizacion;