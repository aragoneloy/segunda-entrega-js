import Producto from "./producto";

let productos = []

if(localStorage.getItem('Productos')){
    productos = JSON.parse(localStorage.getItem('Productos'))
} else {
    localStorage.setItem('Productos', JSON.stringify(productos))
}

let formProducto = document.getElementById('convertidorPrecios')
let btnLimpiar = document.getElementById('btnLimpiar')
let listadoProductos = document.getElementById('listadoProductos')

// let listadoProductos = listadoProductos.innerHTML

formProducto = addEventListener('submit', (e) => {
    e.preventDefault()
    let producto = document.getElementById('IDproducto').value
    let precioEnDolares = document.getElementById('IDprecioEnDolares').value
    let precioEnPesos = parseFloat(precioEnDolares) * 100 * 1.35 * 1.30

    const product = new Producto(producto, precioEnDolares, precioEnPesos)
    productos.push(product)
    localStorage.setItem('Productos', JSON.stringify(productos))
    document.getElementById('convertidorPrecios').reset()
    
    console.log(productos)

    //mostrar listado de productos cargados en pantalla 
    productos.forEach((productosEnArray, indice, array) => {
        console.log(array)

        listadoProductos.insertAdjacentHTML('beforeend', ` <li id="producto${indice}" class="list-group-item">Producto nº: ${indice + 1} - Nombre: ${productosEnArray.producto} - Precio en pesos: $${productosEnArray.precioEnPesos}</li>`)
    })
   


})

btnLimpiar.addEventListener('click', () => {
    window.localStorage.clear()
    sessionStorage.clear()
    document.location.reload();
    
})






// let continuar
// do{
//     productos.push(new Producto(prompt("Ingrese nombre del producto"), parseFloat(prompt("Ingrese precio en uS$"))))
//     let eliminarUltimo = prompt("Confirmar carga? y/n").toLowerCase()
//     if (eliminarUltimo == "n"){
//         productos.pop()
//     } else if(eliminarUltimo == "y"){
//         continue
//     } else {
//         alert('Ingrese solo letras "y" o "n"')
//         break
//     }

//     let confirma = prompt("Agregar otro producto? y/n").toLowerCase()
//     if(confirma == "n" ){
//         continuar = false
//     }
 
// } while (continuar == true)


// console.log(productos)

//pasar los precios a pesos

// const productoEnPesos = productos.map((el) => {
//     return {
//         nombre: el.nombre,
//         precioEnPesos: el.precioEnDolares * 111 * 1.35 * 1.30
//     }
// })

// console.log(productoEnPesos)

