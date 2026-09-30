'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciadonpm audit fix

// TODO: Variable global
let presupuesto = 0;


function actualizarPresupuesto(valorInicial) {
    // TODO actualizarPresupuesto - Función de 1 parámetro que se encargará de actualizar la variable global presupuesto. 
    // Esta función comprobará que el valor introducido es un número no negativo: en caso de que sea un dato válido, 
    // actualizará la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error por pantalla y devolverá el valor -1.
    if (valorInicial > 0) {
        presupuesto = valorInicial;
        return valorInicial;
    }
    else {
        console.log('blablabla')
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
}

function CrearGasto() {
    // TODO
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
