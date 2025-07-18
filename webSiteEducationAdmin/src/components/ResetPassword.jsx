import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router";

// Componente PasswordField reutilizable para contraseñas (sin type="password" nativo)
const PasswordField = ({ name, value, onChange, placeholder }) => {
    const [show, setShow] = useState(false);

    // Evita escribir espacios
    const handleKeyDown = (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                style={{
                    WebkitTextSecurity: show ? "none" : "disc",
                }}
                className="block w-full pr-10 border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
                {show ? (
                    // Ícono para ocultar contraseña (ojo tachado)
                    <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.92.137-1.8.392-2.625M7 7a9.953 9.953 0 00-3 5c0 5.523 4.477 10 10 10 1.536 0 3-.354 4.313-.975M15 15l3 3m-3-3l-3-3m0 0L9 9m3 3l3 3"
                        />
                    </svg>
                ) : (
                    // Ícono para mostrar contraseña (ojo sin tachar)
                    <svg
                        className="h-5 w-5 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
};

const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state || {};

    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    if (!email) {
        navigate("/");
        return null;
    }

    // Valida que la contraseña tenga al menos 8 caracteres, una mayúscula, una minúscula y un número
    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(password);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!password || !passwordConfirmation) {
            swal("Error", "Completa todos los campos.", "error");
            return;
        }

        if (!validatePassword(password)) {
            swal(
                "Error",
                "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.",
                "error"
            );
            return;
        }

        if (password !== passwordConfirmation) {
            swal("Error", "Las contraseñas no coinciden.", "error");
            return;
        }

        try {
            const response = await axios.post(
                "https://pagina-educacion-backend-production.up.railway.app/api/password/reset",
                {
                    email,
                    password,
                    password_confirmation: passwordConfirmation,
                }
            );

            if (response.data.success) {
                swal(
                    "¡Contraseña actualizada!",
                    "Tu contraseña se ha actualizado correctamente.",
                    "success"
                ).then(() => {
                    navigate("/");
                });
            } else {
                swal(
                    "Error",
                    response.data.message ||
                    "No se pudo actualizar la contraseña. Intenta nuevamente.",
                    "error"
                );
            }
        } catch (error) {
            swal("Error", "Ocurrió un error al actualizar la contraseña.", "error");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-5 text-[#262D73]">
                    Restablecer Contraseña
                </h2>
                <p className="text-center text-gray-600 mb-5">
                    Ingresa una contraseña con al menos 8 caracteres que contenga mínimo
                    una mayúscula, una minúscula y un número.
                </p>
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                        <label className="block text-base text-gray-700 mb-1">
                            Nueva Contraseña
                        </label>
                        <PasswordField
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="********"
                        />
                    </div>
                    <div>
                        <label className="block text-base text-gray-700 mb-1">
                            Confirmar Contraseña
                        </label>
                        <PasswordField
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="********"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-[#262D73] rounded hover:bg-[#1c1e33] cursor-pointer"
                    >
                        Cambiar Contraseña
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;