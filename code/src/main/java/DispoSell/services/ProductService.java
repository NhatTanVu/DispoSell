package DispoSell.services;

import DispoSell.models.Product;
import DispoSell.models.ProductMedia;
import DispoSell.repositories.ProductMediaRepository;
import DispoSell.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProductService {
    private MediaService mediaService;
    private final ProductRepository productRepository;
    private final ProductMediaRepository productMediaRepository;

    public ProductService(MediaService mediaService, ProductRepository productRepository, ProductMediaRepository productMediaRepository
    ) {
        this.mediaService = mediaService;
        this.productRepository = productRepository;
        this.productMediaRepository = productMediaRepository;
    }

    public Product createProduct(Product product) {
        Product newProduct = this.productRepository.save(product);
        for (ProductMedia productMedia : product.getProductMedia()) {
            productMedia.setProduct(newProduct);
            this.productMediaRepository.save(productMedia);
            this.mediaService.create(productMedia.getUrl());
        }
        return newProduct;
    }

    public Product updateAvailableQuantity(long productID, int purchasedQuantity) {
        Product product = this.productRepository.findById(productID).get();
        if (product.getAvailableQuantity() < purchasedQuantity) {
            throw new IllegalArgumentException();
        }

        product.setAvailableQuantity(product.getAvailableQuantity() - purchasedQuantity);
        return this.productRepository.save(product);
    }
}