'use client';
import { useEffect, useState } from 'react';
import { ApiEcommers } from '@/api/ApiECommers';
import ProductCard from '@/components/ProductCards/productCards';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSearchVisibility } from '@/redux/Search/searchSlice';
import { useRouter } from 'next/navigation';
import ProductCreateOrEditModal from '@/components/ModalCreate/ModalCreate';

export default function HomeAdmin() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [selectProduct, setSelectProduct] = useState(null); // Producto seleccionado para edición
    const searchTerm = useSelector((state) => state.search.searchTerm); // Obtener searchTerm desde Redux
    const [reload, setReload] = useState(false)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

    const dispatch = useDispatch();
    const router = useRouter();




    const fetchProducts = async () => {
        const response = await ApiEcommers.getAllProducts();
        setProducts(response.data);
    };


    useEffect(() => {
        if (isAuthenticated) {

            dispatch(toggleSearchVisibility());
            fetchProducts();

            return () => {
                dispatch(toggleSearchVisibility()); // Ejecutar el dispatch al desmontarse
            };
        } else {
            router.push('/Home');
        }
    }, [dispatch, isAuthenticated, router]);

    useEffect(() => {
        if (reload) {
            fetchProducts()
            setReload(false)
        }
    }, [reload]);

    // Filtrar productos si searchTerm tiene algún valor
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateProductClick = () => {
        setSelectProduct(null); // No hay producto seleccionado para creación
        setIsModalOpen(true); // Mostrar el modal de creación de producto
    };

    const handleCloseModal = () => {
        setIsModalOpen(false); // Cerrar el modal
    };

    // Función para eliminar un producto
    const handleDelete = async (productId) => {
        try {
            await ApiEcommers.deleteProduct(productId); // Llamada a la API para eliminar el producto
            setReload(true)
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-8">Panel de Administrador</h1>
            <div className='flex w-full justify-between items-center md:pr-28 mb-5'>
                <h2 className="text-2xl font-bold ">Productos activos</h2>
                <button
                    onClick={handleCreateProductClick}
                    className='bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition text-white'>
                    Crear Producto
                </button>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-6">
                {filteredProducts?.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        admin={true}
                        setSelectProduct={setSelectProduct}
                        setIsModalOpen={setIsModalOpen}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Modal de creación o edición de producto */}
            {isModalOpen && <ProductCreateOrEditModal setReload={setReload} selectedProduct={selectProduct} handleCloseModal={handleCloseModal} />}
        </div>
    );
}
