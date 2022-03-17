import Producto from "./producto.js";

//variables globales
let productos = []
let formProducto = document.getElementById('convertidorPrecios')
let btnLimpiar = document.getElementById('btnLimpiar')
let listadoProductos = document.getElementById('listadoProductos')


//Agrego el array de productos al local storage
localStorage.getItem('Productos') ? productos = JSON.parse(localStorage.getItem('Productos')) : localStorage.setItem('Productos', JSON.stringify(productos))


//Acciones al enviar la forma
formProducto = addEventListener('submit', (e) => {
    e.preventDefault()
    
    let producto = document.getElementById('IDproducto').value
    let precioEnDolares = document.getElementById('IDprecioEnDolares').value
    let precioEnPesos = parseFloat(precioEnDolares) * 114 * 1.35 * 1.30
    
    
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
      
      //toast de producto cargado correctamente
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
      })
              
      Toast.fire({
        icon: 'success',
        title: 'Producto convertido y agregado correctamente'
        })

})

 


btnLimpiar.addEventListener('click', () => {
    
  //alert confirmar limpieza
  Swal.fire({
    title: 'Desea eliminar todos los productos de la lista?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Limpiar',
    denyButtonText: `No, conservar la lista`,
  }).then((result) => {
       
    if (result.isConfirmed) {
      window.localStorage.clear()
      sessionStorage.clear()
      document.location.reload();
      Swal.fire('Se limpio la lista!', '', 'success')
    } else if (result.isDenied) {
        Swal.fire('No se eliminaron los productos', '', 'info')
        }
      })
    
     
    

    
    
})






