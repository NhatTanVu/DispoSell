import axios from 'axios';

class ProductService {
    getProducts() {
        return axios.get('/api/products');
    }
    getProductDetail(id){
        return axios.get('/api/productdetail',{params:{productID:id}});
    }
    getCategories(){
        return axios.get('/api/categories');
    }
    getFilter(categoryID){
        return axios.get('/api/products/search/filter',{params:{category:categoryID}});
    }
    getSort(condition){
        return axios.get('/api/products/search/sorting',{params:{sort:condition}});
    }
    getFilterAndSort(categoryId,condition){
        return axios.get('/api/products/search/filter', {params:{category:categoryId, sort:condition}});
    }
}

export default new ProductService();
