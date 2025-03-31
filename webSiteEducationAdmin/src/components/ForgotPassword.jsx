import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            swal("Error", "Ingresa tu correo institucional.", "error");
            return;
        }

        try {
            // Se asume que el backend tiene una ruta para procesar el restablecimiento de contraseña
            await axios.post("http://127.0.0.1:8000/api/password/forgot", { email });
            swal(
                "¡Éxito!",
                "Se ha enviado un correo con las instrucciones para restablecer tu contraseña.",
                "success"
            ).then(() => {
                // Redirige al login después de enviar el correo
                window.location.href = "/";
            });
        } catch (error) {
            swal(
                "Error",
                "No se pudo enviar el correo, verifica el email o intenta más tarde.",
                "error"
            );
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#262D73]">
                    Restablecer Contraseña
                </h2>
                <form onSubmit={handleForgotPassword} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-base text-gray-700 mb-1">
                            Correo institucional
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#262D73]"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-sm text-white bg-[#262D73] hover:bg-[#1c1e33] rounded focus:outline-none focus:ring-2 focus:ring-[#262D73]"
                    >
                        Aceptar
                    </button>
                    <div className="text-center">
                        <Link to="/" className="text-sm text-[#262D73] hover:underline">
                            Volver al inicio de sesión
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;