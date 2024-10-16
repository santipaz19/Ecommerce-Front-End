'use client';
import { useEffect, useState } from 'react';
import { ApiEcommers } from '@/api/ApiECommers';
import ProductCard from '@/components/ProductCards/productCards';
import { useSelector, useDispatch } from 'react-redux';
import { clearSearch, setSearchTerm, toggleSearchVisibility } from '@/redux/Search/searchSlice';

export default function Home() {
    const [products, setProducts] = useState([]);
    const searchTerm = useSelector((state) => state.search.searchTerm); // Obtener searchTerm desde Redux


    const dispatch = useDispatch()


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await ApiEcommers.getAllProducts();
            setProducts(response.data);
        };


        dispatch(toggleSearchVisibility());
        fetchProducts();


        return () => {
            dispatch(toggleSearchVisibility()); // Ejecutar el dispatch al desmontarse
            dispatch(clearSearch());
        };
    }, [dispatch]);

    // Filtrar productos si searchTerm tiene algún valor
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );


    const setSearchTerms = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };


    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8">Lista de Productos</h1>
            <div className="items-center flex pb-3 sm:hidden">
                <input
                    value={searchTerm}
                    type="text"
                    onChange={setSearchTerms}
                    placeholder="Buscar productos..."
                    className="p-2 rounded-lg px-3 bg-gray-200 text-black w-full outline-none"
                />
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                {filteredProducts?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
