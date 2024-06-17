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




async function rakingKits() {
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

    // Convertir el Map a un Array y ordenarlo en orden descendente por votos
    let sortedVotes = Array.from(votesMap.entries()).sort((a, b) => b[1] - a[1]);
    console.log(sortedVotes);
    // Generar el HTML para cada elemento y agregarlo a la página
    document.getElementById("get").innerHTML = '';
    const places = ["Primer lugar", "Segundo lugar", "Tercer lugar"];
    for (let i = 0; i < sortedVotes.length; i++) {
        let [kit, votes] = sortedVotes[i];
        let template = `
                <a class="col product-item" style="padding:0% !important;"> 
                    <img src="images/${i+1}.png" alt="${kit}" class="img-fluid product-thumbnail" style="
							width: 90%;
						" >
                    <h2 class="mb-4">${places[i]}</h2>
                    <p><strong>Kit</strong>: ${kit}</p>
                    <p><strong>Votos</strong>: ${votes}</p>
                </a>
                    
                
        `;
        document.getElementById("get").innerHTML += template;
    }
}
rakingKits();
window.addEventListener("DOMContentLoaded", loaded);

