let amigos = [];

function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();
    const mensajeError = document.getElementById("mensajeError");
    
    if (nombre === "") {
        mensajeError.textContent = "⚠️ El nombre no puede estar vacío.";
        return;
    }
    
    if (amigos.includes(nombre)) {
        mensajeError.textContent = "⚠️ Este nombre ya ha sido agregado.";
        return;
    }

    amigos.push(nombre);
    mensajeError.textContent = ""; 
    actualizarLista();
    input.value = ""; 
}

function actualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = ""; 

    amigos.forEach((nombre, index) => {
        const li = document.createElement("li");
        li.textContent = nombre;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "❌";
        btnEliminar.onclick = () => eliminarAmigo(index);
        li.appendChild(btnEliminar);

        lista.appendChild(li);
    });
}

function eliminarAmigo(index) {
    amigos.splice(index, 1);
    actualizarLista();
}

function sortearAmigo() {
    if (amigos.length < 2) {
        document.getElementById("mensajeError").textContent = "⚠️ Se necesitan al menos 2 participantes.";
        return;
    }

    let asignaciones = {};
    let amigosDisponibles = [...amigos];

    amigos.forEach((amigo) => {
        let opciones = amigosDisponibles.filter((a) => a !== amigo);
        
        if (opciones.length === 0) {
            document.getElementById("mensajeError").textContent = "⚠️ No se pudo realizar el sorteo. Intente de nuevo.";
            return;
        }

        let elegido = opciones[Math.floor(Math.random() * opciones.length)];
        asignaciones[amigo] = elegido;
        amigosDisponibles = amigosDisponibles.filter((a) => a !== elegido);
    });

    mostrarResultados(asignaciones);
}

function mostrarResultados(asignaciones) {
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = ""; 

    for (const [amigo, asignado] of Object.entries(asignaciones)) {
        const li = document.createElement("li");
        li.textContent = `${amigo} → ${asignado}`;
        resultado.appendChild(li);
    }
}
