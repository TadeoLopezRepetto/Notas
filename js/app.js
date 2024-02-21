const formulario = document.querySelector('#formulario')
const listaNotas= document.querySelector('#lista-notas')
let notas = []

eventListener()
function eventListener() {
    //usuario agrega notas
    formulario.addEventListener('submit',agregarNota)
    //documento listo 
    document.addEventListener('DOMContentLoaded',() =>{
        notas= JSON.parse(localStorage.getItem('notas')) || [];
        crearHTML()
        console.log(notas)

    })
}

function agregarNota(e) {
    e.preventDefault()

    //saber lo que el usuario escribe 
    const nota = document.querySelector('#notas').value;
    
    //validar nota
    if (nota==='') {
        mostrarError('El mensaje no puede ir vacio');
        return
    }
    //crear verificado para que la notas iguales no se mezclen
    const notaObj = {
        id: Date.now(),
        nota,
    }
    //añadir al arreglo 
    notas = [...notas,notaObj]
    //crear html
    crearHTML()

    //reiniciae el formulario
    formulario.reset()
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //agregar mensaje
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError)

    //eliminar alerta
    setTimeout(() => {
        mensajeError.remove()
    }, 2000);

}

function crearHTML() {

    limpiarHTML()

    if (notas.length > 0) {
        notas.forEach( nota =>{
            //crear boton
            const botonEliminar= document.createElement('a');
            botonEliminar.classList.add('borrar-nota')
            botonEliminar.innerHTML= 'X';

            //funcion de eliminar
            botonEliminar.onclick=() =>{
                borrarNotas(nota.id)
            }

            //crear HTML
            const li = document.createElement('li');
            li.textContent = nota.nota;

            //agregar en HTML
            li.appendChild(botonEliminar)
            listaNotas.appendChild(li)
        })
    }

    sinconizarStorage();
}

//eliminar nota
function borrarNotas (id) {
    notas = notas.filter(nota => nota.id !== id);
    crearHTML()
}


//agregar notas a locarStorage
function sinconizarStorage() {
    localStorage.setItem('notas',JSON.stringify(notas))
}

//limpiar html
function limpiarHTML() {
    while (listaNotas.firstChild) {
        listaNotas.removeChild(listaNotas.firstChild)
    }
}