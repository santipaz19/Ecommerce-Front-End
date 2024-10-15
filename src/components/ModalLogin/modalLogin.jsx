"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ApiEcommers } from "@/api/ApiECommers"; // Importa ApiEcommers
import { useDispatch } from "react-redux";
import { login } from "@/redux/User/userSlice";

export default function ModalLogin({ handleCloseModal }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Estado para manejar la carga del formulario
    const dispatch = useDispatch()
    const router = useRouter();



    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        // Indicamos que estamos en proceso de carga
        setLoading(true);

        try {
            // Hacemos la llamada a ApiEcommers con el email y la contraseña
            const response = await ApiEcommers.login({ email, password });

            // Log de la respuesta de la API
            console.log("Login response:", response);

            if (response.status === 200) {
                // Si la respuesta es exitosa, redirigimos a la página de Admin
                dispatch(login(response.data.email))
                handleCloseModal()
                router.push("/Home/Admin");
            } else if (response.status === 404) {
                // Si la respuesta no es exitosa, podrías manejar el error aquí
                alert("Correo electrónico o contraseña incorrectos.");
            }
        } catch (error) {
            // Manejo de errores
            console.error(error);
            alert("Hubo un error al intentar iniciar sesión. Inténtalo nuevamente.");
        } finally {
            // Indicamos que ya terminó el proceso de carga
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[400px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-black">Iniciar sesión</h2>
                    <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                        X
                    </button>
                </div>

                <form onSubmit={handleSubmitLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 text-black rounded-lg mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg text-black mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading} // Deshabilitar el botón mientras se carga
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
}
