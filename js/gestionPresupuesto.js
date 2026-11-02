"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0 && !Number.isNaN(valor)) {
        return presupuesto = valor;
    }

    console.error("Error: El presupuesto debe ser un número no negativo");
    return -1;
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (typeof valor === "number" && valor >= 0 && !Number.isNaN(valor)) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    // La fecha se guarda como timestamp. Si no se indica o no es válida, se usa la fecha actual
    let timestamp = Date.parse(fecha);
    this.fecha = Number.isNaN(timestamp) ? Date.now() : timestamp;

    this.etiquetas = [];

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (descripcion) {
        this.descripcion = descripcion;
    };

    this.actualizarValor = function (valor) {
        if (typeof valor === "number" && valor >= 0 && !Number.isNaN(valor)) {
            this.valor = valor;
        }
    };

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`; // new Date(this.fecha) para pasar de timestamp (milisegundos) en un objeto tipo fecha para usar funciones
        texto += "Etiquetas:\n";

        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }

        return texto;
    };

    this.actualizarFecha = function (fecha) {
        let timestamp = Date.parse(fecha);

        if (!Number.isNaN(timestamp)) {
            this.fecha = timestamp;
        }
    };

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            // Solo se añade si no existe ya, para evitar duplicados
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };
    // tambien se puede hacer asi con set
    /*
    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        this.etiquetas = [...new Set([...this.etiquetas, ...nuevasEtiquetas])];
    };
    */

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(
            etiqueta => !etiquetasABorrar.includes(etiqueta)
        );
    };

    // Las etiquetas recibidas en el constructor se añaden con el propio método del objeto para evitar errores
    this.anyadirEtiquetas(...etiquetas);

    this.obtenerPeriodoAgrupacion = function (periodo = "mes") {
        let fecha = new Date(this.fecha);

        switch (periodo) {
            case "anyo":
                return fecha.getFullYear();
            case "mes":
                return fecha.getFullYear() + "-" + (fecha.getMonth() + 1).toString().padStart(2, "0");
            case "dia":
                return fecha.getFullYear() + "-" + (fecha.getMonth() + 1).toString().padStart(2, "0") + "-" + fecha.getDate().toString().padStart(2, "0");
            default:
                return "";
        }
    };
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id);
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({ fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene } = {}) {
    return gastos.filter(gasto => {
        if (fechaDesde !== undefined && gasto.fecha < Date.parse(fechaDesde)) {
            return false;
        }
        if (fechaHasta !== undefined && gasto.fecha > Date.parse(fechaHasta)) {
            return false;
        }
        if (valorMinimo !== undefined && gasto.valor < valorMinimo) {
            return false;
        }
        if (valorMaximo !== undefined && gasto.valor > valorMaximo) {
            return false;
        }
        if (descripcionContiene !== undefined && !gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())) {
            return false;
        }
        if (etiquetasTiene !== undefined && etiquetasTiene.length > 0 && !gasto.etiquetas.some(etiqueta => etiquetasTiene.includes(etiqueta))) {
            return false;
        }
        return true;
    });
}
// Alternativa a los if mas compacta y profesional
/*
function filtrarGastos({ fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene } = {}) {
    return gastos.filter(gasto =>
        (fechaDesde === undefined || gasto.fecha >= Date.parse(fechaDesde)) &&
        (fechaHasta === undefined || gasto.fecha <= Date.parse(fechaHasta)) &&
        (valorMinimo === undefined || gasto.valor >= valorMinimo) &&
        (valorMaximo === undefined || gasto.valor <= valorMaximo) &&
        (descripcionContiene === undefined || gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())) &&
        (etiquetasTiene === undefined || etiquetasTiene.length === 0 || gasto.etiquetas.some(e => etiquetasTiene.includes(e)))
    );
}
*/

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta = new Date().toISOString()) {
    let gastosFiltrados = filtrarGastos({ fechaDesde, fechaHasta, etiquetasTiene: etiquetas });
    return gastosFiltrados.reduce((acc, gasto) => {
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[periodoAgrupacion] = (acc[periodoAgrupacion] || 0) + gasto.valor;
        return acc;
    }, {});
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}