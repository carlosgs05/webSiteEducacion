import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useLocation, useNavigate, Link } from "react-router";

const ConfirmReset = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = location.state || {};
  const [loading, setLoading] = useState(false); // Estado para manejar la carga

  if (!user) {
    navigate("/");
    return null;
  }

  const handleContinue = async () => {
    setLoading(true); // Activamos el estado de carga
    try {
      await axios.post("http://127.0.0.1:8000/api/password/send-code", { email: user.email });

      swal({
        title: "¡Código enviado!",
        text: "Se ha enviado un código de recuperación a tu correo",
        icon: "success",
        button: "Aceptar",
      }).then(() => {
        navigate("/validate-code", { state: { email: user.email } });
      });
    } catch (error) {
      swal("Error", "No se pudo enviar el código. Intenta más tarde.", "error");
    } finally {
      setLoading(false); // Desactivamos el estado de carga después de que la respuesta se haya recibido
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-5 text-[#262D73]">
          Cuenta encontrada
        </h2>
        <p className="text-center text-gray-600 mb-5">
          Te enviaremos un código a tu correo electrónico para que puedas restaurar tu contraseña.
        </p>

        <div className="flex justify-center mb-4">
          <img
            src={user.photo || "http://127.0.0.1:8000/imagenes/avatar_profile.png"}
            alt="Perfil"
            className="w-40 h-40 rounded-full object-cover border-2 shadow-lg border-gray-200"
          />
        </div>

        <p className="text-center text-2xl font-semibold text-gray-800 mb-6 uppercase">
          {user.name}
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleContinue}
            className={`w-full py-2 text-white bg-[#262D73] rounded hover:bg-[#1c1e33] cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading} // Desactiva el botón mientras se está procesando
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"
                  ></path>
                </svg>
                <span>Enviando...</span>
              </div>
            ) : (
              "Continuar"
            )}
          </button>
          <div className="text-center">
            <Link to="/" className="text-sm text-[#262D73] hover:underline">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmReset;