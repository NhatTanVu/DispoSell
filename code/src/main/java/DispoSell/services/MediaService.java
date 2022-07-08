package DispoSell.services;

import org.springframework.stereotype.Service;

@Service
public interface MediaService {
    boolean create(String path);
}
