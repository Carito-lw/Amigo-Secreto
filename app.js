// Array para almacenar los nombres de amigos
const amigos = new Set(); // Usar Set para evitar duplicados

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim();

    if (!nombre) {
        alert('Por favor, ingresa un nombre válido.');
        return;
    }

    if (amigos.has(nombre)) {
        alert('Este amigo ya está en la lista.');
        input.value = '';
        return;
    }

    amigos.add(nombre);
    input.value = '';
    mostrarLista();
}

function mostrarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = '';

    // Convertir Set a Array para iterar
    [...amigos].forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = amigo;
        
        // Botón para eliminar amigo
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '✖';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => eliminarAmigo(amigo);
        li.appendChild(deleteBtn);
        
        lista.appendChild(li);
    });
}

function eliminarAmigo(nombre) {
    amigos.delete(nombre);
    mostrarLista();
}

function sortearAmigo() {
    if (amigos.size === 0) {
        alert('No hay amigos para sortear.');
        return;
    }

    const amigosArray = [...amigos];
    const indiceAleatorio = Math.floor(Math.random() * amigosArray.length);
    const amigoSeleccionado = amigosArray[indiceAleatorio];
    
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = `<li>El amigo secreto es: <strong>${amigoSeleccionado}</strong></li>`;

    // Animación simple
    resultado.classList.add('resultado-animado');
    setTimeout(() => resultado.classList.remove('resultado-animado'), 1000);

    const sonido = document.getElementById('sonidoRuleta');
    sonido.currentTime = 0;
    sonido.play().catch(error => console.log('Error al reproducir sonido:', error));
}

// Evento para agregar amigo con Enter
document.getElementById('amigo').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') agregarAmigo();
});