import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import AddImageSlider from "../../components/AddImageSlider";
import Button from "../../components/Button";
import swal from "sweetalert";
import LoadingIndicator from "../../components/LoadingIndicator";

const Home = () => {
  const [dbImages, setDbImages] = useState([]);
  const [imagesState, setImagesState] = useState([]); // { preview, name, file }
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/imagenesHomeCarrusel");
      // Suponiendo que response.data es un arreglo de objetos con el atributo "imagen"
      const images = response.data.map((item) => item.imagen);
      setDbImages(images);
    } catch (error) {
      console.error("Error al recuperar las imágenes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Recibe el array completo de objetos { preview, name, file } del hijo
  const handleImagesChange = (imagesArray) => {
    setImagesState(imagesArray);
  };

  const handleGuardar = async () => {
    // Validar que haya mínimo 2 imágenes
    if (imagesState.length < 2) {
      swal("Error", "Debe haber mínimo 2 imágenes", "error");
      return;
    }

    const formData = new FormData();
    const existingImages = [];

    imagesState.forEach((img) => {
      if (img.file) {
        // Imagen nueva
        formData.append("newImages[]", img.file);
      } else {
        // Imagen ya existente
        existingImages.push(img.name);
      }
    });
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      const response = await axios.post(
        "http://localhost:8000/api/storeImagenesCarrusel",
        formData
      );
      swal("Éxito", response.data.message, "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error al guardar las imágenes:", error);
      swal("Error", "Hubo un error al guardar las imágenes", "error");
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-xl text-center font-medium">IMÁGENES DEL CARRUSEL</h1>
          <h3 className="text-base">
            Agregar las imágenes que se mostrarán en la página principal
          </h3>
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <div>
            <div className="py-8">
              <AddImageSlider
                initialImages={dbImages}
                onImagesChange={handleImagesChange}
              />
            </div>
            <div className="flex justify-center gap-x-10">
              <Button name="Guardar" bgColor="bg-[#262D73]" onClick={handleGuardar} />
              <Button name="Cancelar" bgColor="bg-red-500" link="/" />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
