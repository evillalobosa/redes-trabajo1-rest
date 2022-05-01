// ============================================================== //
// ===================== RUT ==================================== //
// ============================================================== //

function showRutResult(status) {
    if (status) {
        // Show correct msg
        var rut_error_html = document.getElementById("rut-error");
        rut_error_html.classList.add("hide");

        var rut_correct_html = document.getElementById("rut-correct");
        rut_correct_html.classList.remove("hide");
    }
    else {
        // Show error msg
        var rut_correct_html = document.getElementById("rut-correct");
        rut_correct_html.classList.add("hide");

        var rut_error_html = document.getElementById("rut-error");
        rut_error_html.classList.remove("hide");
    }
}

function getRut() {
    var rut  = document.getElementById("rutField").value; // String type
    var validador = document.getElementById("rutdField").value; // String type

    // VALIDATIONS
    // TODO: check if rut and validators are int numbers and not letters or whatever
    if (rut.length === 8 && validador.length === 1) {
        console.log("===> Rut ingresado +-");

        // Send request
        fetch('/api/rut', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                rut: Number(rut),
                validador:Number(validador)
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        })
        .then((resp) => resp.json())
        .then(function(data){
            console.log(data.results)

            if (data.results){
                showRutResult(true)
            }
            else {
                showRutResult(false)
            }

        })
        .catch(function() {
            console.log("error en la peticion del rut")
        })
    }
    else {
        // TODO: add msg to logs
        console.log("===> Rut mal ingresado");

        showRutResult(false)
    }
}


// ============================================================== //
// ===================== NOMBRE ================================= //
// ============================================================== //


function showNombreResult(status) {
    if (status) {
        // Show correct msg
        var nombre_error_html = document.getElementById("nombre-error");
        nombre_error_html.classList.add("hide");

        var nombre_correct_html = document.getElementById("nombre-correct");
        nombre_correct_html.classList.remove("hide");
    }
    else {
        // Show error msg
        var nombre_correct_html = document.getElementById("nombre-correct");
        nombre_correct_html.classList.add("hide");

        var nombre_error_html = document.getElementById("nombre-error");
        nombre_error_html.classList.remove("hide");
    }
}

function getNombre(){
    var nombre_completo = document.getElementById("nombreField").value;

    // VALIDATIONS
    // TODO: check if nombre_completo arent numbers
    if (nombre) {
        console.log("===> Nombre ingresado +-")

        // Send request
        fetch('/api/nombre', {
            method:'POST',
            body:JSON.stringify({
                nombres:nombre_completo,
            }),
            headers:{
                "Content-Type":"application/json; charset=UTF-8"
            }
        })
        .then((resp) => resp.json())
        .then(function(data){
            console.log(data.results)

            // var status = data.results[1]
            // var nombres = data.results[2]
            // var apellidos = data.results[3]

            // if (status) {}

        })
        .catch(function() {
            console.log("error en la peticion del nombre")
        })

        showNombreResult(true)
    }
    else {
        // TODO: add msg to logs
        console.log("===> Nombre mal ingresado")

        showNombreResult(false)
    }
}
