'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0

function actualizarPresupuesto(valor) {
    // TODO
    if(typeof valor === "number" && valor >= 0)
    {
        presupuesto = valor;
    }
    else
    {
        console.log("Error: el presupuesto debe ser un número negativo");
        valor = -1
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO
    this.descripcion = descripcion;
    if (typeof valor === "number" && valor > 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    this.mostrarGasto = function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion)
    {
        this.descripcion = nuevaDescripcion;
    }
    
    this.actualizarValor = function(nuevoValor)
    {
        if (typeof nuevoValor === "number" && nuevoValor > 0)
            {
                this.valor = nuevoValor;
            }
    }
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
