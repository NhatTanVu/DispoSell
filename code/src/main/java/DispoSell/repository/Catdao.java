package DispoSell.repository;

import DispoSell.models.FurnitureCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;

@Component
@Service
public class Catdao {
    @Autowired
    JdbcTemplate template;

    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public Catdao(JdbcTemplate template) {
        this.template = template;
    }

    public List<FurnitureCategory> display() throws ClassNotFoundException, SQLException {
        //create an array list that will contain the data recovered

        return template.query("select * from category", (RowMapper) (rs, row) -> {
            FurnitureCategory c = new FurnitureCategory();
            c.setCategoryID(rs.getLong(1));
            c.setCategoryname(rs.getString(2));
            return c;
        });
    }

}
