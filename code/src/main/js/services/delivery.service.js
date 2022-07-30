import axios from "axios";
import authHeader from './auth-header';

const API_URL = '/api/auth/shippers';

class DeliveryService {
    createScheduleDelivery(order) {
        return axios.post('/api/scheduleDelivery', {order}, {headers: authHeader()});
    }

    getShippers() {
        return axios.get(API_URL , {headers: authHeader()});
    }
}

export default new DeliveryService();