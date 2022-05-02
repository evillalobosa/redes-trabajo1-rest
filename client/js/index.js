// ============================================================== //
// ===================== RUT ==================================== //
// ============================================================== //

function showRutResult(status) {
    var rut_error_html = document.getElementById("rut-error");
    var rut_correct_html = document.getElementById("rut-correct");

    if (status) {
        // Show correct msg
        rut_error_html.classList.add("hide");
        rut_correct_html.classList.remove("hide");
    }
    else {
        // Show error msg
        rut_correct_html.classList.add("hide");
        rut_error_html.classList.remove("hide");
    }
}

function getRut() {
    var rut  = document.getElementById("rutField").value; // String type
    var validador = document.getElementById("rutdField").value; // String type

    // VALIDATIONS
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
                return
            }
            showRutResult(false)
        })
        .catch(function(error) {
            console.log("===> Error en la peticion del RUT: ", error)
        })
        return
    }

    console.log("===> RUT mal ingresado");
    showRutResult(false)
}


// ============================================================== //
// ===================== NOMBRE ================================= //
// ============================================================== //


function showNombreResult(status) {
    var nombre_error_html = document.getElementById("nombre-error");
    var nombre_correct_html = document.getElementById("nombre-correct");

    if (status) {
        // Show correct msg
        nombre_error_html.classList.add("hide");
        nombre_correct_html.classList.remove("hide");
    }
    else {
        // Show error msg
        nombre_correct_html.classList.add("hide");
        nombre_error_html.classList.remove("hide");
    }
}

function getNombre(){
    var nombre_completo = document.getElementById("nombreField").value;

    // VALIDATIONS
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
	            return
	        }

            var i = 0;
            var concatNombresHTML = "";

            if (data.apellido0 == "" || data.apellido1 == ""){
                showNombreResult(false)
                return
            }

            for (var key in data) {
                if (key == "nombre"+i && data[key] != ""){
                    concatNombresHTML = concatNombresHTML + "+ "+data[key]+"<br>";
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
        })
        .catch(function(error) {
            console.log("===> Error en la peticion del Nombre: ", error)
        })
        return
    }
    console.log("===> Nombre mal ingresado")
    showNombreResult(false)
}