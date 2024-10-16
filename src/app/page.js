'use client';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleIngresar = () => {
    router.push("/Home");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-4xl font-bold text-gray-800">Mi tienda</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-5xl font-bold mb-4">Bienvenido a el challenge tecnico</h2>
          <p className="text-lg mb-8">
            La solución integral para gestionar tus productos de forma rápida y eficiente.
          </p>
          <button
            onClick={handleIngresar}
            className="bg-white text-gray-800 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition"
          >
            Ingresar
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-semibold text-gray-800 mb-8">Características Principales</h3>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
              <h4 className="text-xl font-bold mb-4">Gestión de Productos</h4>
              <p className="text-gray-600">Administra tu inventario de manera sencilla y rápida.</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/3">
              <h4 className="text-xl font-bold mb-4">Aumenta tus ventas</h4>
              <p className="text-gray-600">Listado de productos.</p>
            </div>

          </div>
        </div>
      </section>




    </div>
  );
}
