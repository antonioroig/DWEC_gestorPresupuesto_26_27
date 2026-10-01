'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciadonpm audit fix

// TODO: Variable global
let presupuesto = 0;


function actualizarPresupuesto(valor) {    
    if (valor >= 0 && typeof valor === "number") {
        presupuesto = valor;
        return valor;
    }
    else {
        console.log('blablabla')
        return -1;
    }
}

function mostrarPresupuesto() {    
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor) {
    // TODO Función constructora que se encargará de crear un objeto gasto. Esta función devolverá un objeto de tipo gasto. 
    // Deberá comprobar que el valor introducido sea un núḿero no negativo; en caso contrario, asignará a la propiedad valor el valor 0.
    if (valor >= 0 && typeof valor === "number") {
        this.descripcion = descripcion;
        this.valor = valor;            
    } else {
        this.descripcion = descripcion;
        this.valor = 0;
    }

    //TODO mostrarGasto - Función sin parámetros que devolverá el texto: Gasto correspondiente a DESCRIPCION con valor VALOR €, 
    // siendo VALOR y DESCRIPCION las propiedades del objeto correspondientes. 
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }



    // actualizarDescripcion - Función de 1 parámetro que actualizará la descripción del objeto. 
    this.actualizarDescripcion = function(nuevaDesc) {
        this.descripcion = nuevaDesc;
    }

    // actualizarValor - Función de 1 parámetro que actualizará el valor del objeto. Se encargará de comprobar que el valor introducido sea un número no negativo; 
    // en caso contrario, dejará el valor como estaba.
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}
