import axios from "axios";
import authHeader from './auth-header';

class OrderService {
    createPurchaseOrder(purchaseOrder) {
        return axios.post("./api/createpurchaseorder",
            purchaseOrder);
    }

    createTradeOrder(tradeOrder) {
        return axios.post("./api/createtradeorder", {
            tradeOrder
        }, {
            headers: authHeader()
        });
    }

    getTradeOrder() {
        return axios.get('/api/tradeorders');
    }

    // getTradeOrder(id){
    //     return axios.get('./api/tradeorder',{params:{orderID:id}});
    // }
}

export default new OrderService();