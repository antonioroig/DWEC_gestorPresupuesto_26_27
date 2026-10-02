// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict';
let presupuesto = 0;
// TODO: Variable global


function actualizarPresupuesto(nuevoPresupuesto) {

    if (!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } 
    else 
        {
        console.log("Error: el valor introducido no es válido.");
        return -1;
    }
    // TODO, hecho.
}

function mostrarPresupuesto() {

    return `Tu presupuesto actual es de ${presupuesto} €`;
    // TODO, hecho.
}

function CrearGasto(descripcion, valor) {

    this.descripcion = descripcion;

    // Es numero no negativo?
    if (!isNaN(valor) && valor >= 0) 
        {
        this.valor = valor;
        } else 
            {
            this.valor = 0;
            }

            this.mostrarGasto = function () 
            {
                return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
            };

            this.actualizarDescripcion = function (nuevaDescripcion) 
            {
                this.descripcion = nuevaDescripcion;
            };

            this.actualizarValor = function (nuevoValor) 
            {
                if (!isNaN(nuevoValor) && nuevoValor >= 0) 
                    {
                    this.valor = nuevoValor;
                    }
            };
        }
//TODO, hecho.

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
