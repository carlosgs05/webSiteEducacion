import { useState } from "react";
import ModalInfo from "./ModalInfo";
import { array } from "prop-types";

const CardOrganization = ({ data }) => {
  // Para trabajar el modal
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-64 text-center mx-auto">
        {/* Foto */}
        <div className="relative w-full h-64">
          <img
            src={`http://127.0.0.1:8000/${data.Foto}`}
            alt={data.NombreCompleto}
            className="w-full h-full object-cover rounded-md shadow-[6px_6px_10px_rgba(0,0,0,0.25)]"
          />
          {/* Botón de "+" */}
          <div
            className="absolute pb-1 -bottom-1 text-center -right-4 text-2xl w-10 h-10 font-bold bg-[#E4BCD3] text-[#262D73] flex items-center justify-center rounded-full shadow-md cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            +
          </div>
        </div>

        {/* Nombre y Cargo */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-[#262D73]">{data.NombreCompleto}</h3>
          <p className="text-[#545454] font-semibold">{data.Cargo}</p>
        </div>
      </div>

      {/* Fondo semitransparente cuando el modal está abierto */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <ModalInfo
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            data={data}
          />
        </div>
      )}
    </>
  );
};

CardOrganization.propTypes = {
  data: array.isRequired

};
export default CardOrganization;