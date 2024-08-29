import { agregarAlCarrito, cargarCarritoDeLocalStorage } from './carritoFunciones.js';

export let productos = [];

export function mostrarProductos() {
  const productosDiv = document.getElementById("productos");
  if (!productosDiv) {
    console.error("El elemento 'productos' no existe en el DOM");
    return;
  }
  
  productosDiv.innerHTML = "<h2 class='col-12 mb-4'>Productos Disponibles</h2>";

  productos.forEach((producto, index) => {
    const productoElement = document.createElement("div");
    productoElement.className = "col-md-6 col-lg-4 mb-4";
    productoElement.innerHTML = `
      <div class="card h-100">
        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.nombre}</h5>
          <p class="card-text">Precio: $${producto.precio}</p>
          <button onclick="agregarAlCarrito(${index})" class="btn btn-primary mt-auto">
            <i class="fas fa-cart-plus"></i> Agregar al carrito
          </button>
        </div>
      </div>
    `;
    productosDiv.appendChild(productoElement);
  });
}

export function cargarProductos() {
  fetch("data/productos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      productos = data.productos;
      mostrarProductos();
      cargarCarritoDeLocalStorage();
    })
    .catch((error) => {
      console.error("Error al cargar los productos:", error);
      Swal.fire({
        title: 'Error',
        text: `Hubo un error al cargar los productos: ${error.message}. Por favor, intenta de nuevo más tarde.`,
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    });
}