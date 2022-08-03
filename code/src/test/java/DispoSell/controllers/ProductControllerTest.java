package DispoSell.controllers;

import DispoSell.models.EProductCondition;
import DispoSell.models.Product;
import DispoSell.models.ProductCategory;
import DispoSell.models.ProductCondition;
import DispoSell.payload.response.PaginatedProductResponse;
import DispoSell.repositories.ProductCategoryRepository;
import DispoSell.repositories.ProductConditionRepository;
import DispoSell.repositories.ProductRepository;
import DispoSell.services.ProductService;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductControllerTest {

    @Mock
    ProductCategoryRepository productCategoryRepository;
    @Mock
    ProductConditionRepository productConditionRepository;
    @Mock
    ProductRepository productRepository;
    @Mock
    ProductService productService;

    @InjectMocks
    ProductController productController;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllProductCategories() {
        // 1. Create mock data
        List<ProductCategory> mockList = new ArrayList<>();
        ProductCategory cate1= new ProductCategory("category 1");
        ProductCategory cate2= new ProductCategory("category 2");
        ProductCategory cate3= new ProductCategory("category 3");
        mockList.add(cate1);
        mockList.add(cate2);
        mockList.add(cate3);

        // 2. Define behavior of repository
        when(productCategoryRepository.findAll()).thenReturn(mockList);

        // 3. Call method for testing
        List<ProductCategory> actualList= productController.getAllProductCategories();

        // 4. assert the result
        assertEquals(mockList.size(), actualList.size());

        // 4.1 Ensure repository is called
        verify(productCategoryRepository, times(1)).findAll();
    }

    @Test
    void getAllProductConditions() {
        // 1. Create mock data
         List<ProductCondition> mockList=new ArrayList<>();
         ProductCondition condition1=new ProductCondition(EProductCondition.PRODUCT_CONDITION_GOOD);
         ProductCondition condition2=new ProductCondition(EProductCondition.PRODUCT_CONDITION_FAIR);
         ProductCondition condition3=new ProductCondition(EProductCondition.PRODUCT_CONDITION_UNUSED);
         ProductCondition condition4=new ProductCondition(EProductCondition.PRODUCT_CONDITION_VERY_GOOD);
         mockList.add(condition1);
         mockList.add(condition2);
         mockList.add(condition3);
         mockList.add(condition4);

       // 2. Define behavior of repository
        when(productConditionRepository.findAll()).thenReturn(mockList);

        // 3. Call method for testing
        List<ProductCondition> actualList=productController.getAllProductConditions();

        // 4. assert the result
        assertEquals(mockList.size(),actualList.size());

        // 4.1 Ensure repository is called
        verify(productConditionRepository,times(1)).findAll();
    }

    @Test
    void getAllProducts() {
        // 1. Create mock data
        List<Product> mockList=new ArrayList<>();
        Product product1= new Product();
        Product product2= new Product();
        Product product3= new Product();
        mockList.add(product1);
        mockList.add(product2);
        mockList.add(product3);

        // 2. Define behavior of repository
        when(productRepository.findAll()).thenReturn(mockList);

        // 3. Call method for testing
        List<Product> actualList=productController.getAllProducts();

        // 4. assert the result
        assertEquals(mockList.size(),actualList.size());

        // 4.1 Ensure repository is called
        verify(productRepository,times(1)).findAll();
    }

    @Test
    void getProductByID() {
        // 1. Create mock data
        Product mockProduct=new Product();
        mockProduct.setProductID(123l);
        mockProduct.setName("Product 123");
        Long mockId= mockProduct.getProductID();

        // 2. Define behavior of repository
        when(productRepository.findByProductID(mockId)).thenReturn(mockProduct);

        // 3. Call method for testing
        Product actualProduct=productController.getProductByID(mockId);

        // 4. assert the result
        assertEquals(mockProduct.getProductID(),actualProduct.getProductID());
        assertEquals(mockProduct.getName(),actualProduct.getName());

        // 4.1 Ensure repository is called
        verify(productRepository,times(1)).findByProductID(mockId);
    }

    /**
     * In productController, when we sort, it returns ResponseEntity
     * (contains PaginatedProductResponse as a body and HttpStatus.OK)
     * Our goal is to create a mockResponseEntity which contains mockPaginatedProductResponse as a body
     * We get mockPaginatedProductResponse by using productService.
     * In productService, when we sort with mockPageable,
     * it will return mockPaginatedProductResponse
     * then we use this mockPaginatedProductResponse as a body in mockResponseEntity
     */
    @Test
    void browseProductsWithSorting() {
        // 1. Create mock data
        int mockPageNumber = 4;
        int mockSize=5;
        Pageable mockPageable = PageRequest.of(mockPageNumber - 1, mockSize);

        Page<Product> mockProducts = new PageImpl<Product>(new ArrayList<>());
        PaginatedProductResponse mockPaginatedProductResponse=PaginatedProductResponse.builder()
                .numberOfItems(mockProducts.getTotalElements())
                .numberOfPages(mockProducts.getTotalPages())
                .productList(mockProducts.getContent())
                .build();

        ResponseEntity mockResponseEntity = new ResponseEntity<>(
                mockPaginatedProductResponse,
                HttpStatus.OK
        );

        // 2. Define behavior of repository
        when(productService.browseProductsWithSorting(mockPageable)).thenReturn(mockPaginatedProductResponse);

        // 3. Call method for testing
        ResponseEntity actualResponseEntity=productController.browseProductsWithSorting(mockPageable);

        // 4. assert the result
        assertEquals(mockResponseEntity.getBody(),actualResponseEntity.getBody());
        assertEquals(mockResponseEntity.getStatusCode(),actualResponseEntity.getStatusCode());

        // 4.1 Ensure service is called
        verify(productService,times(1)).browseProductsWithSorting(mockPageable);
    }

    @Test
    void browseProductsWithFilter() {
        // 1. Create mock data
        ProductCategory mockCategory= new ProductCategory("category 1");

        int mockPageNumber = 4;
        int mockSize=5;
        Pageable mockPageable = PageRequest.of(mockPageNumber - 1, mockSize);

        Page<Product> mockProducts = new PageImpl<Product>(new ArrayList<>());
        PaginatedProductResponse mockPaginatedProductResponse=PaginatedProductResponse.builder()
                .numberOfItems(mockProducts.getTotalElements())
                .numberOfPages(mockProducts.getTotalPages())
                .productList(mockProducts.getContent())
                .build();

        ResponseEntity mockResponseEntity = new ResponseEntity<>(
                mockPaginatedProductResponse,
                HttpStatus.OK
        );

        // 2. Define behavior of repository
        when(productService.filterProducts(mockCategory,mockPageable)).thenReturn(mockPaginatedProductResponse);

        // 3. Call method for testing
        ResponseEntity actualResponseEntity=productController.browseProductsWithFilter(mockCategory,mockPageable);

        // 4. assert the result
        assertEquals(mockResponseEntity.getBody(),actualResponseEntity.getBody());
        assertEquals(mockResponseEntity.getStatusCode(),actualResponseEntity.getStatusCode());

        // 4.1 Ensure repository is called
        verify(productService,times(1)).filterProducts(mockCategory,mockPageable);
    }
}