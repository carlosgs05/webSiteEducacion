import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Slider from "./Slider";

const HeaderHome = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (window.initFlowbite) {
      window.initFlowbite();
    }

    fetch("https://pagina-educacion-backend-production.up.railway.app/api/imagenesHomeCarrusel")
      .then((response) => response.json())
      .then((data) => {
        const headerImages = data.map((item) => item);
        setImages(headerImages);
      })
      .catch((error) => {
        console.error("Error al recuperar las imágenes:", error);
      });
  }, []);

  return (
    <header className="relative h-72 sm:h-96 md:h-[500px] transition-all duration-500 ease-in-out">
      <Slider images={images} />
      <Navbar />
    </header>
  );
};
export default HeaderHome;
