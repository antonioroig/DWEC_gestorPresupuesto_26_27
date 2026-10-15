// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict';
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
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

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    // Validacion del valor del numero
    if (!isNaN(valor) && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    // Inicializa la propiedad etiquetas
    this.etiquetas = [];

    // Gestion de la fecha (se guarda en timestamp)
    if (fecha !== undefined && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    // Metodos de la Práctica 1
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (!isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    // Metodos nuevos de la Practica 2
    this.actualizarFecha = function (nuevaFecha) {
        let timestamp = Date.parse(nuevaFecha);
        if (!isNaN(timestamp)) {
            this.fecha = timestamp;
        }
    };

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(function (etiqueta) {
            return !etiquetasABorrar.includes(etiqueta);
        });
    };

    this.mostrarGastoCompleto = function () {
        let fechaObj = new Date(this.fecha);
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaObj.toLocaleString()}\nEtiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }

        return texto;
    };

    // Si se pasaron etiquetas en el constructor, se añaden mediante el metodo
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }
}
//TODO, hecho.

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    gastos = gastos.filter(function (gasto) {
        return gasto.id !== id;
    });
}

function calcularTotalGastos() {
    return gastos.reduce(function (total, gasto) {
        return total + gasto.valor;
    }, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
