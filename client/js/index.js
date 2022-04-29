function getRut() {
    var rut  = document.getElementById("rutField").value; // String type
    var validador = document.getElementById("rutdField").value; // String type

    // VALIDATIONS
    if (rut.length === 8 && validador.length === 1) {
        console.log("Rut ingresado maomeno");

        // Send request
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/products", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            rut: Number(rut),
            validador: Number(validador)
        }));
        xhr.onload = function() {
            console.log("--------------- recibido?")
            console.log(this.responseText);
            var data = JSON.parse(this.responseText);
            console.log(data);
            console.log("-----------------")
        }

        // Show correct msg
        var error_result = document.getElementById("rut-error");
        error_result.classList.add("hide");

        var correct_result = document.getElementById("rut-correct");
        correct_result.classList.remove("hide");
    }
    else {
        // TODO: add msg to logs
        console.log("Rut mal ingresado");

        // Show error msg
        var correct_result = document.getElementById("rut-correct");
        correct_result.classList.add("hide");

        var error_result = document.getElementById("rut-error");
        error_result.classList.remove("hide");
    }
}


// ============================================================== //


function getNombre(){
    var nombre = document.getElementById("nombreField").value;

    // VALIDATIONS
    if (nombre) {
        console.log("Nombre ingresado maomeno")

        // Show correct msg
        var error_result = document.getElementById("nombre-error");
        error_result.classList.add("hide");

        var correct_result = document.getElementById("nombre-correct");
        correct_result.classList.remove("hide");
    }
    else {
        // TODO: add msg to logs
        console.log("Nombre mal ingresado")

        // Show error msg
        var correct_result = document.getElementById("nombre-correct");
        correct_result.classList.add("hide");

        var error_result = document.getElementById("nombre-error");
        error_result.classList.remove("hide");
    }
}