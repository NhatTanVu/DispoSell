package DispoSell.controllers;

import DispoSell.models.Payment;
import DispoSell.services.BraintreePaymentService;
import com.braintreegateway.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @Autowired
    BraintreePaymentService service;

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @GetMapping("/client_token")
    public ResponseEntity<String> generateClientToken() {
        String token = service.generateClientToken();
        return ResponseEntity.ok(token);
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody Payment paymentForm) {
        BigDecimal amount = null;
        try {
            amount = new BigDecimal(paymentForm.getChargeAmount());
        } catch (NumberFormatException e) {
            logger.info("NumberFormatException {}", e);
        }
        String nonce = paymentForm.getNonce();
        if (amount != null && nonce != null && !nonce.isBlank()) {
            Transaction result = service.sale(amount, nonce, null);
            return ResponseEntity.ok(result);
        } else
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).build();
    }
}
