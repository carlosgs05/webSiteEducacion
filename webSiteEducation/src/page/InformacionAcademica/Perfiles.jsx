import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import InfoMediaSection from "../../components/InfoMediaSection";
import TopButton from "../../components/TopButton";

const Perfiles = () => {
 
  return (
    <>
      <TopButton />
      <Header tittle="Perfiles" />
      <section>
        <div className="m-10 md:m-16">
          <Button
            name=" Ver Malla Curricular"
            link="/informacionAcademica/mallaCurricular"
          />
        </div>

        <div>
          <InfoMediaSection
            title="Perfil del ingresante"
            content="Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat vivamus fringilla ultricies, nec per dignissim nullam aliquam. Cras faucibus sociosqu placerat euismod urna tempor integer nascetur metus nunc mattis duis viverra, accumsan est in curae dui vehicula hendrerit ut senectus facilisis tortor. Purus posuere urna tristique nibh sem proin quam habitant suscipit, a libero vehicula lacus fusce vivamus arcu."
            media="../src/assets/perfil1.png"
            mediaType="image"
            mediaPosition="left"
          />
        </div>
        <div>
          <InfoMediaSection
            title="Perfil del egresado"
            content="Lorem ipsum dolor sit amet consectetur adipiscing, elit feugiat vivamus fringilla ultricies, nec per dignissim nullam aliquam. Cras faucibus sociosqu placerat euismod urna tempor integer nascetur metus nunc mattis duis viverra, accumsan est in curae dui vehicula hendrerit ut senectus facilisis tortor. Purus posuere urna tristique nibh sem proin quam habitant suscipit, a libero vehicula lacus fusce vivamus arcu."
            media="../src/assets/perfil1.png"
            mediaType="image"
            mediaPosition="right"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Perfiles;
