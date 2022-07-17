import axios from 'axios';

class ProductService {
    getProducts() {
        return axios.get('/api/products');
    }
    getProductDetail(id){
        return axios.get('/api/productdetail',{params:{productID:id}});
    }
}

export default new ProductService();