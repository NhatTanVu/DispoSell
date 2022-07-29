import axios from "axios";
import authHeader from './auth-header';

class DeliveryService {
    createScheduleDelivery(delivery) {
        return axios.post("./api/scheduleDelivery",
            delivery);
    }

    getShippers() {
        return axios.get("./api/auth/shippers", {
            headers: authHeader()
        });

        // return axios.get("./api/auth/shippers");
    }
}

export default new DeliveryService();