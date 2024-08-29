import { cargarProductos } from '/js/uiFunciones.js';
import * as carritoFunciones from '/js/carritoFunciones.js';
import { obtenerClima } from '/js/clima.js';

window.agregarAlCarrito = carritoFunciones.agregarAlCarrito;
window.eliminarDelCarrito = carritoFunciones.eliminarDelCarrito;
window.realizarCompra = carritoFunciones.realizarCompra;
window.vaciarCarrito = carritoFunciones.vaciarCarrito;

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  obtenerClima();
});