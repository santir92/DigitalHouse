const nombre = document.querySelector('#nombre')
const nombreSpan = document.querySelector('#nombreSpan')

const valor = document.querySelector('#valor')
const valorSpan = document.querySelector('#valorSpan')

const participantes = document.querySelector('#participantes')
const participantesSpan = document.querySelector('#participantesSpan')

const categoria = document.querySelector('#categoria')
const categoriaSpan = document.querySelector('#categoriaSpan')

const imgPrincipal = document.querySelector('#imgPrincipal')
const imgPrincipalSpan = document.querySelector('#imgPrincipalSpan')

nombre.addEventListener("blur", () => {
    if(nombre.value.trim().length == 0){
        nombre.classList.add('warning');
        nombreSpan.classList.add('errores')
        nombreSpan.innerText = "El nombre de la actividad es requerido"
    } else {
        nombre.classList.remove('warning');
        nombreSpan.classList.remove('errores')
        nombreSpan.innerText = ""
    }
})

valor.addEventListener("blur", () => {
    if(valor.value.trim().length == 0){
        valor.classList.add('warning');
        valorSpan.classList.add('errores')
        valorSpan.innerText = "El valor de la actividad es requerido"
    } else {
        valor.classList.remove('warning');
        valorSpan.classList.remove('errores')
        valorSpan.innerText = ""
    }
})

participantes.addEventListener("blur", () => {
    if(participantes.value.trim().length == 0){
        participantes.classList.add('warning');
        participantesSpan.classList.add('errores')
        participantesSpan.innerText = "El número de participantes es requerido"
    } else {
        participantes.classList.remove('warning');
        participantesSpan.classList.remove('errores')
        participantesSpan.innerText = ""
    }
})

categoria.addEventListener("blur", () => {
    if(categoria.value == ''){
        categoria.classList.add('warning');
        categoriaSpan.classList.add('errores')
        categoriaSpan.innerText = "La categoría es requerida"
    } else {
        categoria.classList.remove('warning');
        categoriaSpan.classList.remove('errores')
        categoriaSpan.innerText = ""
    }
})

imgPrincipal.addEventListener("blur", () => {
    if(imgPrincipal.value == ''){
        imgPrincipal.classList.add('warning');
        imgPrincipalSpan.classList.add('errores')
        imgPrincipalSpan.innerText = "La categoría de la actividad es requerida"
    } else {
        imgPrincipal.classList.remove('warning');
        imgPrincipalSpan.classList.remove('errores')
        imgPrincipalSpan.innerText = ""
    }
})