package DispoSell.controllers;

import DispoSell.repository.Catdao;
import DispoSell.models.FurnitureCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
public class CategoryController {
    @Autowired
    Catdao dao;

    @GetMapping("/api/categories")
    public List<FurnitureCategory> all() throws SQLException, ClassNotFoundException {
        List<FurnitureCategory> list = dao.display();
        return list;
    }
}
