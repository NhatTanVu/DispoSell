import axios from "axios";
import authHeader from './auth-header';

class DeliveryService {
    createScheduleDelivery(order) {
        return axios.post('/api/scheduleDelivery', {
            "orderID": 3,
            "vehicleNumber": "12345",
            "vehicleType": "van",
            "startTime": "2022-07-26T10:54:00-07:00",
            "endTime": "2022-07-26T15:54:00-07:00",
            "startLocation": "from somewhere",
            "endLocation": "to somewhere",
            "shippers": [3]
        }, {headers: authHeader()});
    }

    getShippers() {
        return axios.get("/api/auth/shippers", {headers: authHeader()});
    }
}

export default new DeliveryService();