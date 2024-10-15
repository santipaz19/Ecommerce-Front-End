// /pages/product/[id]/index.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApiEcommers } from '@/api/ApiECommers';

export default function ProductPage({ params }) {

    const id = params.id;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await ApiEcommers.getProduct(id);
                    setProduct(response.data);
                } catch (err) {
                    console.log(err);


                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [id]); // Re-fetch cuando el id cambie

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!product) {
        return <div>Producto no encontrado.</div>;
    }

    return (
        <div className="p-4">
            <div>
                <button className='bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition text-white' onClick={() => router.push("/Home")}>Regresar</button>
            </div>
            <div className="flex  flex-col md:flex-row gap-6">
                <div className="w-full justify-center flex items-center md:w-1/2">
                    <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-auto h-[35rem]  object-cover rounded-lg"
                    />
                </div>

                <div className="w-full md:w-1/2  flex flex-col gap-8 pt-10">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Precio</h2>
                        <p className="mt-4 text-2xl font-bold">${product.price}</p>
                    </div>
                    <div>
                        <button className='bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition text-white'>Agregar al carrito</button>
                    </div>

                </div>
            </div>
        </div>
    );
}
