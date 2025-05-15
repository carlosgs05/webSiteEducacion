import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CardSlider from "../../components/CardSlider";
import TopButton from "../../components/TopButton";

const DesarrolloProfesional = () => {
  const [activeSection, setActiveSection] = useState("pasantias");
  const [dataDesarrollo, setDataDesarrollo] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/desarrolloProfesional")
      .then((response) => setDataDesarrollo(response.data))
      .catch((error) => console.error("Error al obtener los datos:", error));
   
  }, []);

  // Filtra los registros según el campo "Tipo"
  const dataPasantias = dataDesarrollo.filter(
    (item) => item.Tipo === "pasantias"
  );
  const dataRsu = dataDesarrollo.filter((item) => item.Tipo === "rsu");
  const dataBolsaTrabajo = dataDesarrollo.filter(
    (item) => item.Tipo === "bolsa de trabajo"
  );

  return (
    <>
      <TopButton />
      <Header title="Desarrollo Profesional" />
      {/* Botones de navegación */}
      <div className="mt-4 md:-translate-y-5 md:mt-0 items-center justify-center flex flex-wrap gap-4">
        <Button
          onClick={() => setActiveSection("pasantias")}
          name="PASANTIAS"
          link="#"
          isActive={activeSection === "pasantias"}
        />
        <Button
          onClick={() => setActiveSection("rsu")}
          name="RSU"
          link="#"
          isActive={activeSection === "rsu"}
        />
        <Button
          onClick={() => setActiveSection("bolsaTrabajo")}
          name="BOLSA DE TRABAJO"
          link="#"
          isActive={activeSection === "bolsaTrabajo"}
        />
      </div>

      {/* Sección de PASANTIAS */}
      <section
        className={`${
          activeSection === "pasantias" ? "block" : "hidden"
        } my-10`}
      >
        <CardSlider
          title="Ofertas de Prácticas pre-profesionales"
          data={dataPasantias}
        />
      </section>

      {/* Sección de RSU */}
      <section
        className={`${activeSection === "rsu" ? "block" : "hidden"} my-10`}
      >
        <CardSlider
          title="Convocatoria de Proyectos y Actividades"
          data={dataRsu}
        />
      </section>

      {/* Sección de BOLSA DE TRABAJO */}
      <section
        className={`${
          activeSection === "bolsaTrabajo" ? "block" : "hidden"
        } my-10`}
      >
        <CardSlider title="Bolsa de Trabajo" data={dataBolsaTrabajo} />
      </section>

      <Footer />
    </>
  );
};

export default DesarrolloProfesional;
