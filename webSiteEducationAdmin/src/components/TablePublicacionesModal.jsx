import React from "react";
import PropTypes from "prop-types";
import ModalPortal from "./ModalPortal";
import { FaTimes } from "react-icons/fa";

const TablePublicacionesModal = ({ publicaciones, onClose }) => {
  return (
    <ModalPortal>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-5 overflow-y-auto max-h-screen">
          {/* Botón para cerrar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
          <h2 className="text-xl text-center font-semibold mb-4">Publicaciones</h2>
          {publicaciones && publicaciones.length > 0 ? (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-white uppercase bg-[#5c5c5c]">
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Título</th>
                  <th className="px-4 py-2">URL</th>
                </tr>
              </thead>
              <tbody>
                {publicaciones.map((pub, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{pub.Titulo || pub.titulo}</td>
                    <td className="px-4 py-2">{pub.Url || pub.url}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">Sin publicaciones</p>
          )}
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

