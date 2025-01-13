
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
    <header className="relative h-[500px]"> {/* Definir altura explícita */}
      <Slider/>
      <Navbar/>
    </header>
  );
};

export default HeaderHome;


