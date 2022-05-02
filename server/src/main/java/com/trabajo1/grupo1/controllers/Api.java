package com.trabajo1.grupo1.controllers;

import org.springframework.http.MediaType;
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

	@PostMapping(
			path = "/rut",
			consumes = MediaType.APPLICATION_JSON_VALUE
			)
	public Boolean rut(@RequestBody String rutJson) {
		String rutCompleto = rutJson.replace("{\"rutCompleto\":\"", "");
		rutCompleto = rutCompleto.replace("\"}", "");

		String[] split = rutCompleto.split("-");

		Integer suma = 0;
		Integer constante = 2;
		Integer digito = 0;
		Integer largo = split[0].length();

		for (int i = largo; i > 0; i--){
            suma = suma + Integer.parseInt(split[0].substring(i-1,i))*constante;
            constante = constante + 1 ;
            if (constante == 8){
                constante = 2;
            }
        }

		digito = 11 - suma%11;

		if (digito == 11) {
			digito = 0;
		}

		Integer validador = 0;
		if (split[1].equals("k") || split[1].equals("K")) {
			validador = 10;
		}
		else {
			if (split[1].getClass().getName() == "java.lang.String") {
				return false;
			}
			validador = Integer.parseInt(split[1]);
		}

		if (digito == validador) {
			return true;
		}
		else {
			return false;
		}
	}

	@PostMapping(
			path = "/nombre",
			consumes = MediaType.APPLICATION_JSON_VALUE,
			produces = MediaType.APPLICATION_JSON_VALUE
			)
	public String nombre(@RequestBody String nombresJson) {
		String nombres = nombresJson.replace("{\"nombres\":\"", "");
		nombres = nombres.replace("\"}", "");

		String[] split = nombres.split(" ");

		if (split.length < 4) {
			// {"nombre0":"ERROR"}
			return "{\"nombre0\":\"ERROR\"}";
		}

		String newNombresJson = "{";

        for (int i=0; i<split.length; i++)
            // {"nombre_i":"value_i", "nombre_i":"value_i", ..}
            newNombresJson = newNombresJson + "\"nombre"+i+"\":\""+split[i]+"\",";

        newNombresJson = newNombresJson.replaceFirst(".$","");
        newNombresJson = newNombresJson + "}";
		return newNombresJson;
	}
}
