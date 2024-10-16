# E-Commerce Frontend

Este proyecto es la interfaz de usuario para la aplicación Mi tienda E-Commerce. A continuación, se detallan las instrucciones para configurar y ejecutar el proyecto localmente.

## Descripción de la Aplicación

La aplicación permite:

- **Mostrar productos**: Los usuarios pueden visualizar los diferentes productos de la tienda.
- **Gestionar productos**: El usuario admin puede editar, crear o eliminar productos.
- **Carrito**: Los usuarios tienen la opción de ir agregando productos al carrito y luego visualizar un total mostrando todos sus productos y ademas tambien eliminar o agregar otros.
- **Buscar Productos**: Se puede buscar Productos por nombre para encontrarlos fácilmente.
- **Ver Información**: Los usuarios pueden ver información detallada sobre cada Producto.

Para loggearse como admin y realizar las operaciones CRUD este es el usuario:

# Mail:
prueba@gmail.com
# Contraseña:
hola123

# Deploy:
https://ecommers-front-end.vercel.app/

En caso de utilizar el deploy esperar unos minutos a que se levante el servidor debido a que esta alojado en render y en el plan gratis al estar inactivo se apaga.

## Instalación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/santipaz19/Ecommerce-Front-End.git
2. **Instalar dependencias: Usando npm:**

   npm install

## Ejecucion

Para iniciar el proyecto en modo desarrollo:
npm run dev

El proyecto se ejecutará en http://localhost:3000.

## Estructura del Proyecto
src/: Contiene el código fuente del proyecto.

src/api/: Módulos para interactuar con las API.

src/components/: Componentes de React modularizados.

src/redux/:  Modulos para gestionar el estado global de la aplicacion.

src/app/:  Carpeta principal que ensambla y renderiza los componentes.
