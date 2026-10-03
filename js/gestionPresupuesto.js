'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.error("Error: El valor introducido no es un número válido o es negativo.");
        return -1;
    }


}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
    
}

function CrearGasto(descripcion, valor) {
    {
        this.descripcion = descripcion;
        this.valor = esNumeroNoNegativo(valor) ? valor : 0;
    
        this.mostrarGasto = function () {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        };
    
        this.actualizarDescripcion = function (nuevaDescripcion) {
            this.descripcion = nuevaDescripcion;
        };
    
        this.actualizarValor = function (nuevoValor) {
            if (esNumeroNoNegativo(nuevoValor)) {
                this.valor = nuevoValor;
            }
        };
    }
}

// Comprueba que el valor sea un número válido y no negativo
function esNumeroNoNegativo(valor) {
    return typeof valor === "number" && !isNaN(valor) && valor >= 0;
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
