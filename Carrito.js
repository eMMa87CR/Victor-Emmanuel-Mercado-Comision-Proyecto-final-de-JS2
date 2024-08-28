export class Carrito {
    constructor() {
      this.productos = [];
    }
  
    agregarProducto(producto) {
      const existente = this.productos.find((p) => p.nombre === producto.nombre);
      if (existente) {
        existente.cantidad++;
      } else {
        const nuevoProducto = { ...producto, cantidad: 1 };
        this.productos.push(nuevoProducto);
      }
    }
  
    eliminarProducto(nombre) {
      const index = this.productos.findIndex((p) => p.nombre === nombre);
      if (index !== -1) {
        if (this.productos[index].cantidad > 1) {
          this.productos[index].cantidad--;
        } else {
          this.productos.splice(index, 1);
        }
      }
    }
  
    calcularTotal() {
      return this.productos.reduce(
        (total, producto) => total + producto.precio * producto.cantidad,
        0
      );
    }
  
    vaciar() {
      this.productos = [];
    }
  }