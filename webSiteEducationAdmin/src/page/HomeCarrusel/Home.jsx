// src/pages/Home.jsx
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
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://pagina-educacion-backend-production.up.railway.app/api/imagenesHomeCarrusel"
      );
      const images = response.data.map((item) => item.Imagen);
      setDbImages(images);
      // Reset child state when re-fetching
      setImagesState([]);
    } catch (error) {
      console.error("Error al recuperar las imágenes:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImagesChange = (imagesArray) => {
    setImagesState(imagesArray);
  };

  const handleGuardar = async () => {
    if (imagesState.length < 2) {
      swal("Error", "Debe haber mínimo 2 imágenes", "error");
      return;
    }

    const formData = new FormData();
    const existingImages = [];

    imagesState.forEach((img) => {
      if (img.file) {
        formData.append("newImages[]", img.file);
      } else {
        existingImages.push(img.name);
      }
    });
    formData.append("existingImages", JSON.stringify(existingImages));

    try {
      setUploading(true);
      setProgress(0);
      
      // Simular progreso cada 100ms
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 98) {
            clearInterval(interval);
            return prev;
          }
          return prev + 2;
        });
      }, 100);

      const response = await axios.post(
        "https://pagina-educacion-backend-production.up.railway.app/api/storeImagenesCarrusel",
        formData
      );
      
      // Completar la barra de progreso
      clearInterval(interval);
      setProgress(100);
      
      // Esperar un momento para mostrar el 100%
      setTimeout(() => {
        setUploading(false);
        swal("Éxito", response.data.message, "success").then(() => {
          window.location.reload();
        });
      }, 500);
    } catch (error) {
      console.error("Error al guardar las imágenes:", error);
      setUploading(false);
      swal("Error", "Hubo un error al guardar las imágenes", "error");
    }
  };

  const handleCancelar = () => {
    setIsEditing(false);
    fetchImages();
  };

  return (
    <Layout>
      <div className="p-4">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-2xl text-center font-bold text-blue-800">
            IMÁGENES DEL CARRUSEL
          </h1>
          <h3 className="text-base">
            Agregar las imágenes que se mostrarán en la página principal
          </h3>
        </div>

        {loading ? (
          <LoadingIndicator />
        ) : (
          <div className="py-8">
            <AddImageSlider
              initialImages={dbImages}
              onImagesChange={handleImagesChange}
              isEditing={isEditing}
            />

            {!isEditing ? (
              <div className="text-center mt-8">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-indigo-600 hover:underline font-medium cursor-pointer"
                  type="button"
                >
                  Editar imágenes
                </button>
              </div>
            ) : (
              <div className="flex justify-center gap-x-10 mt-6">
                <Button
                  name="Guardar"
                  bgColor="bg-[#262D73]"
                  onClick={handleGuardar}
                />
                <Button
                  name="Cancelar"
                  bgColor="bg-red-500"
                  onClick={handleCancelar}
                />
              </div>
            )}
          </div>
        )}
        
        {/* Modal de progreso */}
        {uploading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all">
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Subiendo imágenes</h3>
                <p className="text-sm text-gray-500 mb-6">Por favor, espere mientras se guardan los cambios</p>
                
                {/* Barra de progreso con gradiente moderno */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                
                {/* Indicador numérico */}
                <div className="w-full flex justify-between px-1">
                  <span className="text-xs font-medium text-blue-600">0%</span>
                  <span className="text-xs font-medium text-blue-600">{progress}%</span>
                  <span className="text-xs font-medium text-blue-600">100%</span>
                </div>
                
                {/* Indicador de carga animado */}
                <div className="mt-4 flex space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;