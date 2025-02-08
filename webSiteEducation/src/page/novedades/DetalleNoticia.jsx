import { useParams } from "react-router";
import Slider from "../../components/Slider";
import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ListaNoticias from "../../components/ListaNoticias";
const noticias = [
  {
    id: 1,
    imagenes: [
      "/assets/noticia1.jpeg",
      "/assets/noticia2.jpeg",
      "/assets/noticia3.jpeg",
    ],
    titulo:
      "Presentación del Programa Korea Smart Manufacturing Office de Corea del Sur en la UNI",
    fecha: "SEPTIEMBRE 12, 2024",
    encabezado:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat vivamus fringilla ultricies.",
    descripcion:
      "Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat vivamus fringilla ultricies, nec per dignissim nullam aliquam. Cras faucibus sociosqu placerat euismod urna tempor integer nascetur metus nunc mattis duis viverra, accumsan est in curae dui vulputate hendrerit ut senectus facilisis tortor. Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat vivamus fringilla ultricies, nec per dignissim nullam aliquam. Cras faucibus sociosqu placerat euismod urna tempor integer nascetur metus nunc mattis duis viverra, accumsan est in curae dui vulputate hendrerit ut senectus facilisis tortor.",

      url: "/novedades/noticia/1",
  },
  {
    id: 2,
    imagenes: [
      "/assets/noticia1.jpeg",
      "/assets/noticia2.jpeg",
      "/assets/noticia3.jpeg",
    ],
    titulo:
      "Ingresante a la carrera de Mecánica Eléctrica ocupa el primer puesto en el examen de...",
    fecha: "SEPTIEMBRE 11, 2024",
    url: "/novedades/noticia/2",
  },
  {
    id: 3,
    imagenes: [
      "/assets/noticia1.jpeg",
      "/assets/noticia2.jpeg",
      "/assets/noticia3.jpeg",
    ],
    titulo: "La FIM inaugura Sala de Profesores Antonio Arévalo Dueñas",
    fecha: "SEPTIEMBRE 10, 2024",
    url: "/novedades/noticia/3",
  },
  {
    id: 4,
    imagenes: [
      "/assets/noticia1.jpeg",
      "/assets/noticia2.jpeg",
      "/assets/noticia3.jpeg",
    ],
    titulo: "Nueva tecnología aplicada en la UNI",
    fecha: "SEPTIEMBRE 09, 2024",
    url: "/novedades/noticia/4",
  },
  {
    id: 5,
    imagenes: [
      "/assets/noticia1.jpeg",
      "/assets/noticia2.jpeg",
      "/assets/noticia3.jpeg",
    ],
    titulo: "Evento de innovación tecnológica en la universidad",
    fecha: "SEPTIEMBRE 08, 2024",
    url: "/novedades/noticia/5",
  },
  {
    id: 6,
    imagenes: [
      "/assets/noticia1.jpeg",
      "/assets/noticia2.jpeg",
      "/assets/noticia3.jpeg",
    ],
    titulo: "Evento de innovación tecnológica en la universidad",
    fecha: "SEPTIEMBRE 08, 2024",
    url: "/novedades/noticia/6",
  },
  
];
const DetalleNoticia = () => {
  useEffect(() => {
    if (window.initFlowbite) {
      window.initFlowbite();
    }
  }, []);

  const { id } = useParams();
  const noticia = noticias.find((n) => n.id === Number(id));

  if (!noticia) return <p>Noticia no encontrada</p>;

  return (
    <>
      <Header />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 px-8 py-8">
      <div className="grid col-span-2 p-4">
        <p className="text-gray-500 text-sm">{noticia.fecha}</p>
        <h1 className="text-2xl font-bold text-blue-600 mt-2">
          {noticia.titulo}
        </h1>
        <h3 className="text-gray-700 text-xl my-4">{noticia.encabezado}</h3>
        <div className="relative h-72 sm:h-96 md:h-[300px] transition-all duration-500 ease-in-out">
                    <Slider images={noticia.imagenes} />
        </div>
        <p className="text-gray-700 mt-4">{noticia.descripcion}</p>
      </div>
      <div className="">
        <ListaNoticias />   
      </div>
      </section>
    
     <Footer/>
    </>);
};

export default DetalleNoticia;
