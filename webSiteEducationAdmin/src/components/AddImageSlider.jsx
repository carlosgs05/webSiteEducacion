// src/components/AddImageSlider.jsx
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const AddImageSlider = ({
  initialImages = [],
  onImagesChange,
  isEditing = true,
}) => {
  const [images, setImages] = useState(
    initialImages.map((img) => ({
      preview: `https://pagina-educacion-backend-production.up.railway.app/${img}`,
      name: img,
      file: null,
    }))
  );
  const MAX_IMAGES = 6;
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImages(
      initialImages.map((img) => ({
        preview: `https://pagina-educacion-backend-production.up.railway.app/${img}`,
        name: img,
        file: null,
      }))
    );
  }, [initialImages]);

  useEffect(() => {
    if (onImagesChange) {
      onImagesChange(images);
    }
  }, [images, onImagesChange]);

  const handleButtonClick = () => {
    if (images.length < MAX_IMAGES) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const newImage = {
        preview: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
      setImages((prev) => [...prev, newImage]);
    }
    e.target.value = "";
  };

  const handleAddDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/") && images.length < MAX_IMAGES) {
      const newImage = {
        preview: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
      setImages((prev) => [...prev, newImage]);
    }
  };

  const handleReplaceImage = (index, e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const updatedImage = {
        preview: URL.createObjectURL(file),
        name: file.name,
        file: file,
      };
      setImages((prev) =>
        prev.map((img, i) => (i === index ? updatedImage : img))
      );
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-full max-w-md aspect-video bg-gray-100 rounded-lg shadow-md overflow-hidden"
            onDrop={(e) => handleReplaceImage(index, e)}
            onDragOver={handleDragOver}
          >
            <img
              src={image.preview}
              alt={`Imagen-${index}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {isEditing && (
              <button
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition cursor-pointer"
                onClick={() => handleRemoveImage(index)}
                type="button"
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 
                       21H7.862a2 2 0 01-1.995-1.858L5 
                       7m5 4v6m4-6v6m1-10V5a2 2 0 
                       00-2-2H9a2 2 0 00-2 2v2m3 
                       0h4"
                  />
                </svg>
              </button>
            )}
          </div>
        ))}

        {isEditing && (
          <button
            className="w-full max-w-md aspect-video border-2 border-dashed border-gray-300 flex flex-col items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            onClick={handleButtonClick}
            onDrop={handleAddDrop}
            onDragOver={handleDragOver}
            disabled={images.length >= MAX_IMAGES}
            type="button"
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
            <span className="text-sm text-center">
              Haz clic para seleccionar una imagen
              <br />o arrastra y suelta aquí
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

AddImageSlider.propTypes = {
  initialImages: PropTypes.array,
  onImagesChange: PropTypes.func,
  isEditing: PropTypes.bool,
};

export default AddImageSlider;
