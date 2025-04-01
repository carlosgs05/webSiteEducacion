import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router";

const ValidateResetCode = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const [code, setCode] = useState("");

    if (!email) {
        navigate("/");
        return null;
    }

    const handleValidateCode = async (e) => {
        e.preventDefault();

        if (!code.trim()) {
            swal("Error", "Ingresa el código enviado a tu correo.", "error");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/password/validate-code", { email, code });
            if (response.data.success) {
                swal("¡Código correcto!", "Ahora puedes establecer una nueva contraseña.", "success").then(() => {
                    // Se redirige al componente de reset de contraseña pasando el email en el state.
                    navigate("/reset-password", { state: { email } });
                });
            } else {
                swal("Error", "El código ingresado es incorrecto o ha expirado.", "error");
            }
        } catch (error) {
            swal("Error", "No se pudo validar el código. Intenta nuevamente.", "error");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-5 text-[#262D73]">
                    Verifica tu código
                </h2>
                <p className="text-center text-gray-600 mb-5">
                    Ingresa el código de verificación que enviamos a tu correo electrónico.
                </p>

                <form onSubmit={handleValidateCode} className="space-y-6">
                    <div>
                        <label className="block text-base text-gray-700 mb-1">Código</label>
                        <input
                            type="text"
                            placeholder="123456"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-[#262D73] text-center tracking-widest"
                        />
                    </div>

                    <button type="submit" className="w-full py-2 text-white bg-[#262D73] rounded hover:bg-[#1c1e33] cursor-pointer">
                        Validar código
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ValidateResetCode;