// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

"use strict";

let presupuesto = 0;

function actualizarPresupuesto(valor)
 {
   let cantidad = Number(valor);

   if(isNaN(cantidad) || cantidad < 0)
   {
    console.error("error, el presupuesto introducido no es válido");
    return -1
   }
    presupuesto = cantidad;
    return presupuesto
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor)
{
    this.descripcion = descripcion;
    valor = Number(valor);

    if(valor <= 0 || isNaN(valor))
    {
        this.valor = 0;
    }
    else
    {
        this.valor= valor;
    }
    
    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €"
    }

    this.actualizarDescripcion = function(nuevaDescripcion)
    {
        this.descripcion = nuevaDescripcion;
        return this.descripcion;
    };

    this.actualizarValor = function(nuevoValor)
    {
        let numero = Number(nuevoValor);
        
        if(isNaN(numero) || numero < 0)
        {
            return this.valor;
        }

        this.valor = numero;
        this.valor;
        
    };


}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
