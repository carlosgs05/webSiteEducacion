import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ListaNoticias from "../../components/ListaNoticias";
import PortadaNoticias from "../../components/PortadaNoticias";
import axios from "axios";
import { useState, useEffect } from "react";
import TopButton from "../../components/TopButton";

const Noticias = () => {
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/noticiasActuales"
      );
      setData(response.data);
      console.log("Noticias:", response.data);
    } catch (error) {
      console.error("Error al obtener las noticias:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <TopButton />
      <Header title="Noticias" />
      <section className="grid grid-cols-1 md:grid-cols-3 gap-10 px-10 py-12">
        <div className="grid col-span-2">
          <PortadaNoticias data={data} />
        </div>
        <ListaNoticias data={data} />
      </section>

      <Footer />
    </>
  );
};

export default Noticias;
