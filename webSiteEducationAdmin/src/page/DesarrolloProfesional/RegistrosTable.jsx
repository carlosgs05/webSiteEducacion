import { FaEdit, FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";

const RegistrosTable = ({
  data,
  openDescripcionModal,
  openImagenModal,
  openEditModal,
  handleDelete,
}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right">
      <thead className="text-xs text-white uppercase bg-[#545454]">
        <tr>
          <th className="px-6 py-3 text-center">Descripción</th>
          <th className="px-6 py-3 text-center">Imagen</th>
          <th className="px-6 py-3 text-center">URL</th>
          <th className="px-6 py-3 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr className="bg-white border-b border-gray-200">
            <td colSpan="4" className="py-3 text-center text-gray-500">
              SIN REGISTROS
            </td>
          </tr>
        ) : (
          data.map((item, index) => (
            <tr
              key={item.IdDesarrollo}
              className={`border-b border-gray-200 hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="py-3 text-center">
                <button
                  onClick={() => openDescripcionModal(item.Descripcion)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                >
                  Ver descripción
                </button>
              </td>
              <td className="py-3 text-center">
                <button
                  onClick={() =>
                    openImagenModal(`https://pagina-educacion-backend-production.up.railway.app/${item.Imagen}`)
                  }
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-2 py-2 rounded"
                >
                  Ver imagen
                </button>
              </td>
              <td className="py-3 text-black text-center">
                <a
                  href={item.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {item.Url}
                </a>
              </td>
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
                    onClick={() => handleDelete(item.IdDesarrollo)}
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

RegistrosTable.propTypes = {
  data: PropTypes.array.isRequired,
  openDescripcionModal: PropTypes.func.isRequired,
  openImagenModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default RegistrosTable;
