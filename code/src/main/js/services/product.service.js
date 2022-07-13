import axios from 'axios';

class ProductService {
    getProduct() {
        return axios.get('/api/products');
    }
}

export default new ProductService();
