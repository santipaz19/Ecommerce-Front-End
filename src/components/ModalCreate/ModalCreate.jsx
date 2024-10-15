"use client";
import { useState, useEffect } from "react";
import { ApiEcommers } from "@/api/ApiECommers";

export default function ProductCreateOrEditModal({ handleCloseModal, selectedProduct, setReload }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false); // Para manejar el estado de carga
    const [error, setError] = useState(""); // Para manejar errores

    // Si hay un producto seleccionado, precargar los datos
    useEffect(() => {
        if (selectedProduct) {
            setName(selectedProduct.name);
            setDescription(selectedProduct.description);
            setPrice(selectedProduct.price);
            setImage(selectedProduct.image_url);
        }
    }, [selectedProduct]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar los campos antes de enviar
        if (!name || !description || !price || !image) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        setLoading(true);
        setError(""); // Limpiar errores previos

        // Crear o actualizar el producto
        const productData = {
            name,
            description,
            price: parseFloat(price),
            image_url: image,
        };

        try {
            let response;
            if (selectedProduct) {
                // Si hay un producto seleccionado, editarlo
                response = await ApiEcommers.updateProduct(selectedProduct.id, productData);
            } else {
                // Si no hay un producto seleccionado, crear uno nuevo
                response = await ApiEcommers.createProduct(productData);
            }

            if (response.status === 200 || response.status === 201) {
                // Producto creado o editado con éxito
                setReload(true)
                handleCloseModal();
                alert(selectedProduct ? "Producto editado con éxito." : "Producto creado con éxito.");
            } else {
                setError("Hubo un error al guardar el producto.");
            }
        } catch (error) {
            // Manejo de errores
            console.error(error);
            setError("Hubo un error al intentar guardar el producto. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-[90%] sm:w-[400px]">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-black">
                        {selectedProduct ? "Editar Producto" : "Crear Producto"}
                    </h2>
                    <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                        X
                    </button>
                </div>

                {/* Mostrar errores si existen */}
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Nombre del Producto</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Descripción</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                            rows="4"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">Precio</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-gray-700">URL de la Imagen</label>
                        <input
                            type="url"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : selectedProduct ? "Editar Producto" : "Crear Producto"}
                    </button>
                </form>
            </div>
        </div>
    );
}
