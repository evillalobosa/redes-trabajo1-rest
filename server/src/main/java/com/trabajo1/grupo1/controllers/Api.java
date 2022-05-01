package com.trabajo1.grupo1.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Api {

	@GetMapping("/demo")
	public String demo() {
		return "Hello";
	}

	@PostMapping("/rut")
	public Boolean rut(Integer rut, Integer validador) {
		return true;
	}

	@PostMapping("/nombre")
	public String nombre(@RequestBody String nombres) {
		return nombres;
	}
}
