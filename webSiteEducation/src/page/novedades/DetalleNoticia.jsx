import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Slider from "../../components/Slider";
import ListaNoticias from "../../components/ListaNoticias";
import axios from "axios";

const DetalleNoticia = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/showNoticia/${id}`
        );

        if (!response.ok) {
          throw new Error("Error al obtener la noticia");
        }
        const noticia = await response.json();
        setNoticia(noticia);
        console.log("Noticia:", noticia);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  const [data, setData] = useState([]);

  const fetchNoticias = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/noticiasActuales"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  if (loading) return <p>Cargando noticia...</p>;
  if (!noticia) return <p>Noticia no encontrada</p>;

  return (
    <>
      <Header
        tittle="Noticias" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5 px-8 py-8">
        <div className="grid col-span-2 p-4">
          <p className="text-gray-500 text-sm">{noticia.Fecha}</p>
          <h1 className="text-2xl font-bold text-[#262D73] mt-2">
            {noticia.Titulo || noticia.Nombre}
          </h1>
          {noticia.Encabezado && (
            <h3 className="text-gray-700 text-xl my-4">{noticia.Encabezado}</h3>
          )}
          <div className="relative h-72 sm:h-96 md:h-[300px] transition-all duration-500 ease-in-out">
            <Slider images={noticia.imagenes} />
          </div>

          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: noticia.Descripcion }}
          />
        </div>
        <div className="pt-4">
          <ListaNoticias data={data} />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default DetalleNoticia;
