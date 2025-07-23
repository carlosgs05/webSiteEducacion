import PropTypes from "prop-types";
import ModalPortal from "./ModalPortal";
import { X } from "lucide-react";

const TablePublicacionesModal = ({ publicaciones, onClose }) => {
  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-[#545454] p-4">
            <h2 className="text-xl font-semibold text-white">Publicaciones asociadas</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-red-300 transition-colors duration-200 p-1 rounded-full hover:bg-white/10 cursor-pointer"
              title="Cerrar"
            >
              <X size={24} />
            </button>
          </div>

          {/* Contenido */}
          <div className="p-4 overflow-y-auto flex-1">
            {publicaciones && publicaciones.length > 0 ? (
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr className="h-12">
                      <th className="px-4 text-left font-medium text-gray-700">#</th>
                      <th className="px-4 text-left font-medium text-gray-700">Título</th>
                      <th className="px-4 text-left font-medium text-gray-700">URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publicaciones.map((pub, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-gray-100 ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100 transition-colors duration-150`}
                      >
                        <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {pub.Titulo || pub.titulo || "Sin título"}
                        </td>
                        <td className="px-4 py-3">
                          {pub.Url || pub.url ? (
                            <a 
                              href={pub.Url || pub.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer break-all"
                            >
                              {pub.Url || pub.url}
                            </a>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-700 mb-1">Sin publicaciones</h3>
                <p className="text-gray-500">No hay publicaciones asociadas a este registro</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

TablePublicacionesModal.propTypes = {
  publicaciones: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TablePublicacionesModal;