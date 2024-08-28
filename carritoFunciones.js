import { Carrito } from './Carrito.js';
import { Producto } from './Producto.js';
import { productos } from './uiFunciones.js';

const carrito = new Carrito();

export function agregarAlCarrito(index) {
  const productoAgregado = productos[index];
  if (productoAgregado) {
    carrito.agregarProducto(productoAgregado);
    actualizarCarrito();
    guardarCarritoEnLocalStorage();

    Swal.fire({
      title: '¡Producto agregado!',
      text: `Se ha agregado ${productoAgregado.nombre} al carrito`,
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 800,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  } else {
    console.error('Producto no encontrado');
  }
}

export function actualizarCarrito() {
  const carritoDropdown = document.getElementById("carrito-dropdown");
  const carritoCantidad = document.getElementById("carrito-cantidad");

  carritoDropdown.innerHTML = '';

  if (carrito.productos.length === 0) {
    carritoDropdown.innerHTML = '<li><span class="dropdown-item-text">El carrito está vacío</span></li>';
  } else {
    carrito.productos.forEach((producto) => {
      const dropdownItem = document.createElement("li");
      dropdownItem.innerHTML = `
        <div class="dropdown-item-text d-flex justify-content-between align-items-center">
          <span>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</span>
          <button class="btn btn-sm btn-danger" onclick="eliminarDelCarrito('${producto.nombre}')">
            <i class="fas fa-minus"></i>
          </button>
        </div>
      `;
      carritoDropdown.appendChild(dropdownItem);
    });

    const totalItem = document.createElement("li");
    totalItem.innerHTML = `<div class="dropdown-item-text font-weight-bold">Total: $${carrito.calcularTotal()}</div>`;
    carritoDropdown.appendChild(totalItem);

    const botonesItem = document.createElement("li");
    botonesItem.innerHTML = `
      <div class="dropdown-item-text d-flex justify-content-between">
        <button class="btn btn-sm btn-primary" onclick="realizarCompra()">
          <i class="fas fa-shopping-bag"></i> Comprar
        </button>
        <button class="btn btn-sm btn-danger" onclick="vaciarCarrito()">
          <i class="fas fa-trash"></i> Vaciar
        </button>
      </div>
    `;
    carritoDropdown.appendChild(botonesItem);
  }

  carritoCantidad.textContent = carrito.productos.reduce((total, producto) => total + producto.cantidad, 0);
}

export function eliminarDelCarrito(nombre) {
  carrito.eliminarProducto(nombre);
  actualizarCarrito();
  guardarCarritoEnLocalStorage();
}

export function realizarCompra() {
  if (carrito.productos.length === 0) {
    Swal.fire({
      title: 'Carrito vacío',
      text: 'No hay productos en el carrito para comprar.',
      icon: 'warning',
      confirmButtonText: 'Entendido'
    });
  } else {
    Swal.fire({
      title: '¡Compra realizada con éxito!',
      text: `Total: $${carrito.calcularTotal()}. Muchas gracias por su compra.`,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        carrito.vaciar();
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
      }
    });
  }
}

export function vaciarCarrito() {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "Se eliminarán todos los productos del carrito",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, vaciar carrito',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      carrito.vaciar();
      actualizarCarrito();
      guardarCarritoEnLocalStorage();
      Swal.fire(
        '¡Carrito vaciado!',
        'El carrito ha sido vaciado con éxito.',
        'success'
      );
    }
  });
}

export function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito.productos));
}

export function cargarCarritoDeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const productosGuardados = JSON.parse(carritoGuardado);
    productosGuardados.forEach((producto) => {
      const prod = new Producto(producto.nombre, producto.precio);
      prod.cantidad = producto.cantidad;
      carrito.agregarProducto(prod);
    });
    actualizarCarrito();
  }
}