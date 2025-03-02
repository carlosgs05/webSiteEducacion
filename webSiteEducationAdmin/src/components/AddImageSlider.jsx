import React, { useState, useRef, useEffect } from 'react';
import propTypes from 'prop-types';
const AddImageSlider = ({ initialImages = [], onImagesChange }) => {
  // Inicializamos el state con las imágenes iniciales (las que vienen del backend)
  // Se asume que estas imágenes ya se encuentran en public/imagenes.
  const [images, setImages] = useState(
    initialImages.map(img => ({
      preview: `http://127.0.0.1:8000/imagenes/${img}`,
      name: img,
      file: null,
    }))
  );
  const MAX_IMAGES = 6;
  const fileInputRef = useRef(null);

  // Sincroniza el state cuando cambie initialImages
  useEffect(() => {
    setImages(
      initialImages.map(img => ({
        preview: `http://127.0.0.1:8000/imagenes/${img}`,
        name: img,
        file: null,
      }))
    );
  }, [initialImages]);

  // Notifica al componente padre cada vez que se actualiza el state.
  // Se envía el array completo de objetos { preview, name, file }
  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  }, [images, onImagesChange]);

  // Abre el input file al hacer click en el botón
  const handleButtonClick = () => {
    if (images.length < MAX_IMAGES) {
      fileInputRef.current.click();
    }
  };

  // Al seleccionar un archivo desde el input, se crea un preview y se guarda el objeto file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = {
        preview: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
      setImages(prev => [...prev, newImage]);
    }
  };

  // Maneja el evento de drop para arrastrar y soltar archivos
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const newImage = {
        preview: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
      setImages(prev => [...prev, newImage]);
    }
  };

  // Evita el comportamiento por defecto cuando se arrastra sobre el área
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      {/* Input file oculto */}
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={image.preview}
              alt={`Imagen-${index}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition cursor-pointer"
              onClick={() => handleRemoveImage(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 
                     4v6m4-6v6m1-10V5a2 2 0 00-2-2H9a2 2 0 
                     00-2 2v2m3 0h4"
                />
              </svg>
            </button>
          </div>
        ))}

        {/* Botón para agregar imagen con funcionalidad drag & drop */}
        <button
          className="w-full max-w-md aspect-video border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          onClick={handleButtonClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          disabled={images.length >= MAX_IMAGES}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mb-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span className="text-base font-medium text-center">
            Agregar imagen
            <br />
            o arrastrar y soltar
          </span>
        </button>
      </div>
    </div>
  );
};

AddImageSlider.propTypes = {
  initialImages: propTypes.array,
  onImagesChange: propTypes.func,
};

export default AddImageSlider;