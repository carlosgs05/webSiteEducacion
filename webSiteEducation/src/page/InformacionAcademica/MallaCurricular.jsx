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
        const response = await axios.get("http://localhost:8000/api/ciclos");
        setCiclos(response.data);
        const responseMalla = await axios.get(
          "http://localhost:8000/api/malla"
        );
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
    <div>
      <TopButton />
      <Header tittle="Malla Curricular" />
      <section className="my-6 mx-10 md:my-10 md:mx-16">
        <div className="flex flex-col items-start gap-2 mb-9">
          <div className="text-2xl font-semibold text-[#262D73]">
            Distribución académica
          </div>
          <div className="w-full h-1 bg-[#D9D9D9]"></div>
        </div>
        <div>
          {ciclos.map((ciclo, index) => (
            <div key={ciclo.IdCiclo} className="border-b last:border-none my-4">
              <button
                type="button"
                className={`w-full text-left p-4 font-semibold text-[#262D73] text-lg uppercase ${
                  activeIndex === index ? "bg-gray-200" : "bg-[#F6F6F6]"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                {ciclo.Ciclo}
                <span
                  className={`float-right transform transition-transform duration-700 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`transition-[max-height] duration-700 ease-in-out overflow-hidden ${
                  activeIndex === index ? "max-h-screen" : "max-h-0"
                } bg-[#F6F6F6]`}
              >
                <div className="p-4">
                  <ul>
                    {ciclo.cursos.map((curso) => (
                      <li
                        key={curso.IdCurso}
                        className="text-[#868686] font-medium text-md py-2 uppercase"
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
        <div className="flex justify-center my-10">
          <Button
            name="Ver plan de estudios"
            link={`http://127.0.0.1:8000/${malla}`}
            target="_blank"
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MallaCurricular;
