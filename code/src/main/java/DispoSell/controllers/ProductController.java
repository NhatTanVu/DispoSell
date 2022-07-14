package DispoSell.controllers;

import DispoSell.models.*;
import DispoSell.repositories.*;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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

    @GetMapping("/api/productdetail/id=")
    public String getProductByID(Model model, @RequestParam(name="productID", defaultValue = "")
    String product) {
        List<Product> products;

        if(product.isEmpty()){
            products = productRepository.findAll();

        } else {
            long id = Long.parseLong(product);
            products = productRepository.findByProductID(id);
        }
        model.addAttribute("productId", products);
        return "products";
    }

}
