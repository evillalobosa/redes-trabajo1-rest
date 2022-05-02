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
    if ((rut.length === 8 || rut.length === 7) && validador.length === 1) {
        console.log("===> Rut ingresado +-");

        // Send request
        fetch('/api/rut', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                rutCompleto:rut+"-"+validador,
            })
        })
        .then((resp) => resp.json())
        .then(function(data){
            console.log("===> RUT Post Request Return: ",data)

            if (data){
                showRutResult(true)
            }
            else {
                showRutResult(false)
            }

        })
        .catch(function(error) {
            console.log("===> Error en la peticion del RUT: ", error)
        })
    }
    else {
        // TODO: add msg to logs
        console.log("===> RUT mal ingresado");

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
    if (nombre_completo) {
        console.log("===> Nombre ingresado +-")

        // Send request
        fetch('/api/nombre', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                nombres: nombre_completo
            })
        })
        .then((resp) => resp.json())
        .then(function(data){
            console.log("===> Nombre Post Request Return: ",data);

            if (data.nombre0 === "ERROR"){
	            showNombreResult(false);
	        }
	        else {
                var i = 0;
                var concatNombresHTML = "";

                if (data.apellido0 == "" || data.apellido1 == ""){
                    showNombreResult(false)
                    return
                }

                for (var key in data) {
                    if (key == "nombre"+i){
                        if(data[key] != ""){
                            concatNombresHTML = concatNombresHTML + "+ "+data[key]+"<br>";
                        }
                    }
                    i++;
                }

                var nombresHtml = document.getElementById("nombres");
                nombresHtml.innerHTML = concatNombresHTML;

                var apellido0 = document.getElementById("apellido0");
                apellido0.innerHTML = "+ "+data.apellido0;

                var apellido1 = document.getElementById("apellido1");
                apellido1.innerHTML = "+ "+data.apellido1;

                showNombreResult(true)
            }
        })
        .catch(function(error) {
            console.log("===> Error en la peticion del Nombre: ", error)
        })
    }
    else {
        // TODO: add msg to logs
        console.log("===> Nombre mal ingresado")

        showNombreResult(false)
    }
}