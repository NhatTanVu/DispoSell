import axios from "axios";
import authHeader from './auth-header';

const API_URL = './api/auth/shippers';

class DeliveryService {
    createScheduleDelivery( orderID,
                            vehicleNumber,
                            vehicleType,
                            startTime,
                            endTime,
                            startLocation,
                            endLocation,
                            shippers) {
        return axios.post("./api/scheduleDelivery",{
            orderID,
            vehicleNumber,
            vehicleType,
            startTime,
            endTime,
            startLocation,
            endLocation,
            shippers
        });
    }

    getShippers() {
        return axios.get(API_URL + 'admin', {
            headers: authHeader()
        });

        // return axios.get("./api/auth/shippers");
    }
}

export default new DeliveryService();