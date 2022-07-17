package DispoSell.services;

import DispoSell.models.Product;
import DispoSell.models.ProductCategory;
import DispoSell.models.ProductMedia;
import DispoSell.payload.response.PaginatedProductResponse;
import DispoSell.repositories.ProductMediaRepository;
import DispoSell.repositories.ProductRepository;
import org.hibernate.cfg.NotYetImplementedException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private MediaService mediaService;
    private final ProductRepository productRepository;
    private final ProductMediaRepository productMediaRepository;

    public ProductService(MediaService mediaService, ProductRepository productRepository,
                          ProductMediaRepository productMediaRepository
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
        product.setAvailableQuantity(product.getAvailableQuantity() - purchasedQuantity);
        return this.productRepository.save(product);
    }

    public Page<Product> listAll(int pageNumber) {
        Pageable pageable = PageRequest.of(pageNumber - 1,5);
        return productRepository.findAll(pageable);
    }

    public PaginatedProductResponse browseProducts(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return PaginatedProductResponse.builder()
                .numberOfItems(products.getTotalElements())
                .numberOfPages(products.getTotalPages())
                .productList(products.getContent())
                .build();
    }

    public PaginatedProductResponse browseProductsWithSorting(Pageable pageable) {
        Page<Product> products = productRepository.findAll(pageable);
        return PaginatedProductResponse.builder()
                .numberOfItems(products.getTotalElements())
                .numberOfPages(products.getTotalPages())
                .productList(products.getContent())
                .build();
    }

    public PaginatedProductResponse filterProducts(ProductCategory category, Pageable pageable) {
        Page<Product> products = productRepository.findAllByCategory(category, pageable);
        return PaginatedProductResponse.builder()
                .numberOfItems(products.getTotalElements())
                .numberOfPages(products.getTotalPages())
                .productList(products.getContent())
                .build();
    }

}
