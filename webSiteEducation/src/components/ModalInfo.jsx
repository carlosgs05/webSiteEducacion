import PropTypes from "prop-types";

const ModalInfo = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-3/5 p-6 rounded-lg shadow-lg flex relative">  {/* Agregado "relative" aquí */}

                {/* Imagen de perfil */}
                <div className="w-1/3 flex items-center justify-center">
                    <img src={`http://127.0.0.1:8000/${data.Foto}`} alt={data.NombreCompleto} className="rounded-lg w-full" />
                </div>

                {/* Contenido del modal */}
                <div className="w-2/3 p-4">
                    {/* Botón para cerrar */}
                    <button
                        className="absolute top-4 right-4 text-gray-600 text-xl hover:text-red-600"
                        onClick={onClose}
                    >X
                    </button>

                    <h3 className="text-xl font-bold text-blue-900 border-b pb-2">Nombres Apellidos: {data.NombreCompleto}</h3>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">Correo: {data.Correo}</h3>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-1">Título:</h3>
                        <p>
                            {data.Titulo}
                        </p>
                    </div>

                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-blue-900 border-b pb-1">Publicaciones</h3>
                        <table className="w-full mt-2 border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-300 p-2">Título</th>
                                    <th className="border border-gray-300 p-2">URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.publicaciones.length > 0 ? (
                                    data.publicaciones.map((pub, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border border-gray-300 p-2">{pub.Titulo}</td>
                                            <td className="border border-gray-300 p-2">
                                                <a href={pub.Url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                                    Ver publicación
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="text-center p-2">No hay publicaciones disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalInfo.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
};
export default ModalInfo;