package com.trabajo1.grupo1.controllers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.trabajo1.grupo1.services.Rut;
import com.trabajo1.grupo1.services.Nombre;

@RestController
@RequestMapping("/api")
public class Api {

	private static final Log logger = LogFactory.getLog(Api.class);

	@GetMapping("/demo")
	public String demo() {
		return "Hello";
	}

	@PostMapping(
			path = "/rut",
			consumes = MediaType.APPLICATION_JSON_VALUE
			)
	public Boolean rut(@RequestBody String rutJson) {
		String rutCompleto = rutJson.replace("{\"rutCompleto\":\"", "");
		rutCompleto = rutCompleto.replace("\"}", "");

		String[] split = rutCompleto.split("-");
		logger.info("RUT ingresado: "+split[0]+"-"+split[1]);

		Rut rutUsuario = new Rut();
		if (rutUsuario.calculateRut(split[0], split[1])) {
			logger.info("Rut validado correctamente");
			return true;
		}
		logger.warn("Rut ingresado invalido");
		return false;
	}

	@PostMapping(
			path = "/nombre",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE
			)
	public StringBuilder nombre(@RequestBody String nombresJson) {
		String nombres = nombresJson.replace("{\"nombres\":\"", "");
		nombres = nombres.replace("\"}", "");

		String[] split = nombres.split(" ");
		
		logger.info("Nombre completo ingresado: "+nombresJson);

		if (split.length < 3) {
			logger.warn("Nombre ingresado incompleto");
			StringBuilder nameError = new StringBuilder();
			return nameError.append("{\"nombre0\":\"ERROR\"}");
		}

		Nombre nombreUsuario = new Nombre();
		return nombreUsuario.dividirNombre(split);
	}
}
