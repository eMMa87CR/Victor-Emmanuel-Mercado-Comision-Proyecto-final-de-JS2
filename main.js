import { cargarProductos } from './uiFunciones.js';
import * as carritoFunciones from './carritoFunciones.js';
import { obtenerClima } from './clima.js';

window.agregarAlCarrito = carritoFunciones.agregarAlCarrito;
window.eliminarDelCarrito = carritoFunciones.eliminarDelCarrito;
window.realizarCompra = carritoFunciones.realizarCompra;
window.vaciarCarrito = carritoFunciones.vaciarCarrito;

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  obtenerClima();
});