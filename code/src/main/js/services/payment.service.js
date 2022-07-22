import axios from "axios";

class PaymentService {
    getClientToken() {
        return axios.get("/api/payment/client_token");
    }

    checkout(paymentAmount, paymentMethodNonce) {
        return axios.post('/api/payment/checkout', {
            chargeAmount: paymentAmount,
            nonce: paymentMethodNonce
        });
    }
}

export default new PaymentService();