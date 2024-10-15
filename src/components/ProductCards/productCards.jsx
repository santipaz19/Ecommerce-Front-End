'use client';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product, admin, setSelectProduct, setIsModalOpen, handleDelete }) {
    const router = useRouter();

    const handleCardClick = () => {
        if (!admin) {  // Si no es admin, se realiza la redirección
            const url = `/Home/Product/${product.id}`;
            router.push(url);
        }
        // Si es admin, no hace nada (no redirige)
    };

    const handleEditClick = (e) => {
        setSelectProduct(product); // Establecer el producto seleccionado
        setIsModalOpen(true); // Abrir el modal de edición
    };

    const handleDeleteClick = (e) => {
        handleDelete(product.id); // Llamar a la función de eliminar el producto
    };

    return (
        <div
            onClick={handleCardClick} // Si no es admin, redirige; si es admin, no hace nada
            className="flex cursor-pointer flex-col border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 max-w-[15rem] h-80 sm:w-1/2 md:w-1/3 lg:w-1/4"
        >
            <div className="w-full h-52 overflow-hidden rounded-lg mb-4">
                <img
                    src={product.image_url}
                    alt={`${product.name}`}
                    className="w-full h-full object-cover"
                />
            </div>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-700">${product.price}</p>

            {/* Botones de Admin: Editar y Eliminar */}
            {admin && (
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={handleEditClick}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}
