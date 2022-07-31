package DispoSell;

import DispoSell.models.*;
import DispoSell.payload.response.JwtResponse;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assumptions.assumeTrue;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class DispoSellApplicationTests {

    @Test
    void contextLoads() {
    }

    @Autowired
    private TestRestTemplate testRestTemplate;

    @Value("${integrationTest.enabled}")
    private Boolean integrationTestEnabled;

    @Test
    public void integration_getProducts() {
        assumeTrue(integrationTestEnabled);

        ResponseEntity<List> response = testRestTemplate.getForEntity("/api/products", List.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(MediaType.APPLICATION_JSON, response.getHeaders().getContentType());
        assertEquals(7, response.getBody().size());
    }

    @Test
    public void integration_createPurchaseOrder() {
        assumeTrue(integrationTestEnabled);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonString = "{\"contactNumber\":\"1465987722\",\"address\":\"1465987722_deliveryaddress\",\"email\":\"onchua2006@gmail.com\",\"status\":{\"statusID\":3},\"orderDetails\":[{\"product\":{\"productID\":3,\"productMedia\":[{\"url\":\"image1.jpg\",\"fileType\":\"jpg\"}]},\"quantity\":1},{\"product\":{\"productID\":5},\"quantity\":1}],\"paymentAmount\":50,\"paymentTransactionID\":\"aaa\"}";
        HttpEntity<String> httpEntity = new HttpEntity<String>(jsonString, headers);
        ResponseEntity<PurchaseOrder> response = testRestTemplate.postForEntity("/api/createpurchaseorder", httpEntity, PurchaseOrder.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().getOrderID() >= 1);
    }

    @Test
    public void integration_authenticateUser() {
        assumeTrue(integrationTestEnabled);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String jsonString = "{\"username\":\"test_admin\",\"password\":\"test_admin\"}";
        HttpEntity<String> httpEntity = new HttpEntity<String>(jsonString, headers);
        ResponseEntity<JwtResponse> response = testRestTemplate.postForEntity("/api/auth/signin", httpEntity, JwtResponse.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void integration_scheduleDelivery() {
        assumeTrue(integrationTestEnabled);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String jsonString = "{\"username\":\"test_admin\",\"password\":\"test_admin\"}";
        HttpEntity<String> firstHttpEntity = new HttpEntity<String>(jsonString, headers);
        ResponseEntity<JwtResponse> firstResponse = testRestTemplate.postForEntity("/api/auth/signin", firstHttpEntity, JwtResponse.class);
        String jwtString = firstResponse.getBody().getAccessToken();

        jsonString = "{\"contactNumber\":\"1465987722\",\"address\":\"1465987722_deliveryaddress\",\"email\":\"onchua2006@gmail.com\",\"status\":{\"statusID\":3},\"orderDetails\":[{\"product\":{\"productID\":3,\"productMedia\":[{\"url\":\"image1.jpg\",\"fileType\":\"jpg\"}]},\"quantity\":1},{\"product\":{\"productID\":5},\"quantity\":1}],\"paymentAmount\":50,\"paymentTransactionID\":\"aaa\"}";
        HttpEntity<String> secondHttpEntity = new HttpEntity<String>(jsonString, headers);
        ResponseEntity<PurchaseOrder> secondResponse = testRestTemplate.postForEntity("/api/createpurchaseorder", secondHttpEntity, PurchaseOrder.class);
        Long orderID = secondResponse.getBody().getOrderID();

        jsonString = "{\"orderID\":" + orderID + ",\"vehicleNumber\":\"12345\",\"vehicleType\":\"van\",\"startTime\":\"2022-07-26T10:54:00Z\",\"endTime\":\"2022-07-26T15:54:00Z\",\"startLocation\":\"fromsomewhere\",\"endLocation\":\"tosomewhere\",\"shippers\":[2]}";
        headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(jwtString);
        HttpEntity<String> thirdHttpEntity = new HttpEntity<String>(jsonString, headers);
        ResponseEntity<Delivery> thirdResponse = testRestTemplate.postForEntity("/api/scheduleDelivery", thirdHttpEntity, Delivery.class);

        assertEquals(HttpStatus.OK, thirdResponse.getStatusCode());
        assertTrue(thirdResponse.getBody().getDeliveryID() >= 1);
    }
}
