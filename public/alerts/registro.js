const formulario = document.querySelector('#form');
const nombre = document.querySelector('#name');
const nameSpan = document.querySelector('#nameSpan');
const email = document.querySelector('#email');
const emailSpan = document.querySelector('#emailSpan');
const password = document.querySelector('#password');
const passwordSpan = document.querySelector('#passwordSpan');
const username = document.querySelector('#username');
const usernameSpan = document.querySelector('#usernameSpan');
const image = document.querySelector('#image');
const imageSpan = document.querySelector('#imageSpan');

  
nombre.addEventListener("blur", () => {
    if(nombre.value.trim().length == 0){
        nombre.classList.add('warning');
        nameSpan.classList.add('errores')
        nameSpan.innerText = "El nombre es requerido"
    } else {
        nombre.classList.remove('warning');
        nameSpan.classList.remove('errores')
        nameSpan.innerText = ""
    }
});
email.addEventListener("blur", () => {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    if(email.value.trim().length == 0){
        email.classList.add('warning');
        emailSpan.classList.add('errores')
        emailSpan.innerText = "El email es requerido"
    } else if (email.value.trim().length < 5 || !regex.test(email.value)){
        email.classList.add('warning');
        emailSpan.classList.add('errores')
        emailSpan.innerText = "Ingresa un email valido"
    }     
    else {
        email.classList.remove('warning');
        emailSpan.classList.remove('errores')
        emailSpan.innerText = ""
    }
});
password.addEventListener("blur", () => {
    if(password.value.trim().length == 0){
        password.classList.add('warning');
        passwordSpan.classList.add('errores')
        passwordSpan.innerText = "La contraseña es requerida"
    } else if(password.value.trim().length < 8){
        password.classList.add('warning');
        passwordSpan.classList.add('errores')
        passwordSpan.innerText = "La contraseña debe contener minimo 8 caracteres"
    }
     else {
        password.classList.remove('warning');
        passwordSpan.classList.remove('errores')
        passwordSpan.innerText = ""
    }
});
username.addEventListener("blur", () => {
    if(username.value.trim().length == 0){
        username.classList.add('warning');
        usernameSpan.classList.add('errores')
        usernameSpan.innerText = "El nombre de usuario es requerido"
    } else {
        username.classList.remove('warning');
        usernameSpan.classList.remove('errores')
        usernameSpan.innerText = ""
    }
});
image.addEventListener("blur", () => {
    if(image.value.trim().length == 0){
        image.classList.add('warning');
        imageSpan.classList.add('errores')
        imageSpan.innerText = "La imagen es requerida"
    } else {
        image.classList.remove('warning');
        imageSpan.classList.remove('errores')
        imageSpan.innerText = ""
    }
});

formulario.addEventListener('submit', (e)=> {
    
    if(nombre.value.trim().length == 0 || password.value.trim().length == 0 || username.value.trim().length == 0 || email.value.trim().length == 0 || image.value.trim().length == 0){
        e.preventDefault();
        Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Debes completar todos los campos.',
            showConfirmButton: false,
            timer: 1500
          })

    }

})