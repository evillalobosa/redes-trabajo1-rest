package com.trabajo1.grupo1.services;

public class nombre {

	public String dividirNombre(String[] nombresJson) {
		String newNombresJson = "{";

        for (int i=0; i<nombresJson.length-2; i++)
            // {"nombre_i":"value_i", "nombre_i":"value_i", ..}
            newNombresJson = newNombresJson + "\"nombre"+i+"\":\""+nombresJson[i]+"\",";

        String apellido0 = nombresJson[nombresJson.length-2];
        String apellido1 = nombresJson[nombresJson.length-1];

        newNombresJson = newNombresJson + "\"apellido0\":\""+apellido0+"\",";
        newNombresJson = newNombresJson + "\"apellido1\":\""+apellido1+"\"}";

		return newNombresJson;
	}
}
