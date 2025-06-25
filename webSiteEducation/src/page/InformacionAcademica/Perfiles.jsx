import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import InfoMediaSection from "../../components/InfoMediaSection";
import TopButton from "../../components/TopButton";

const Perfiles = () => {
  return (
    <>
      <TopButton />
      <Header title="Perfiles" />
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
            content={[
              "Utiliza conocimientos matemáticos para resolver problemas.",
              "Aplica conocimientos de ciencias sociales y tecnología.",
              "Muestra habilidades comunicativas en distintos contextos.",
              "Demuestra habilidades artísticas y motrices.",
            ]}
            media="../src/assets/perfil1.png"
            mediaType="image"
            mediaPosition="left"
          />
        </div>
        <div>
          <InfoMediaSection
            title="Perfil del egresado"
            content="El egresado de la Escuela profesional de educación inicial es un profesional competente, crítico,
              ético y de calidad, que gestiona los procesos de aprendizaje de los niños menores de 6 años,
              participa en la gestión de programas, proyectos y otros de atención infantil en forma articulada a
              la comunidad educativa para el logro de las competencias de EBR de educación inicial, demostrando
              compromiso e iniciativa, desarrollo del pensamiento crítico, capacidades comunicativas y
              pensamiento cuantitativo; en relación a su desarrollo personal y profesional, promoviendo la
              investigación que genere un conocimiento científico, tecnológico, humanístico e innovador y con
              responsabilidad a la diversidad cultural, social y desarrollo sostenible. Asimismo, investiga a partir
              de su práctica y experiencia pedagógica que respondan a la problemática de región de La Libertad
              y del país."
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
