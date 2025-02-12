import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
import CardOrganization from "../../components/CardOrganization";
import { useState } from "react";

const Organizacion = () => {
  const [activeSection, setActiveSection] = useState("autoridades");

  // LISTA DE DATOS

  // Autoridades
  const autoridades = [
    {
      photo: "../src/assets/foto1.png",
      name: "Autoridad 1",
      role: "Directora de Escuela",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    },
    {
      photo: "../src/assets/foto1.png",
      name: "Autoridad 2",
      role: "Directora de Escuela",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    }
  ]

  // Docentes
  const docentes = [
    {
      photo: "../src/assets/foto1.png",
      name: "Docente 1",
      role: "Docente",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    },
    {
      photo: "../src/assets/foto1.png",
      name: "Docente 2",
      role: "Docente",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    },
    {
      photo: "../src/assets/foto1.png",
      name: "Docente 3",
      role: "Docente",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    }
  ]

  // Administrativo
  const administrativos = [
    {
      photo: "../src/assets/foto1.png",
      name: "Administrativo 1",
      role: "Administrativo",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    },
    {
      photo: "../src/assets/foto1.png",
      name: "Administrativo 2",
      role: "Administrativo",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    },
    {
      photo: "../src/assets/foto1.png",
      name: "Administrativo 3",
      role: "Administrativo",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    },
    {
      photo: "../src/assets/foto1.png",
      name: "Administrativo 4",
      role: "Administrativo",
      correo: "123456789",
      titulo: "Ingeniero en Sistemas",
      publicaciones: [
        { title: "Publicación 1",  url: "https://example.com" },
        { title: "Publicación 2",  url: "https://example.com" },
        { title: "Publicación 3",  url: "https://example.com" }
      ]
    }
  ]


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
        className={`${activeSection === "autoridades" ? "block" : "hidden"
          } my-10`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16">
          {autoridades.map((autoridad, index) => (
            <CardOrganization
              key={index}
              data={autoridad}
            />
          ))}
        </div>
      </section>

      {/* PERSONAL DOCENTE */}
      <section
        className={`${activeSection === "docente" ? "block" : "hidden"} my-10`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
          {docentes.map((docente, index) => (
            <CardOrganization
              key={index}
              data={docente}
            />
          ))}
        </div>
      </section>

      {/* PERSONAL ADMINISTRATIVO */}
      <section
        className={`${activeSection === "administrativo" ? "block" : "hidden"
          } my-10`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16">
          {administrativos.map((administrativo, index) => (
            <CardOrganization
              key={index}
              data={administrativo}
            />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Organizacion;
