import Producto from "./producto.js";



//variables globales
let productos = []
let formProducto = document.getElementById('convertidorPrecios')
let btnLimpiar = document.getElementById('btnLimpiar')
let listadoProductos = document.getElementById('listadoProductos')
let tasaCorreo = 140
let dolarSolidario = 
    fetch('https://criptoya.com/api/dolar')
    .then((promesa) => promesa.json())
    .then(data => {
      let {solidario} = data
      dolarSolidario = `${solidario}`
    })


//Agrego el array de productos al local storage
localStorage.getItem('Productos') ? productos = JSON.parse(localStorage.getItem('Productos')) : localStorage.setItem('Productos', JSON.stringify(productos))


//mostrar listado de productos guardados
if (productos.length) {
  
listadoProductos.innerHTML = ""
   
productos.forEach((productosEnArray, indice, array) => {
     
              
  listadoProductos.insertAdjacentHTML("beforeend", ` <li id="producto${indice}" class="list-group-item">
    Nombre: ${productosEnArray.producto} - 
    US$ ${productosEnArray.precioEnDolares}  => 
    $ ${productosEnArray.precioEnPesos.toFixed(2)}</li>`) 
     
})
}



//Acciones al enviar la forma
formProducto = addEventListener('submit', (e) => {
  e.preventDefault()
  
  
  let producto = document.getElementById('IDproducto').value
  let precioEnDolares = document.getElementById('IDprecioEnDolares').value
  let precioEnPesos
  

  precioEnPesos = precioEnDolares < 50 ?  parseFloat(precioEnDolares) * dolarSolidario + tasaCorreo : (parseFloat(precioEnDolares) + (parseFloat(precioEnDolares) - 50) * 0.5) * dolarSolidario + tasaCorreo
  
  
  
  const product = new Producto(producto, precioEnDolares, precioEnPesos)
  productos.push(product)
  localStorage.setItem('Productos', JSON.stringify(productos))
  document.getElementById('convertidorPrecios').reset()
  


  //mostrar listado de productos cargados en pantalla 
  listadoProductos.innerHTML = ""
  
  productos.forEach((productosEnArray, indice, array) => {
      
            
    listadoProductos.insertAdjacentHTML("beforeend", ` <li id="producto${indice}" class="list-group-item">
      Nombre: ${productosEnArray.producto} - 
      US$${productosEnArray.precioEnDolares} =>
      $${productosEnArray.precioEnPesos.toFixed(2)}</li>`) 
    
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


// cotizacion del dolar
fetch('https://criptoya.com/api/dolar')
    .then((promesa) => promesa.json())
    .then(data => {
    let {oficial, solidario, mep, megd30, ccl, cclgd30, ccb, blue} = data
    divDolar.innerHTML = `
    <p>Oficial: $${oficial}</p>
    <p>Solidario: $${solidario}</p>
    <p>Dolar MEP: $${mep}</p>
    
    <p>Contado con Liquidacion: $${ccl}</p>
    <p>Contado con Liqui(GD30): $${cclgd30}</p>
    <p>Contado con Bitcoin: $${ccb}</p>
    <p>Blue: $${blue}</p>
    
    `
  })



