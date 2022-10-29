class Item {
    producto; //objeto
    cantidad;
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }

    precioTotal() {
        return this.precio * this.producto.precio;
    }
}