import Navbar from './Navbar';
import { useEffect } from "react";
import Slider from './Slider';

const HeaderHome = () => {
    useEffect(() => {
        if (window.initFlowbite) {
          window.initFlowbite();
        }
      }, []);
      const images = [
        "../src/assets/fondo_header.png",
        "../src/assets/fondo_header.png",
        "../src/assets/fondo_header.png",
        "../src/assets/fondo_header.png",

      ];
  return (
    <header className="relative h-72 sm:h-96 md:h-[500px] transition-all duration-500 ease-in-out"> {/* Definir altura explícita */}
      <Slider 
        images={images}/>
      <Navbar/>
    </header>
  );
};

export default HeaderHome;


