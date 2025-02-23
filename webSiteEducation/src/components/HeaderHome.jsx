import Navbar from './Navbar';
import { useEffect, useState } from "react";
import Slider from './Slider';

const HeaderHome = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (window.initFlowbite) {
      window.initFlowbite();
    }

    // Reemplaza la URL con la de tu API
    fetch('http://localhost:8000/api/imagenesHomeCarrusel')
      .then(response => response.json())
      .then(data => {
        // Se asume que "data" es un arreglo de objetos y que cada objeto tiene el atributo "imagen"
        const headerImages = data.map(item => item.imagen);
        setImages(headerImages);
      })
      .catch(error => {
        console.error('Error al recuperar las imágenes:', error);
      });
  }, []);

  return (
    <header className="relative h-72 sm:h-96 md:h-[500px] transition-all duration-500 ease-in-out">
      <Slider images={images}/>
      <Navbar/>
    </header>
  );
};

export default HeaderHome;
