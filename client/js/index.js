function getRut() {
    var rut  = document.getElementById("rutField").value;
    var rutd = document.getElementById("rutdField").value;

    console.log("Boton RUT: " + rut + "-" + rutd);
    return true;
}

function getNombre(){
    var nombre = document.getElementById("nombreField").value;

    console.log("Boton Nombre: " + nombre);
    return "nombre1";
}