import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { FaUser, FaKey } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import LogoLogin from "../assets/fac_edu.jpg";
import LoginFondo from "../assets/educacion_inicial.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

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

    setIsLoading(true);
    
    try {
      const response = await axios.post("https://pagina-educacion-backend-production.up.railway.app/api/login", {
        email,
        password,
      });
      
      if (response.data.success) {
        login(response.data);
        navigate("/inicio");
      } else {
        swal("Error", response.data.message || "Credenciales incorrectas", "error");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error al iniciar sesión";
      swal("Error", errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo general */}
      <div className="absolute inset-0 z-0">
        <img
          src={LoginFondo}
          alt="Fondo general"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-[#545454]/80 z-10"></div>

      {/* Contenedor principal */}
      <div className="relative z-20 w-full max-w-5xl bg-white shadow-2xl shadow-black/90 overflow-hidden flex flex-col md:flex-row min-h-[600px] m-4">
        {/* Columna Izquierda: Imagen adicional */}
        <div
          className="md:w-1/2 bg-cover bg-center"
          style={{ backgroundImage: `url(${LogoLogin})` }}
        ></div>

        {/* Columna Derecha: Formulario */}
        <div className="md:w-1/2 flex items-center justify-center p-6 bg-[#F3ECE6]">
          <div className="w-full max-w-md">
            <h2 className="text-3xl text-center font-medium text-[#262D73] mb-12">
              BIENVENIDO
            </h2>
            <form onSubmit={handleLogin} className="space-y-9">
              {/* Campo Correo */}
              <div>
                <label htmlFor="email" className="block text-base text-gray-700 mb-1">
                  Correo institucional
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#262D73]"
                  />
                </div>
              </div>

              {/* Campo Contraseña */}
              <div>
                <label htmlFor="password" className="block text-base text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaKey className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#262D73]"
                  />
                </div>
              </div>

              {/* Botón Iniciar Sesión */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 text-sm text-white bg-[#262D73] hover:bg-[#1c1e33] rounded focus:outline-none focus:ring-2 focus:ring-[#262D73] cursor-pointer ${
                  isLoading ? "opacity-75" : ""
                }`}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
              </button>

              {/* Enlace para Olvidaste tu contraseña */}
              <div className="text-center">
                <Link to="/forgot-password" className="text-sm text-[#262D73] hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;