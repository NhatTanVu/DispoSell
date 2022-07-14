import axios from 'axios';

class ProductService {
    getProducts() {
        return axios.get('/api/products');
    }
}

export default new ProductService();
