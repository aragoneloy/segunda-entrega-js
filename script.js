import Producto from "./producto.js";

let productos = []

if(localStorage.getItem('Productos')){
    productos = JSON.parse(localStorage.getItem('Productos'))
} else {
    localStorage.setItem('Productos', JSON.stringify(productos))
}


let formProducto = document.getElementById('convertidorPrecios')
let btnLimpiar = document.getElementById('btnLimpiar')
let listadoProductos = document.getElementById('listadoProductos')




formProducto = addEventListener('submit', (e) => {
    e.preventDefault()
    let producto = document.getElementById('IDproducto').value
    let precioEnDolares = document.getElementById('IDprecioEnDolares').value
    let precioEnPesos = parseFloat(precioEnDolares) * 100 * 1.35 * 1.30
    
    
    const product = new Producto(producto, precioEnDolares, precioEnPesos)
    productos.push(product)
    localStorage.setItem('Productos', JSON.stringify(productos))
    document.getElementById('convertidorPrecios').reset()
    
    

    //mostrar listado de productos cargados en pantalla 
    listadoProductos.innerHTML = ""
   
    productos.forEach((productosEnArray, indice, array) => {
        console.log(array)    

                

        listadoProductos.insertAdjacentHTML("beforeend", ` <li id="producto${indice}" class="list-group-item">Producto nº: ${indice + 1} - 
        Nombre: ${productosEnArray.producto} - 
        Precio en pesos: $${productosEnArray.precioEnPesos}</li>`) 
            })
   


})


    


btnLimpiar.addEventListener('click', () => {
    
    window.localStorage.clear()
    sessionStorage.clear()
    document.location.reload();
    
})






