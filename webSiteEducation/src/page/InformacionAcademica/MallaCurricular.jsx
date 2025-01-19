import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";

const MallaCurricular = () => {
  const ciclos = [
    {
      titulo: "Ciclo I",
      cursos: [
        "Curso 1",
        "Curso 2",
        "Curso 3",
        "Curso 4",
        "Curso 5",
        "Curso 6",
      ],
    },
    {
      titulo: "Ciclo II",
      cursos: ["Curso 7", "Curso 8", "Curso 9", "Curso 10"],
    },
    {
      titulo: "Ciclo III",
      cursos: ["Curso 11", "Curso 12", "Curso 13", "Curso 14"],
    },
    {
      titulo: "Ciclo IV",
      cursos: ["Curso 15", "Curso 16", "Curso 17"],
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <Header />
      <section className="my-6 mx-10 md:my-10 md:mx-16">
        <div className="flex flex-col items-start gap-2 mb-9">
          <div className="text-2xl font-semibold text-[#262D73]">
            Distribución académica
          </div>
          <div className="w-full h-1 bg-[#D9D9D9]"></div>
        </div>
        <div>
          {ciclos.map((ciclo, index) => (
            <div key={index} className="border-b last:border-none my-4">
              <button
                type="button"
                className={`w-full text-left p-4 font-semibold text-[#262D73] text-lg uppercase ${
                  activeIndex === index ? "bg-gray-200" : "bg-[#F6F6F6]"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                {ciclo.titulo}
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
                    {ciclo.cursos.map((curso, idx) => (
                      <li
                        key={idx}
                        className="text-[#868686] font-medium text-md py-2"
                      >
                        <span className="text-[#E4BCD3] mr-2">{">"}</span>
                        {curso}
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
                link="../src/assets/historia.pdf"
                target="_blank" />
                
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MallaCurricular;
