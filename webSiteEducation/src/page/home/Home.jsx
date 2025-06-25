import { useState, useEffect } from "react";
import axios from "axios";
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import InfoMediaSection from "../../components/InfoMediaSection";
import CardSlider from "../../components/CardSlider";
import TopButton from "../../components/TopButton";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/api/noticias");
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);
  const { ref, inView } = useInView({
    triggerOnce: false,
  });
  const { ref: sliderRef, inView: sliderInView } = useInView({
    triggerOnce: false,
  });
  return (
    <>
      <TopButton />
      <HeaderHome />

      <InfoMediaSection
        title="Presentación"
        content="
        ¡Bienvenidos a la Carrera de Educación Inicial! En este espacio educativo, 
        nos sumergiremos en las maravillosas dimensiones de la formación temprana. 
        Prepárate para iniciar un viaje significativo donde desarrollarás habilidades 
        esenciales y descubrirás el impacto transformador de guiar los primeros pasos 
        en el aprendizaje. Estamos emocionados de ser parte de tu travesía educativa, 
        impulsando tu crecimiento y contribuyendo al desarrollo integral de los más pequeños. 
        ¡Empecemos este camino hacia un futuro lleno de descubrimientos y aprendizaje!
        "
        media="https://www.youtube.com/embed/Kem4_phe6Xc"
        mediaType="video"
        mediaPosition="right"
      />

      <section
        ref={ref}
        className={`transition-all duration-1000 ${
          inView ? "translate-y-0" : "opacity-0 translate-y-10"
        } bg-[url('../src/assets/fondoSection.png')] h-auto bg-cover bg-center bg-no-repeat w-full`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-12 px-4 sm:px-6 md:px-24">
          <div>
            <h2 className="font-bold text-xl text-[#262D73]">Misión</h2>
            <p className="text-white text-base pt-3">
            Somos una unidad académica profesional, formamos profesionales competentes en la educación infantil,
            con calidad humana, con capacidades, habilidades y actitudes; desarrollamos investigación científica,
            responsabilidad social y una adecuada gestión educativa, para el desarrollo sostenible de la localidad, la
            región y el país.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-xl text-[#262D73]">Visión</h2>
            <p className="text-white text-base pt-3">
              Al 2025, líder y acreditada a nivel nacional e internacional, reconocida por su calidad, por su vocación
              democrática, por la formación de profesionales en la educación infantil, la investigación científica y
              responsabilidad social; manteniendo vínculos con los grupos de interés y contribuyendo al desarrollo local,
              regional y nacional
            </p>
          </div>
        </div>
      </section>

      <div
        ref={sliderRef}
        className={`transition-all duration-1000 ease-out ${
          sliderInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <CardSlider title="Noticias" data={data} loading={loading} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
