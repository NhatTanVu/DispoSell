package DispoSell.services;

import org.springframework.stereotype.Service;

@Service
public class FileService implements MediaService {
    @Override
    public boolean create(String path) {
        return true;
    }
}
