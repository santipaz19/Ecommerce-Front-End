import axios from 'axios';

const url = 'https://ecommers-back-end.onrender.com/api';
const local = 'http://localhost:3000/api';

export const ApiEcommers = axios.create({
    baseURL: url,  // Cambia a `url` si prefieres usar la URL del deploy.
});

// Método para obtener todos los productos
ApiEcommers.getAllProducts = () => {
    return ApiEcommers.get('/products');
};

// Método para obtener un pro
ducto
ApiEcommers.getProduct = (idProduct) => {
    return ApiEcommers.get(`/products/${idProduct}`,
    );
};

// Método para crear un producto
ApiEcommers.createProduct = (productData) => {
    return ApiEcommers.post('/products', productData);
};

// Método para actualizar un producto
ApiEcommers.updateProduct = (idProduct, productData) => {
    return ApiEcommers.put(`/products/${idProduct}`,
        productData
    );
};


// Método para eliminar un producto
ApiEcommers.deleteProduct = (idProduct) => {
    return ApiEcommers.delete(`/products/${idProduct}`
    );
};


// Método para iniciar sesion
ApiEcommers.login = ({ email, password }) => {
    return ApiEcommers.post(`/user`, { email, password }
    );
};