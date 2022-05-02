package com.trabajo1.grupo1.controllers;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

		Integer suma = 0;
		Integer constante = 2;
		Integer digito = 0;
		Integer largo = split[0].length();

		logger.info("RUT ingresado: "+split[0]+"-"+split[1]);

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
			try {
				validador = Integer.parseInt(split[1]);
			} catch(Exception e){
				return false;
			}
		}

		if (digito == validador) {
			logger.info("Rut validado correctamente");
			return true;
		}
		else {
			logger.warn("Rut ingresado invalido");
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
		
		logger.info("Nombre completo ingresado: "+nombresJson);

		if (split.length < 3) {
			// {"nombre0":"ERROR"}
			logger.warn("Nombre ingresado incompleto");
			return "{\"nombre0\":\"ERROR\"}";
		}

		String newNombresJson = "{";

        for (int i=0; i<split.length-2; i++)
            // {"nombre_i":"value_i", "nombre_i":"value_i", ..}
            newNombresJson = newNombresJson + "\"nombre"+i+"\":\""+split[i]+"\",";

        String apellido0 = split[split.length-2];
        String apellido1 = split[split.length-1];

        newNombresJson = newNombresJson + "\"apellido0\":\""+apellido0+"\",";
        newNombresJson = newNombresJson + "\"apellido1\":\""+apellido1+"\"}";

		return newNombresJson;
	}
}
