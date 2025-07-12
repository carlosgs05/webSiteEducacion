import { useState } from "react";
import PropTypes from "prop-types";
import ModalInfo from "./ModalInfo";
import { useInView } from "react-intersection-observer";

const CardOrganization = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <>
      <div
        ref={ref}
        className={`w-full max-w-xs mx-auto text-center p-4 transform transition-all duration-1000 ease-out
          ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        {/* Foto con aspect-ratio 1:1 */}
        <div
          className="relative w-full aspect-square overflow-hidden rounded-md shadow-lg group
                     transition-transform duration-500 ease-in-out hover:scale-105"
        >
          <img
            src={`https://pagina-educacion-backend-production.up.railway.app/${data.Foto}`}
            alt={data.NombreCompleto}
            className="absolute inset-0 w-full h-full object-cover group-hover:brightness-90 transition duration-500"
          />
          {/* Botón de "+" */}
          <button
            onClick={() => setIsOpen(true)}
            className="absolute bottom-2 right-2 flex items-center justify-center
                       w-8 h-8 sm:w-10 sm:h-10 text-xl sm:text-2xl font-bold
                       bg-[#E4BCD3] text-[#262D73] rounded-full shadow-md
                       transition-transform duration-200 hover:scale-110"
          >
            +
          </button>
        </div>

        {/* Nombre y Cargo */}
        <div className="mt-4">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[#262D73]">
            {data.NombreCompleto}
          </h3>
          <p className="text-sm sm:text-base text-[#545454] font-medium">
            {data.Cargo}
          </p>
        </div>
      </div>

      {/* Overlay de modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
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
  data: PropTypes.shape({
    Foto: PropTypes.string,
    NombreCompleto: PropTypes.string,
    Cargo: PropTypes.string,
  }).isRequired,
};

export default CardOrganization;
