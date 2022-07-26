package DispoSell.services;

import org.springframework.stereotype.Service;

@Service
public interface EmailService {
    void sendHtmlMessage(String to, String subject, String text);
    void sendHtmlMessageToAdmin(String subject, String text);
}
