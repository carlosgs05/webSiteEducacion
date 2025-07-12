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

  // Fetch the news data from the API
  const fetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://pagina-educacion-backend-production.up.railway.app/api/noticias"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  // Intersection Observer hooks
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

      {/* Info Section with Media */}
      <InfoMediaSection
        title="Presentación"
        content="
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fringilla ultricies.
                "
        media="https://www.youtube.com/embed/2pqfLDEoVK4?si=5QaHOZTKUvFfIPkl"
        mediaType="video"
        mediaPosition="right"
      />

      {/* Misión and Visión Section */}
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium cumque dignissimos tempore obcaecati velit, enim,
              repellendus similique, facere itaque nam dolorum officiis expedita
              accusamus? Delectus consequatur neque incidunt eligendi assumenda.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-xl text-[#262D73]">Visión</h2>
            <p className="text-white text-base pt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
              harum quasi neque aliquid aspernatur facere saepe repellendus
              ducimus minima tenetur eligendi commodi corrupti necessitatibus
              assumenda laudantium? Amet est omnis quis?
            </p>
          </div>
        </div>
      </section>

      {/* Card Slider for News */}
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

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
