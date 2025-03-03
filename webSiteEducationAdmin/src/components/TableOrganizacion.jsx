import { FaEdit, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

const TableOrganizacion = ({
  data,
  openTablePublicacionesModal,
  openImagenModal,
  openEditModal,
  handleDelete,
}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right">
      <thead className="text-xs text-white uppercase bg-[#545454]">
        <tr>
          <th className="px-6 py-3 text-center">Nombres</th>
          <th className="px-6 py-3 text-center">Correo</th>
          <th className="px-6 py-3 text-center">Cargo</th>
          <th className="px-6 py-3 text-center">Título</th>
          <th className="px-6 py-3 text-center">Foto</th>
          <th className="px-6 py-3 text-center">Publicaciones</th>
          <th className="px-6 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className="bg-white border-b border-gray-200">
            <td colSpan="7" className="py-3 text-center text-gray-500">
              SIN REGISTROS
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr
              key={item.IdPersona}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="py-3 text-center">{item.NombreCompleto}</td>
              <td className="py-3 text-center">{item.Correo}</td>
              <td className="py-3 text-center">{item.Cargo}</td>
              <td className="py-3 text-center">{item.Titulo}</td>
              <td className="py-3 text-center">
                <button
                  onClick={() =>
                    openImagenModal(`http://localhost:8000/${item.Foto}`)
                  }
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                >
                  Ver imagen
                </button>
              </td>

              {/* Publicaciones */}
              <td className="py-3 text-center">
                {item.publicaciones && item.publicaciones.length > 0 ? (
                  <button
                    onClick={() => openTablePublicacionesModal(item.publicaciones)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-2 py-2 rounded"
                  >
                    Ver publicaciones
                  </button>
                ) : (
                  <span className="text-gray-500">Sin publicaciones</span>
                )}
              </td>

              {/* Acciones */}
              <td className="py-3 text-center align-middle">
                <div className="flex gap-2 justify-center items-center">
                  <button
                    onClick={() => openEditModal(item)}
                    className="bg-[#262D73] hover:bg-[#36395d] text-white px-3 py-2 rounded transition-colors"
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.IdPersona)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition-colors"
                    title="Eliminar"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

TableOrganizacion.propTypes = {
  data: PropTypes.array.isRequired,
  openTablePublicacionesModal: PropTypes.func.isRequired,
  openImagenModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default TableOrganizacion;


