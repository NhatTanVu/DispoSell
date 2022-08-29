import axios from "axios";
import authHeader from './auth-header';

class DeliveryService {
    scheduleDelivery(orderID, shippers, startLocation, endLocation, startTime, endTime, carNumber, carType) {
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
        return axios.get('/api/auth/shippers', {headers: authHeader()});
    }

    startDelivery(orderID) {
        return axios.post('/api/startDelivery', orderID, {headers: authHeader()});
    }

    getDeliveryByOrderID(orderID) {
        return axios.get('/api/deliveryByOrderID', {headers: authHeader(), params: {orderID: orderID}});
    }
}

export default new DeliveryService();