window.addEventListener('load', function(){
   let mostrarCarrito = sessionStorage.getItem('productos');
   let mostrarCarrito2 = JSON.parse(mostrarCarrito);
    console.log(mostrarCarrito2)
    document.querySelector('#carrito').innerHTML = mostrarCarrito2.nombre
})
