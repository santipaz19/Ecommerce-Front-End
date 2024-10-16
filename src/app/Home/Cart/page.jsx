'use client';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '@/components/ProductCards/productCards';
import { toggleSearchVisibility } from '@/redux/Search/searchSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Carrito() {

    const carrito = useSelector((state) => state.cart.items);
    const searchTerm = useSelector((state) => state.search.searchTerm); // Obtener searchTerm desde Redux
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(toggleSearchVisibility());
        return () => {
            dispatch(toggleSearchVisibility()); // Ejecutar el dispatch al desmontarse
        };
    }, [dispatch]);

    // Filtrar productos según el término de búsqueda
    const filteredProducts = carrito.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calcular el total sumando los precios de los productos filtrados
    const totalPrice = carrito.reduce((total, product) => total + product.price, 0);

    return (
        <div className="p-4 ">
            <div className='flex  gap-8 py-3 w-full justify-start items-center'>
                <h1 className="text-3xl font-bold">Carrito</h1>
                <button
                    className='bg-gray-400  px-4 py-2 rounded-lg hover:bg-gray-600 transition text-white'
                    onClick={() => router.push("/Home")}>
                    Regresar
                </button>
            </div>

            <div className="flex min-h-[25rem] flex-wrap justify-center md:justify-start gap-6">
                {filteredProducts?.map((product, index) => (
                    // Combina el id del producto con el índice para generar una clave única
                    <ProductCard key={`${product.id}-${index}`} product={product} cart={true} />
                ))}
            </div>

            {/* Mostrar el total sumando los precios */}
            <div className="mt-8 text-center">
                <h2 className="text-2xl font-semibold">Total: ${totalPrice.toFixed(2)}</h2>
            </div>
        </div>
    );
}
