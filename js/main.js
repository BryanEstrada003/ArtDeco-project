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
        kit = document.getElementById("kit");

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

        if (kit.value.length == 0) {
            alert("Kit requerido")
            kit.focus()
            return;
        }

        constdatos = {
            nombre: nombre.value,
            email: email.value,
            kit: kit.value,
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
                alert("Datos enviados correctamente");
                formulario.reset();
            })
            .catch((error) => console.error(error));
    });


};

let loadVotes = async() => {
    const url = "https://lavender-59c67-default-rtdb.firebaseio.com/lavender.json";
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
        console.error("Error:", respuesta.status);
        return;
    }
    const datos = await respuesta.json();
    let votesMap = new Map();


    for (const key in datos) {
        let vote = datos[key].kit;
        if (votesMap.has(vote)) {
            votesMap.set(vote, votesMap.get(vote) + 1);
        } else {
            votesMap.set(vote, 1);
        }
    }

    let maxVotes = 0;
    let maxVotesKit = "";
    votesMap.forEach((value, key) => {
        if (value >= maxVotes) {
            maxVotes = value;
            maxVotesKit = key;
        }
    });

    return maxVotesKit;
}

window.addEventListener("DOMContentLoaded", loaded);
window.addEventListener("DOMContentLoaded", async () => {
    const maxVotesKit = await loadVotes();
    console.log(maxVotesKit);
});