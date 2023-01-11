window.addEventListener('load', function(){
   let mostrarCarrito = localStorage.getItem('productos');
   let mostrarCarrito2 = JSON.parse(mostrarCarrito);
    console.log(mostrarCarrito2)
    document.querySelector('#carrito').innerHTML = mostrarCarrito2.nombre
})
