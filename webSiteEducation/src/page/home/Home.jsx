import HeaderHome from "../../components/HeaderHome";
import Footer from "../../components/Footer";
import InfoMediaSection from "../../components/InfoMediaSection";
import CardSlider from "../../components/CardSlider";

const Home = () => {
  const cards = [
    { title: "Card 1", content: "Contenido del card 1" },
    { title: "Card 2", content: "Contenido del card 2" },
    { title: "Card 3", content: "Contenido del card 3" },
    { title: "Card 4", content: "Contenido del card 4" },
    { title: "Card 5", content: "Contenido del card 5" },
    { title: "Card 6", content: "Contenido del card 6" },
  ];
  return (
    <>
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
            <h2 className="font-bold text-xl text-[#262D73]">Mision</h2>
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
            <h2 className="font-bold text-xl text-[#262D73]">Vision</h2>
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

      <div className="">
        <CardSlider cards={cards} />
      </div>
      <Footer />
    </>
  );
};

export default Home;
