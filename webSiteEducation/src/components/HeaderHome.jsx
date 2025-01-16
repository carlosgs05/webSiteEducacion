import Navbar from './Navbar';
import { useEffect } from "react";
import Slider from './Slider';

const HeaderHome = () => {
    useEffect(() => {
        // Asegúrate de que Flowbite se inicialice
        if (window.initFlowbite) {
          window.initFlowbite();
        }
      }, []); // Se ejecuta al montar el componente
  return (
    <header className="relative h-72 sm:h-96 md:h-[500px] transition-all duration-500 ease-in-out"> {/* Definir altura explícita */}
      <Slider/>
      <Navbar/>
    </header>
  );
};

export default HeaderHome;


