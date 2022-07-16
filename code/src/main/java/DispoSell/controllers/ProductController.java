package DispoSell.controllers;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class ProductController {
    private final ProductCategoryRepository productCategoryRepository;
    private final ProductConditionRepository productConditionRepository;
    private final ProductRepository productRepository;

    public ProductController(ProductCategoryRepository productCategoryRepository,
                             ProductConditionRepository productConditionRepository,
                             ProductRepository productRepository) {
        this.productCategoryRepository = productCategoryRepository;
        this.productConditionRepository = productConditionRepository;
        this.productRepository = productRepository;
    }

    @GetMapping("/api/categories")
    public List<ProductCategory> getAllProductCategories() {
        List<ProductCategory> list = productCategoryRepository.findAll();
        return list;
    }

    @GetMapping("/api/conditions")
    public List<ProductCondition> getAllProductConditions() {
        List<ProductCondition> list = productConditionRepository.findAll();
        return list;
    }

    @GetMapping("/api/products")
    public List<Product> getAllProducts() {
        List<Product> list = productRepository.findAll();
        return list;
    }

    @GetMapping("/api/productdetail")
    public Product getProductByID(@RequestParam(value = "productID") Long productID) {
        Product id = productRepository.findByProductID(productID);

        if(id == null){
            return null;
        } else {
            return id;
        }
    }

}
