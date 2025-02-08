import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Button from "../../components/Button";
// import CardOrganization from "../../components/CardOrganization";
import { useState } from "react";
import CardSlider from "../../components/CardSlider";

const DesarrolloProfesional = () => {
  const [activeSection, setActiveSection] = useState("pasantias");

  // LISTA DE DATOS

  const data1 = [
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    }
]

const data2 = [
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    }
]

const data3 = [
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    },
    {
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'You have the option of canceling by 6 pm on the day of arrival. Dogs must be requested in advance. The max lines is set to three and all over are invisible. Hover with your mouse or push with a finger on your mobile device on the text to show all lines.',
        date: '16/01/2025',
        link: 'https://www.youtube.com/watch?v=MY0j2LRt5l0'
    }
]

  return (
    <>
      <Header />
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

        {/* PASANTIAS */}
       <section
        className={`${activeSection === "pasantias" ? "block" : "hidden"
          } my-10`}
      >
        <div>
            <CardSlider
              title="Ofertas de Prácticas pre-profesionales"
              data={data1}
            />
        </div>
      </section>

      {/* PERSONAL DOCENTE */}
      <section
        className={`${activeSection === "rsu" ? "block" : "hidden"} my-10`}
      >
        <div >
            <CardSlider
              title="Convocatoria de Proyectos y Actividades"
              data={data2}
            />
        
        </div>
      </section>

      {/* PERSONAL ADMINISTRATIVO */}
      <section
        className={`${activeSection === "bolsaTrabajo" ? "block" : "hidden"
          } my-10`}
      >
        <div >
            <CardSlider
            title="Bolsa de Trabajo"
              data={data3}
            />
        
        </div>
      </section> 
      <Footer />
    </>
  );
};

export default DesarrolloProfesional;
