"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalLogin from "../ModalLogin/modalLogin";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "@/redux/Search/searchSlice";
import { logout } from "@/redux/User/userSlice"; // Importa la acción de logout

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();

    // Selector para obtener el estado de autenticación
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const searchTerm = useSelector((state) => state.search.searchTerm);
    const visible = useSelector((state) => state.search.visible);
    const carrito = useSelector((state) => state.cart.items);

    const handleLoginClick = () => {
        // Si está autenticado, hacer logout
        if (isAuthenticated) {
            dispatch(logout());
        } else {
            // Si no está autenticado, abrir el modal de login
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const setSearchTerms = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };



    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="max-w-screen mx-2 md:mx-6 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center cursor-pointer" onClick={() => router.push("/Home")}>
                    <img
                        src="/assets/imagelogo.png"
                        alt="Logo"
                        className="sm:h-14 hidden sm:flex mr-4"
                    />
                    <h1 className="text-xl font-semibold">Mi Tienda</h1>
                </div>

                {/* Barra de búsqueda */}
                {visible && (
                    <div className="items-center hidden sm:flex">
                        <input
                            value={searchTerm}
                            type="text"
                            onChange={setSearchTerms}
                            placeholder="Buscar productos..."
                            className="p-2 rounded-lg bg-gray-200 px-2 text-black w-[10rem] md:w-[20rem] outline-none"
                        />
                    </div>
                )}

                {/* Carrito de compras y Login/Logout */}
                <div className="flex items-center space-x-4">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.push("/Home/Cart")}>
                        <img
                            src="/assets/carrito2.png"
                            alt="carrito"
                            className="h-7 "
                        />
                        <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {carrito.length}
                        </span>
                    </div>

                    {/* Botón de Login/Logout */}
                    <button
                        onClick={handleLoginClick}
                        className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        {isAuthenticated ? "Logout" : "Login"}
                    </button>

                    {/* Botón de Panel */}
                    {isAuthenticated && (
                        <button
                            onClick={() => router.push("/Home/Admin")}
                            className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                        >
                            Panel
                        </button>
                    )}
                </div>
            </div>

            {/* Modal de Login */}
            {isModalOpen && <ModalLogin handleCloseModal={handleCloseModal} />}
        </nav>
    );
};

export default Navbar;
