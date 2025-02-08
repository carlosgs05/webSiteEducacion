import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListaNoticias from "../../components/ListaNoticias";
import PortadaNoticias from "../../components/PortadaNoticias";
("../../components/Noticias");
const Noticias = () => {
  return (
    <>
      <Header />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-12">
        <div className="grid col-span-2">
        <PortadaNoticias />
        </div>
       
        <ListaNoticias />
      </section>

      <Footer />
    </>
  );
};

export default Noticias;
