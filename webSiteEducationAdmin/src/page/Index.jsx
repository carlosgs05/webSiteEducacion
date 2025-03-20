import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import LoadingIndicator from "../components/LoadingIndicator";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 310);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <div className="p-4">
          {/* Título de bienvenida */}
          <h1 className="text-2xl text-center font-medium text-blue-800 mb-6">
            BIENVENIDO
          </h1>

          {/* Texto introductorio */}
          <p className="text-base text-justify text-gray-700 mb-8 mx-auto max-w-6xl">
            Desde aquí puedes gestionar toda la información relevante de la
            facultad. Administra la organización, el desarrollo profesional,
            las noticias y documentos, entre otros aspectos clave para la
            comunidad académica.
          </p>

          {/* Secciones administrables en formato de bloques con íconos */}
          <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6">
            {/* Organización */}
            <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* Icono UserGroup (Organización) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m10-6.13a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-justify">
                Administra la{" "}
                <span className="text-blue-600 font-semibold">
                  estructura organizativa
                </span>{" "}
                de la facultad, incluyendo autoridades, docentes y personal
                administrativo.
              </p>
            </div>

            {/* Desarrollo Profesional */}
            <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* Icono Academic Cap */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0v6"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-justify">
                Controla las oportunidades de{" "}
                <span className="text-blue-600 font-semibold">
                  desarrollo profesional
                </span>
                , como pasantías, programas de RSU y la bolsa de trabajo.
              </p>
            </div>

            {/* Malla Curricular */}
            <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* Icono Book Open */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 20l9-5-9-5-9 5 9 5z"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-justify">
                Actualiza y organiza la{" "}
                <span className="text-blue-600 font-semibold">
                  malla curricular
                </span>
                , asegurando que los planes de estudio estén actualizados.
              </p>
            </div>

            {/* Noticias */}
            <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* Icono Newspaper / Document Text */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m2 0a2 2 0 11-4 0 2 2 0 014 0zM7 8h10M7 16h10M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-justify">
                Publica y gestiona{" "}
                <span className="text-blue-600 font-semibold">
                  noticias y eventos
                </span>{" "}
                importantes para la comunidad universitaria.
              </p>
            </div>

            {/* Documentos */}
            <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* Icono Folder */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7v4a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 00-1 1z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 11v6a1 1 0 001 1h16a1 1 0 001-1v-6"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-justify">
                Sube, edita y organiza{" "}
                <span className="text-blue-600 font-semibold">
                  documentos administrativos
                </span>{" "}
                y académicos para el acceso de los usuarios.
              </p>
            </div>

            {/* Configuración */}
            <div className="bg-white p-5 rounded-lg shadow flex items-center space-x-4">
              <div className="flex-shrink-0">
                {/* Icono Cog (Settings) */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-16 h-16 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l.3.921a1.01 1.01 0 00.95.69h.967c.969 0 1.371 1.24.588 1.81l-.782.57a1.007 1.007 0 00-.364 1.118l.3.921c.3.921-.755 1.688-1.54 1.118l-.782-.57a1.007 1.007 0 00-1.175 0l-.782.57c-.785.57-1.84-.197-1.54-1.118l.3-.921a1.007 1.007 0 00-.364-1.118l-.782-.57c-.783-.57-.38-1.81.588-1.81h.967a1.01 1.01 0 00.95-.69l.3-.921zM12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
                  />
                </svg>
              </div>
              <p className="text-gray-800 text-justify">
                Modifica los{" "}
                <span className="text-blue-600 font-semibold">
                  ajustes y configuraciones
                </span>{" "}
                generales del sistema para personalizar la experiencia de uso.
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Index;