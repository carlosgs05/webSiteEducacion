import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CardOrganization from "../../components/CardOrganization";
import { useState } from "react";

const Organizacion = () => {
  const [activeSection, setActiveSection] = useState("autoridades"); // Estado para controlar la sección activa

  return (
    <>
      <Header />
      {/* Botones de navegación */}
      <div className="mt-4 md:-translate-y-5 md:mt-0 items-center justify-center flex flex-wrap gap-4">
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

      {/* AUTORIDADES */}
      <section
        className={`${
          activeSection === "autoridades" ? "block" : "hidden"
        } my-10`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16">
          <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Directora de Escuela"
          />
          <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Directora de Escuela"
          />
        </div>
      </section>

      {/* PERSONAL DOCENTE */}
      <section
        className={`${activeSection === "docente" ? "block" : "hidden"} my-10`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
          <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Docente"
          />
          <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Docente"
          />
            <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Docente"
          />
        </div>
      </section>

      {/* PERSONAL ADMINISTRATIVO */}
      <section
        className={`${
          activeSection === "administrativo" ? "block" : "hidden"
        } my-10`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
          <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Personal Administrativo"
          />
          <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Personal Administrativo"
          />
            <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Docente"
          />
            <CardOrganization
            photo="../src/assets/foto1.png"
            name="Kelita Marilu Mauricio Saavedra"
            role="Docente"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Organizacion;
