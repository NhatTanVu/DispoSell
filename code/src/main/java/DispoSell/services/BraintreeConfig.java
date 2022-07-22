package DispoSell.services;

import com.braintreegateway.BraintreeGateway;
import com.braintreegateway.Environment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BraintreeConfig {
    @Value("${DispoSell.Braintree.merchantId}")
    private String merchantId;

    @Value("${DispoSell.Braintree.publicKey}")
    private String publicKey;

    @Value("${DispoSell.Braintree.privateKey}")
    private String privateKey;

    @Value("${DispoSell.Braintree.environment}")
    private String environment;

    @Bean
    public BraintreeGateway getBraintreeGateway() {
        BraintreeGateway gateway = new BraintreeGateway(
                Environment.parseEnvironment(environment),
                merchantId,
                publicKey,
                privateKey
        );

        return gateway;
    }
}
