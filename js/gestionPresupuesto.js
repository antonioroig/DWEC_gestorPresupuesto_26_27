// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0
// TODO: Variable global

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO Función de 1 parámetro que se encargará de actualizar la variable global presupuesto. Esta función comprobará que el valor introducido es un número no negativo: en caso de que sea un dato válido, actualizará la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error por pantalla y devolverá el valor -1.

    if (typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.error("El valor introducido es un número negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO Función sin parámetros que se encargará de devolver el texto siguiente: Tu presupuesto actual es de X €.
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor) {
    // TODO Función constructora que se encargará de crear un objeto gasto. Esta función devolverá un objeto de tipo gasto. Deberá comprobar que el valor introducido sea un núḿero no negativo; en caso contrario, asignará a la propiedad valor el valor 0
    valor = parseFloat(valor);
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    this.descripcion = descripcion;
    this.valor = valor;

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        nuevoValor = parseFloat(nuevoValor);
        // Solo se actualiza si es un número no negativo
        if (!isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
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
