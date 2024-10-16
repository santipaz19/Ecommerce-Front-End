'use client';
import { removeFromCart, addToCart } from '@/redux/Cart/cartSlice';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export default function ProductCard({ product, admin, setSelectProduct, setIsModalOpen, handleDelete, cart }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleCardClick = () => {
        if (!admin && !cart) {  // Si no es admin, se realiza la redirección
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
        if (admin) {
            handleDelete(product.id);
        } // Llamar a la función de eliminar el producto

        if (cart) {
            dispatch(removeFromCart(product))
        }
    };


    const handleAddToCart = (e) => {
        if (cart) {
            dispatch(addToCart(product))
        }
    };

    return (
        <div
            onClick={handleCardClick} // Si no es admin, redirige; si es admin, no hace nada
            className="flex cursor-pointer flex-col border p-2 md:p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 w-60 h-80 "
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
            {/* Boton de carrito: Eliminar y agregar */}
            {cart && (
                <div className="flex space-x-4 mt-4">
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        Agregar
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
