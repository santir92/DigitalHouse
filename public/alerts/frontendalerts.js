const formulario = document.querySelector('#form');
const usuario = document.querySelector('#username');
const usuarioSpan = document.querySelector('#userSpan');
const password = document.querySelector('#password');
const passwordSpan = document.querySelector('#passwordSpan');
const boton = document.querySelector('.btn-inicio');

usuario.addEventListener("blur", () => {
    if(usuario.value.trim().length == 0){
        usuario.classList.add('warning');
        usuarioSpan.classList.add('errores')
        usuarioSpan.innerText = "El nombre de usuario es requerido"
    } else {
        usuario.classList.remove('warning');
        usuarioSpan.classList.remove('errores')
        usuarioSpan.innerText = ""
    }
})
password.addEventListener("blur", () => {
    if(password.value.trim().length == 0){
        password.classList.add('warning');
        passwordSpan.classList.add('errores')
        passwordSpan.innerText = "La contraseña es requerida"
    } else {
        password.classList.remove('warning');
        passwordSpan.classList.remove('errores')
        passwordSpan.innerText = ""
    }
})




formulario.addEventListener('submit', (e)=> {
    
    if(usuario.value.trim().length == 0 || password.value.trim().length == 0 ){
        e.preventDefault();
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Debes completar todos los campos.',
            showConfirmButton: false,
            timer: 1500
          })

    }

    //formulario.submit();

})

