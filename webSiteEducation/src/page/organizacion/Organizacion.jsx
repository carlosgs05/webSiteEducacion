import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CardOrganization from "../../components/CardOrganization";
import axios from "axios";

const Organizacion = () => {
  const [activeSection, setActiveSection] = useState("autoridades");
  const [autoridades, setAutoridades] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [administrativos, setAdministrativos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/organizacion")
      .then((response) => {
        const data = response.data; // Se asume que es un arreglo de objetos
        // Filtrar según el atributo RolPersona
        const autoridadesArr = data.filter(
          (persona) => persona.RolPersona === "Autoridades"
        );
        const docentesArr = data.filter(
          (persona) => persona.RolPersona === "Personal Docente"
        );
        const administrativosArr = data.filter(
          (persona) => persona.RolPersona === "Personal Administrativo"
        );

        setAutoridades(autoridadesArr);
        setDocentes(docentesArr);
        setAdministrativos(administrativosArr);
      })
      .catch((error) => {
        console.error("Error al obtener la organización:", error);
      });
  }, []);

  return (
    <>
      <Header />
      {/* Botones de navegación */}
      <div className="mt-4 md:-translate-y-5 md:mt-0 flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => setActiveSection("autoridades")}
          name="AUTORIDADES"
          link="#"
          isActive={activeSection === "autoridades"}
        />
        <Button
          onClick={() => setActiveSection("docente")}
          name="PERSONAL DOCENTE"
          link="#"
          isActive={activeSection === "docente"}
        />
        <Button
          onClick={() => setActiveSection("administrativo")}
          name="PERSONAL ADMINISTRATIVO"
          link="#"
          isActive={activeSection === "administrativo"}
        />
      </div>

      {/* Sección de autoridades */}
      <section className={`${activeSection === "autoridades" ? "block" : "hidden"} my-10`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16">
          {autoridades.map((persona, index) => (
            <CardOrganization key={index} data={persona} />
          ))}
        </div>
      </section>

      {/* Sección de personal docente */}
      <section className={`${activeSection === "docente" ? "block" : "hidden"} my-10`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
          {docentes.map((persona, index) => (
            <CardOrganization key={index} data={persona} />
          ))}
        </div>
      </section>

      {/* Sección de personal administrativo */}
      <section className={`${activeSection === "administrativo" ? "block" : "hidden"} my-10`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
          {administrativos.map((persona, index) => (
            <CardOrganization key={index} data={persona} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Organizacion;
