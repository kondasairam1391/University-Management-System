package com.example.StudentManagement;

import com.example.StudentManagement.entity.AppUser;

import com.example.StudentManagement.repository.AppUserRepository;

import org.springframework.boot.CommandLineRunner;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;

import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class StudentManagementApplication {

	public static void main(String[] args) {

		SpringApplication.run(
				StudentManagementApplication.class,
				args
		);
	}

	@Bean
	CommandLineRunner runner(
			AppUserRepository repository,
			PasswordEncoder passwordEncoder
	) {

		return args -> {

			if (repository.findByUsername(
					"admin"
			).isEmpty()) {

				AppUser admin =
						new AppUser();

				admin.setUsername("admin");

				admin.setPassword(
						passwordEncoder.encode(
								"admin123"
						)
				);

				admin.setRole("ADMIN");

				repository.save(admin);
			}

			if (repository.findByUsername(
					"user"
			).isEmpty()) {

				AppUser user =
						new AppUser();

				user.setUsername("user");

				user.setPassword(
						passwordEncoder.encode(
								"user123"
						)
				);

				user.setRole("USER");

				repository.save(user);
			}
		};
	}
}
