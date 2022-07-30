package DispoSell.services;

import DispoSell.models.*;
import DispoSell.payload.response.PaginatedProductResponse;
import DispoSell.repositories.*;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {
    @InjectMocks
    ProductService productService;

    @Mock
    MediaService mediaService;

    @Mock
    ProductRepository productRepository;

    @Mock
    ProductMediaRepository productMediaRepository;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createProduct() {
        // Arrange
        Product product = new Product();
        ProductMedia productMediaItem = new ProductMedia();
        productMediaItem.setUrl("Image_1.jpg");
        HashSet<ProductMedia> productMedia = new HashSet<>();
        productMedia.add(productMediaItem);
        product.setProductMedia(productMedia);
        // Act
        productService.createProduct(product);
        // Assert
        verify(productRepository).save(product);
        verify(productMediaRepository).save(productMediaItem);
        verify(mediaService).create(productMediaItem.getUrl());
    }

    @Test
    void updateAvailableQuantity_purchaseQuantityMoreThanAvailableQuantity() {
        // Arrange
        int availableQuantity = 2;
        int purchaseQuantity = 3;
        long productID = 1L;
        Product product = new Product();
        product.setAvailableQuantity(availableQuantity);
        when(productRepository.findById(productID)).thenReturn(Optional.of(product));
        // Act + Assert
        assertThrows(IllegalArgumentException.class, () -> {
            productService.updateAvailableQuantity(productID, purchaseQuantity);
        });
    }

    @Captor
    ArgumentCaptor<Product> productArgumentCaptor;

    @Test
    void updateAvailableQuantity() {
        // Arrange
        int availableQuantity = 3;
        int purchaseQuantity = 1;
        long productID = 1L;
        Product product = new Product();
        product.setAvailableQuantity(availableQuantity);
        when(productRepository.findById(productID)).thenReturn(Optional.of(product));
        // Act
        Product updatedProduct = productService.updateAvailableQuantity(productID, purchaseQuantity);
        // Assert
        verify(productRepository).findById(productID);
        verify(productRepository).save(productArgumentCaptor.capture());
        assertEquals(availableQuantity - purchaseQuantity, productArgumentCaptor.getValue().getAvailableQuantity());
    }

    @Test
    void listAll() {
        // Arrange
        int pageNumber = 3;
        Pageable pageable = PageRequest.of(pageNumber - 1, 5);
        // Act
        productService.listAll(pageNumber);
        // Assert
        verify(productRepository).findAll(pageable);
    }

    @Test
    void browseProducts() {
        // Arrange
        int pageNumber = 3;
        Pageable pageable = PageRequest.of(pageNumber - 1, 5);
        Page<Product> products = new PageImpl<Product>(new ArrayList<>());
        when(productRepository.findAll(pageable)).thenReturn(products);
        // Act
        productService.browseProducts(pageable);
        // Assert
        verify(productRepository).findAll(pageable);
    }

    @Test
    void browseProductsWithSorting() {
        // Arrange
        int pageNumber = 4;
        Pageable pageable = PageRequest.of(pageNumber - 1, 5);
        Page<Product> products = new PageImpl<Product>(new ArrayList<>());
        when(productRepository.findAll(pageable)).thenReturn(products);
        // Act
        productService.browseProductsWithSorting(pageable);
        // Assert
        verify(productRepository).findAll(pageable);
    }

    @Test
    void filterProducts() {
        // Arrange
        int pageNumber = 5;
        Pageable pageable = PageRequest.of(pageNumber - 1, 5);
        Page<Product> products = new PageImpl<Product>(new ArrayList<>());
        ProductCategory category = new ProductCategory();
        when(productRepository.findAllByCategory(category, pageable)).thenReturn(products);
        // Act
        productService.filterProducts(category, pageable);
        // Assert
        verify(productRepository).findAllByCategory(category, pageable);
    }
}