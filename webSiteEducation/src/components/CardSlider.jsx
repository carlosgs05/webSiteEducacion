// import PropTypes from "prop-types";
// import { useState } from "react";

// const CardSlider = ({ cards }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? cards.length - 1 : prevIndex - 1
//     );
//   };

//   const getTransformValue = () => {
//     // Ajustar el desplazamiento en función del índice actual
//     return `translateX(-${currentIndex * (100 / 3)}%)`;
//   };

//   return (
//     <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
//       {/* Contenedor de los cards */}
//       <div
//         className="flex transition-transform duration-500 ease-in-out"
//         style={{
//           width: `${(cards.length / 3) * 100}%`,
//           transform: getTransformValue(),
//         }}
//       >
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-1/3 h-full bg-white shadow-md rounded-lg flex flex-col items-center justify-center mx-2"
//           >
//             <h2 className="text-lg font-bold">{card.title}</h2>
//             <p>{card.content}</p>
//           </div>
//         ))}
//       </div>

//       {/* Botones de navegación */}
//       <button
//         onClick={handlePrev}
//         className="absolute left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Anterior
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Siguiente
//       </button>
//     </div>
//   );
// };

// CardSlider.propTypes = {
//   cards: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       content: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };

// export default CardSlider;
import PropTypes from "prop-types";
import { useState } from "react";

const CardSlider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCardsCount = 3; // Número de tarjetas visibles

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Contenedor principal */}
      <div className="flex gap-4 w-3/4 justify-center items-center overflow-hidden relative">
        {/* Cards */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (100 / visibleCardsCount) * currentIndex
            }%)`,
            width: `${(cards.length / visibleCardsCount) * 100}%`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-1/3 h-full bg-white shadow-md rounded-lg flex flex-col items-center justify-center"
            >
              <h2 className="text-lg font-bold">{card.title}</h2>
              <p>{card.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Botones */}
      <button
        onClick={handlePrev}
        className="absolute left-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 z-10"
        style={{ transform: "translateX(-50%)" }}
      >
        Anterior
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 z-10"
        style={{ transform: "translateX(50%)" }}
      >
        Siguiente
      </button>
    </div>
  );
};

CardSlider.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CardSlider;


