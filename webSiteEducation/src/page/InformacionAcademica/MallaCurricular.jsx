import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import TopButton from "../../components/TopButton";

const MallaCurricular = () => {
  const [ciclos, setCiclos] = useState([]);
  const [malla, setMalla] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://pagina-educacion-backend-production.up.railway.app/api/ciclos");
        setCiclos(response.data);
        const responseMalla = await axios.get("https://pagina-educacion-backend-production.up.railway.app/api/malla");
        setMalla(responseMalla.data.malla.pdfMalla);
      } catch (error) {
        console.error("Error al obtener los datos de la malla:", error);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full">
      <TopButton />
      <Header title="Malla Curricular" />
      <section className="my-6 px-4 sm:px-6 md:px-16 lg:px-24">
        {/* Título y separador */}
        <div className="flex flex-col items-start gap-2 mb-6">
          <h2 className="text-2xl font-semibold text-[#262D73]">
            Distribución académica
          </h2>
          <div className="w-full h-1 bg-[#D9D9D9]"></div>
        </div>

        {/* Acordeón de ciclos */}
        <div className="space-y-4">
          {ciclos.map((ciclo, index) => (
            <div key={ciclo.IdCiclo} className="border-b last:border-none">
              <button
                type="button"
                className={`w-full text-left py-3 px-4 sm:py-4 sm:px-6 font-semibold text-[#262D73] text-lg uppercase transition-colors duration-200 ${
                  activeIndex === index ? "bg-gray-200" : "bg-[#F6F6F6]"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                <span className="inline-block sm:inline">
                  {ciclo.Ciclo}
                </span>
                <span
                  className={`float-right transform transition-transform duration-500 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out bg-[#F6F6F6] ${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                }`}
              >
                <div className="pt-2 pb-4 px-4 sm:px-6">
                  <ul className="space-y-2">
                    {ciclo.cursos.map((curso) => (
                      <li
                        key={curso.IdCurso}
                        className="flex items-center text-[#868686] font-medium text-base uppercase"
                      >
                        <span className="text-[#E4BCD3] mr-2">{">"}</span>
                        {curso.Nombre}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón de ver plan de estudios */}
        <div className="flex justify-center mt-8 mb-12 px-4 sm:px-6 md:px-16">
          <Button
            name="Ver plan de estudios"
            link={`https://pagina-educacion-backend-production.up.railway.app/${malla}`}
            target="_blank"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MallaCurricular;
