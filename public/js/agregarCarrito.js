window.addEventListener('load', function(){  
})
function agregarCarrito(nombre, precio){
    console.log('agregando al carrito' + nombre + precio)
    let sumarProducto = [];
    let producto = {
        nombre: nombre,
        precio: precio
    }
    sumarProducto.push(producto);
    console.log(sumarProducto);
    localStorage.setItem('productos', JSON.stringify(producto));
    location.href = 'https://hosteria-dh.onrender.com/profile'
    } 


