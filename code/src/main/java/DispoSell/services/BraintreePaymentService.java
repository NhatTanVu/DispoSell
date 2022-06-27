package DispoSell.services;

import com.braintreegateway.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class BraintreePaymentService {

    private final BraintreeGateway gateway;
    private static final Logger logger = LoggerFactory.getLogger(BraintreePaymentService.class);

    public BraintreePaymentService(BraintreeGateway gateway) {
        this.gateway = gateway;
    }

    public String generateClientToken() {
        return gateway.clientToken().generate();
    }

    public Transaction sale(BigDecimal amount, String nonce, String deviceData) {
        TransactionRequest request = new TransactionRequest()
                .amount(amount)
                .paymentMethodNonce(nonce)
                .deviceData(deviceData)
                .options()
                .submitForSettlement(true)
                .done();

        Result<Transaction> result = gateway.transaction().sale(request);
        if (result.isSuccess() || result.getTransaction() != null) {
            Transaction transaction = null;
            try {
                transaction = result.getTarget();
                transaction = gateway.transaction().find(transaction.getId());

            } catch (Exception e) {
                logger.info("Exception {}", e);

            }

            return transaction;

        } else {
            return null;
        }
    }
}
