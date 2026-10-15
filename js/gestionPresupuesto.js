// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && !isNaN(valor) && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    }
    console.log("Error: el valor introducido no es un número no negativo");
    return -1;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(concepto, valor, fecha, ...etiquetas) {
    this.concepto = concepto;
    this.descripcion = concepto;

    if (typeof valor === "number" && !isNaN(valor) && valor >= 0) {
        this.valor = valor;
        this.cantidad = valor;
    } else {
        this.valor = 0;
        this.cantidad = 0;
    }

    this.etiquetas = [];

    let parsedDate = Date.parse(fecha);
    if (fecha !== undefined && !isNaN(parsedDate)) {
        this.fecha = parsedDate;
    } else {
        this.fecha = Date.now();
    }

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.concepto || this.descripcion} con valor ${this.valor || this.cantidad} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.concepto = nuevaDescripcion;
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === "number" && !isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
            this.cantidad = nuevoValor;
        }
    };

    this.mostrarGastoCompleto = function () {
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let desc = this.concepto !== undefined ? this.concepto : this.descripcion;
        let val = this.valor !== undefined ? this.valor : this.cantidad;

        let res = `Gasto correspondiente a ${desc} con valor ${val} €.\nFecha: ${fechaLocal}\nEtiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
            res += `- ${etiqueta}\n`;
        }

        return res;
    };

    this.actualizarFecha = function (nuevaFecha) {
        let parsedDate = Date.parse(nuevaFecha);
        if (!isNaN(parsedDate)) {
            this.fecha = parsedDate;
        }
    };

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        nuevasEtiquetas.forEach(etiqueta => {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        });
    };

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
    };

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }
}

// ==========================================
// Funciones del Gestor de Presupuesto
// ==========================================

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let index = gastos.findIndex(gasto => gasto.id === id);
    if (index !== -1) {
        gastos.splice(index, 1);
    }
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + (gasto.valor !== undefined ? gasto.valor : gasto.cantidad), 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos(); 
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}