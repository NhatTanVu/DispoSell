import axios from "axios";
import authHeader from './auth-header';

const API_URL = '/api/auth/shippers';

class DeliveryService {
    createScheduleDelivery(orderID, shippers, startLocation, endLocation, startTime, endTime, carNumber, carType) {
        return axios.post('/api/scheduleDelivery', {
            "orderID": orderID,
            "vehicleNumber": carNumber,
            "vehicleType": carType,
            "startTime": startTime + "-07:00",
            "endTime": endTime + "-07:00",
            "startLocation": startLocation,
            "endLocation": endLocation,
            "shippers": shippers
        }, {headers: authHeader()});
    }

    getShippers() {
        return axios.get(API_URL , {headers: authHeader()});
    }
}

export default new DeliveryService();