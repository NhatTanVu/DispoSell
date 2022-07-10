import axios from "axios";
import authHeader from './auth-header';

class OrderService {
    createPurchaseOrder(purchaseOrder) {
        return axios.post("./api/createpurchaseorder",
            purchaseOrder
        , {
            headers: authHeader()
        });
    }

    createTradeOrder(tradeOrder) {
        return axios.post("./api/createtradeorder", {
            tradeOrder
        }, {
            headers: authHeader()
        });
    }
}

export default new OrderService();