package DispoSell.services;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);
    void sendSimpleMessageToAdmin(String subject, String text);
}
