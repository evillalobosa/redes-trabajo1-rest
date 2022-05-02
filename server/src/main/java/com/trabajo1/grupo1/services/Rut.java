package com.trabajo1.grupo1.services;

public class Rut {

	public Boolean calculateRut(String rut, String val) {
		Integer suma = 0;
		Integer constante = 2;
		Integer digito = 0;
		Integer largo = rut.length();

		for (int i = largo; i > 0; i--){
            suma = suma + Integer.parseInt(rut.substring(i-1,i))*constante;
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
		if (val.equals("k") || val.equals("K")) {
			validador = 10;
		}
		else {
			try {
				validador = Integer.parseInt(val);
			} catch(Exception e){
				return false;
			}
		}

		return digito.equals(validador);
	}
}
