import { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import AddImageSlider from "../../components/AddImageSlider";
import Button from "../../components/Button";
import swal from 'sweetalert';

const Home = () => {
    const [dbImages, setDbImages] = useState([]);
    const [imagesState, setImagesState] = useState([]); // arreglo de objetos { preview, name, file }

    useEffect(() => {
        // Reemplaza la URL con la de tu API
        fetch('http://localhost:8000/api/imagenesHomeCarrusel')
            .then(response => response.json())
            .then(data => {
                // Suponiendo que data es un arreglo de objetos con el atributo "imagen"
                const images = data.map(item => item.imagen);
                setDbImages(images);
            })
            .catch(error => {
                console.error('Error al recuperar las imágenes:', error);
            });
    }, []);

    // Recibe el array completo de objetos { preview, name, file } del hijo
    const handleImagesChange = (imagesArray) => {
        setImagesState(imagesArray);
    };

    const handleGuardar = () => {
        // Validar que haya mínimo 2 imágenes
        if (imagesState.length < 2) {
            swal("Error", "Debe haber mínimo 2 imágenes", "error");
            return;
        }

        // Creamos un FormData para enviar tanto los archivos nuevos como los nombres de imágenes existentes
        const formData = new FormData();
        const existingImages = [];

        imagesState.forEach(img => {
            if (img.file) {
                // Si la imagen tiene el objeto File, es una imagen nueva
                formData.append('newImages[]', img.file);
            } else {
                // Si no tiene file, se asume que es una imagen ya existente y se envía su nombre
                existingImages.push(img.name);
            }
        });
        formData.append('existingImages', JSON.stringify(existingImages));

        fetch('http://localhost:8000/api/storeImagenesCarrusel', {
            method: 'POST',
            body: formData
            // Al usar FormData, no es necesario definir el header 'Content-Type'
        })
            .then(response => response.json())
            .then(data => {
                swal("Éxito", data.message, "success")
                    .then(() => {
                        window.location.reload();
                    });
            })
            .catch(error => {
                console.error('Error al guardar las imágenes:', error);
                swal("Error", "Hubo un error al guardar las imágenes", "error");
            });
    };

    return (
        <Layout>
            <div className="flex flex-col gap-y-4">
                <h1 className="text-2xl text-center font-medium">IMÁGENES DEL CARRUSEL</h1>
                <h3 className='text-lg'>Agregar las imágenes que se mostrarán en la página principal</h3>
            </div>

            <div className="py-8">
                <AddImageSlider
                    initialImages={dbImages}
                    onImagesChange={handleImagesChange}
                />
            </div>

            <div className="flex justify-center gap-x-10">
                <Button
                    name="Guardar"
                    bgColor="bg-[#262D73]"
                    onClick={handleGuardar}
                />
                <Button
                    name="Cancelar"
                    bgColor="bg-red-500"
                    link="/"
                />
            </div>
        </Layout>
    );
};

export default Home;