import { useState, useEffect } from "react";
import axios from "axios";
import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import InfoMediaSection from "../../components/InfoMediaSection";
import CardSlider from "../../components/CardSlider";
import TopButton from "../../components/TopButton";
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

  return (
    <>
      <TopButton />
      <HeaderHome />
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

      <section className="bg-[url('../src/assets/fondoSection.png')] h-auto bg-cover bg-center bg-no-repeat w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-24 py-12">
          <div>
            <h2 className="font-bold text-xl text-[#262D73]">Misión</h2>
            <p className="text-white text-base pt-3">
              Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat
              vivamus fringilla ultricies, nec per dignissim nullam aliquam.
              Cras faucibus sociosqu placerat euismod urna tempor integer
              nascetur metus nunc mattis duis viverra, accumsan est in curae dui
              vehicula hendrerit ut senectus facilisis tortor. Purus posuere
              urna tristique nibh sem proin quam habitant suscipit, a libero
              vehicula lacus fusce vivamus arcu.
            </p>
          </div>
          <div>
            <h2 className="font-bold text-xl text-[#262D73]">Visión</h2>
            <p className="text-white text-base pt-3">
              Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat
              vivamus fringilla ultricies, nec per dignissim nullam aliquam.
              Cras faucibus sociosqu placerat euismod urna tempor integer
              nascetur metus nunc mattis duis viverra, accumsan est in curae dui
              vehicula hendrerit ut senectus facilisis tortor. Purus posuere
              urna tristique nibh sem proin quam habitant suscipit, a libero
              vehicula lacus fusce vivamus arcu.
            </p>
          </div>
        </div>
      </section>

      {/* Se pasa la data obtenida a CardSlider */}
      <CardSlider title="Noticias" data={data} loading={loading} />

      <Footer />
    </>
  );
};

export default Home;
