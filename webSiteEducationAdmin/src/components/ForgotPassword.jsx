import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      swal("Error", "Ingresa tu correo institucional.", "error");
      return;
    }

    try {
      // Consulta el backend para ver si existe el usuario
      const response = await axios.post("http://127.0.0.1:8000/api/password/forgot", { email });
      // Si se encuentra, se espera que el backend retorne los datos del usuario
      const { user } = response.data;
      // Redirige al componente de confirmación pasando la data del usuario en state
      navigate("/confirm-reset", { state: { user } });
    } catch (error) {
      // Evitar que se muestre el error en consola y manejarlo adecuadamente
      if (error.response && error.response.status === 404) {
        swal("Error", "No se encontró una cuenta con ese correo.", "error");
      } else {
        swal("Error", "Ocurrió un error. Intenta más tarde.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-2 text-[#262D73]">
          ¿Olvidó su contraseña?
        </h2>
        <p className="text-center text-gray-600 my-4">
          Ingrese el correo asociado a tu cuenta para recuperar su contraseña
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div className="mb-11">
            <label className="block text-base text-gray-700 mb-1">Correo</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#262D73]"
            />
          </div>

          <button className="w-full py-2 text-white bg-[#262D73] rounded hover:bg-[#1c1e33] cursor-pointer">
            Buscar cuenta
          </button>

          <div className="text-center">
            <Link to="/" className="text-sm text-[#262D73] hover:underline">
              Volver al inicio
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;