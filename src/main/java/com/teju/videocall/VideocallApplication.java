package com.teju.videocall;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.teju.videocall.user.User;
import com.teju.videocall.user.Userservice;

@SpringBootApplication
public class VideocallApplication {

	public static void main(String[] args) {
		SpringApplication.run(VideocallApplication.class, args);

	}
		@Bean
		public CommandLineRunner commandLineRunner(
			Userservice service
		){
			return args->{
                service.register(User.builder()
					         .username("teju")
							 .email("teju@gmail.com")
							 .password("Welc0me@192801")
					.build()
				);
				 service.register(User.builder()
					         .username("charan")
							 .email("charan@gmail.com")
							 .password("Welc0me@0904")
					.build()
				);
				 service.register(User.builder()
					         .username("Asha")
							 .email("asha@gmail.com")
							 .password("Welc0me@0112")
					.build()
				);
			};
		}

}
