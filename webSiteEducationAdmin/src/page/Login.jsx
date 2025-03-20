import { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/login", {
                email,
                password,
            });

            localStorage.setItem("token", response.data.access_token);
            
            window.location.href = "/inicio";
        } catch (error) {
            setError("Credenciales incorrectas: ", error);
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;
