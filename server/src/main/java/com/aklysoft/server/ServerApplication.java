package com.aklysoft.server;

import lombok.Data;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

}

@Data
class Greetings {

	private final String greetings;
}

@RestController
@RequestMapping("/api")
class Api {

	@GetMapping("/hello")
	public String helloWorld() {
		return "hello world!";
	}

	@GetMapping("/hello/{name}")
	public Greetings helloUser(@PathVariable("name") String name) {
		return new Greetings("hello " + name + "!!!");
	}

}
