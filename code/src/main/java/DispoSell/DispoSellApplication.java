package DispoSell;

import DispoSell.models.ERole;
import DispoSell.models.Role;
import DispoSell.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class DispoSellApplication {

	public static void main(String[] args) {
		SpringApplication.run(DispoSellApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(RoleRepository roleRepository){
		return args -> {
			if(roleRepository.count() == 0) {
				roleRepository.save(new Role(ERole.ROLE_ADMIN));
				roleRepository.save(new Role(ERole.ROLE_DELIVERY));
				roleRepository.save(new Role(ERole.ROLE_USER));
				System.out.println("Added 3 roles");
			}
		};
	}

}
