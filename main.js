import { cargarProductos } from './uiFunciones.js';
import * as carritoFunciones from './carritoFunciones.js';

// Hacer las funciones del carrito globales
window.agregarAlCarrito = carritoFunciones.agregarAlCarrito;
window.eliminarDelCarrito = carritoFunciones.eliminarDelCarrito;
window.realizarCompra = carritoFunciones.realizarCompra;
window.vaciarCarrito = carritoFunciones.vaciarCarrito;

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
});