import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CardOrganization from "../../components/CardOrganization";
const Autoridades = () => {
  return (
    <>
      <Header />
      <section className="-translate-y-5">
        <div className=" items-center justify-center flex flex-wrap gap-4">
          <Button
            bgColor="bg-[#545454]"
            hoverBgColor="hover:bg-[#545454]"
            name="AUTORIDADES"
            link="https://www.google.com"
          />
          <Button
            bgColor="bg-[#E4BCD3]"
            hoverBgColor="hover:bg-[#545454]"
            name="PERSONAL ADMINISTRATIVO"
            link="https://www.google.com"
          />
          <Button
            bgColor="bg-[#E4BCD3]"
            hoverBgColor="hover:bg-[#545454]"
            name="PERSONAL DOCENTE"
            link="https://www.google.com"
          />
        </div>
        <div className="mt-10">
        <CardOrganization
        photo="../src/assets/foto1.png" // Reemplaza con la URL de la foto
        name="Kelita Marilu Mauricio Saavedra"
        role="Directora de Escuela"
      />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Autoridades;
