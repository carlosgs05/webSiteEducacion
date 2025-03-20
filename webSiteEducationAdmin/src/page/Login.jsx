import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import LogoLogin from "../assets/fac_edu.jpg"; // Imagen que se mostrará en la columna izquierda
import LoginFondo from "../assets/educacion_inicial.jpg"; // Imagen de fondo general

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      swal("Error", "Ingresa tu correo institucional.", "error");
      return;
    }
    if (!password.trim()) {
      swal("Error", "Ingresa tu contraseña.", "error");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      window.location.href = "/inicio";
    } catch (error) {
      swal("Error", "Credenciales incorrectas o error en el servidor.", "error");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo general (capa inferior) */}
      <div className="absolute inset-0 z-0">
        <img
          src={LoginFondo}
          alt="Fondo general"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay marrón semitransparente para unificar tonos */}
      <div className="absolute inset-0 bg-[#545454]/80 z-10"></div>

      {/* Contenedor principal con sombra pronunciada */}
      <div className="relative z-20 w-full max-w-5xl bg-white rounded shadow-2xl shadow-black/50 overflow-hidden flex flex-col md:flex-row min-h-[600px] m-4">
        {/* Columna Izquierda: Solo imagen adicional (ilustración) */}
        <div className="md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${LogoLogin})` }}>
          {/* Sin contenido adicional, se muestra únicamente la imagen de la ilustración */}
        </div>

        {/* Columna Derecha: Formulario */}
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-[#F3ECE6]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl text-center font-medium text-[#0F73EE] mb-12">
              Bienvenido
            </h2>
            <form onSubmit={handleLogin} className="space-y-9">
              {/* Campo Correo */}
              <div>
                <label htmlFor="email" className="block text-base text-gray-700 mb-1">
                  Correo institucional
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F73EE]"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 12l-4 4-4-4m8-8H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label htmlFor="password" className="block text-base text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F73EE]"
                  />
                  <svg
                    className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11c1.656 0 3-.895 3-2s-1.344-2-3-2-3 .895-3 2 1.344 2 3 2zm6 1H6a2 2 0 00-2 2v3a2 2 0 002 2h12a2 2 0 002-2v-3a2 2 0 00-2-2z"
                    />
                  </svg>
                </div>
              </div>

              {/* Botón Iniciar Sesión */}
              <button
                type="submit"
                className="w-full py-2 text-sm text-white bg-[#0F73EE] hover:bg-blue-700 rounded focus:outline-none focus:ring-2 focus:ring-[#0F73EE]"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;