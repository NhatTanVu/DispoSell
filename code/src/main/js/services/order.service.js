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
}

export default new OrderService();