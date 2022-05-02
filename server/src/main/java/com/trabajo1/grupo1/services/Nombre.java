package com.trabajo1.grupo1.services;

public class Nombre {

	public StringBuilder dividirNombre(String[] nombresJson) {
		StringBuilder newNombresJson = new StringBuilder();
		newNombresJson.append("{");

        for (int i=0; i<nombresJson.length-2; i++)
            newNombresJson.append("\"nombre"+i+"\":\""+nombresJson[i]+"\",");

        String apellido0 = nombresJson[nombresJson.length-2];
        String apellido1 = nombresJson[nombresJson.length-1];

        newNombresJson.append("\"apellido0\":\""+apellido0+"\",");
        newNombresJson.append("\"apellido1\":\""+apellido1+"\"}");

		return newNombresJson;
	}
}
