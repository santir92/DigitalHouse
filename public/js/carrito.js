window.addEventListener('load', function(){
   let mostrarCarrito = localStorage.getItem('productos');
   let mostrarCarrito2 = JSON.parse(mostrarCarrito);
    console.log(mostrarCarrito2)
    let carrito = document.querySelector('#carrito')
    let carritoprecio = document.querySelector('#carritoprecio')

    carrito.innerHTML = mostrarCarrito2.nombre;
    carritoprecio.innerHTML += mostrarCarrito2.precio

})
