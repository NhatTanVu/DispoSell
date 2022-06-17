import axios from 'axios';
import authHeader from './auth-header';

const API_URL = './api/test/';

class TestService {
  getUserContent() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getDeliveryContent() {
    return axios.get(API_URL + 'delivery', { headers: authHeader() });
  }

  getAdminContent() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new TestService();
