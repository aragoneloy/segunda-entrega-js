export default class Producto {
    constructor(producto, precioEnDolares, precioEnPesos){
        this.producto = producto
        this.precioEnDolares = parseFloat(precioEnDolares)
        this.precioEnPesos = precioEnPesos
    }
}
