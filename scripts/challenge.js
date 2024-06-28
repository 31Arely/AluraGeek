// Función para cargar productos desde la API
async function cargarProductos() {
    const response = await fetch('http://localhost:3000/productos');
    const productos = await response.json();
    const lista = document.getElementById('productos-lista');
    lista.innerHTML = '';

    productos.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-container--info">
                <p>${producto.nombre}</p>
                <div class="card-container--value">
                    <p>$ ${producto.precio}</p>
                    <img src="imgs/icon-basura.png" alt="Eliminar" class="delete-icon" data-id="${producto.id}">
                </div>
            </div>
        `;
        lista.appendChild(card);
    });

    // Añadir eventos de eliminación
    document.querySelectorAll('.delete-icon').forEach(button => {
        button.addEventListener('click', eliminarProducto);
    });
}


async function eliminarProducto(event) {
    const id = event.target.dataset.id;
    await fetch(`http://localhost:3000/productos/${id}`, {
        method: 'DELETE',
    });
    cargarProductos();
}


async function agregarProducto(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const imagen = document.getElementById('imagen').value;

    const nuevoProducto = {
        nombre,
        precio,
        imagen
    };

    await fetch('http://localhost:3000/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoProducto)
    });

    cargarProductos();
}


function limpiarFormulario() {

    var formulario = document.getElementById('producto-form');
    
    formulario.reset();
}

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', cargarProductos);

// Añadir evento para el formulario
document.getElementById('producto-form').addEventListener('submit', agregarProducto);

//Añadir evento para limpiar formulario
document.getElementById('producto-form').addEventListener('reset', limpiarFormulario)