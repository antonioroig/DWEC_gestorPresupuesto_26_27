'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let idGasto = 0;
let gastos = [];

function actualizarPresupuesto(valor) {
    // TODO
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
    }
    else {
        console.log("Error: el presupuesto debe ser un número no negativo.");
        valor = -1;
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = String(descripcion);

    if (typeof valor === "number" && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (isNaN(Date.parse(fecha))) {
        this.fecha = Date.now();
    }
    else {
        this.fecha = Date.parse(fecha);
    }

    this.etiquetas = [];

    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${descripcion} con valor ${valor} €`
    }

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }

        return texto;
    }

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = String(nuevaDescripcion);
    }

    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }

    this.actualizarFecha = function (nuevaFecha) {
        if (isNaN(Date.parse(nuevaFecha)) === false) {
            this.fecha = Date.parse(nuevaFecha);
        }
    }

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function (...etiquetas) {
        this.etiquetas = this.etiquetas.filter(
            etiqueta => !etiquetas.includes(etiqueta)
        )
    }

    this.obtenerPeriodoAgrupacion = function (periodo) {
        this.fecha = new Date(fecha);

        const anyo = String(this.fecha.getFullYear());
        const mes = String(this.fecha.getMonth() + 1).padStart(2, '0');
        const dia = String(this.fecha.getDate()).padStart(2, '0');

        switch (periodo) {
            case 'dia':
                return `${anyo}-${mes}-${dia}`;
            case 'mes':
                return `${anyo}-${mes}`;
            case 'anyo':
                return anyo
            default:
                return null
        }
    }

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let posicion = gastos.findIndex(gasto => gasto.id === id);

    if (posicion != -1) {
        gastos.splice(posicion, 1);
    }
}

function calcularTotalGastos() {
    let suma = 0;

    for (let gasto of gastos) {
        suma += gasto.valor;
    }

    return suma;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros) {
    return gastos.filter(gasto => {

        if (filtros.fechaDesde !== undefined &&
            gasto.fecha < Date.parse(filtros.fechaDesde)) {
            return false
        }

        if (filtros.fechaHasta !== undefined &&
            gasto.fecha > Date.parse(filtros.fechaHasta)) {
            return false;
        }

        if (filtros.valorMinimo !== undefined &&
            gasto.valor < filtros.valorMinimo) {
            return false;
        }

        if (filtros.valorMaximo !== undefined &&
            gasto.valor > filtros.valorMaximo) {
            return false;
        }

        if (filtros.descripcionContiene !== undefined &&
            !gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
            return false;
        }
        
        if (filtros.etiquetasTiene !== undefined &&
            !filtros.etiquetasTiene.some(etiqueta => gasto.etiquetas.some(etiquetaGasto =>
                etiquetaGasto.toLowerCase() === etiqueta.toLowerCase())
            )
        ) {
            return false;
        }

        return true
    }
    )
}


function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    let filtros = {};

    if (etiquetas.length > 0) {
        filtros.etiquetasTiene = etiquetas;
    }

    if (fechaDesde !== undefined) {
        filtros.fechaDesde = fechaDesde;
    }

    if (fechaHasta !== undefined) {
        filtros.fechaHasta = fechaHasta;
    }

    let gastosFiltrados = filtrarGastos(filtros);

    return gastosFiltrados.reduce(function(acc, gasto) {
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[periodoAgrupacion] === undefined) {
            acc[periodoAgrupacion] = 0;
        }

        acc[periodoAgrupacion] += gasto.valor;

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
