let loaded = (eventLoaded) => {
    let myform = document.getElementById("formulario");

    myform.addEventListener("submit", (eventSubmit) => {
        debugger;
    });

    constformulario = document.getElementById("formulario");
    constformulario.addEventListener("submit", (event) => {
        event.preventDefault();

        nombre = document.getElementById("nombre");
        email = document.getElementById("email");

        if (nombre.value.length == 0) {
            alert("Nombre requerido")
            nombre.focus()
            return;
        }

        if (email.value.length == 0) {
            alert("Email requerido")
            email.focus()
            return;
        }

        constnombre = document.getElementById("nombre").value;
        constemail = document.getElementById("email").value;

        constdatos = {
            nombre: constnombre,
            email: constemail,
        };

        fetch(
            "https://lavender-59c67-default-rtdb.firebaseio.com/lavender.json",
            {
                method: "POST",
                body: JSON.stringify(constdatos),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                console.log(datos);
            })
            .catch((error) => console.error(error));
    });
};

window.addEventListener("DOMContentLoaded", loaded);