import { cargarProductos } from "./uiFunciones.js";
import { obtenerClima } from "./clima.js";
import * as carritoFunciones from "./carritoFunciones.js";

window.agregarAlCarrito = carritoFunciones.agregarAlCarrito;
window.eliminarDelCarrito = carritoFunciones.eliminarDelCarrito;
window.realizarCompra = carritoFunciones.realizarCompra;
window.vaciarCarrito = carritoFunciones.vaciarCarrito;

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  obtenerClima();
  carritoFunciones.cargarCarritoDeLocalStorage();
});
