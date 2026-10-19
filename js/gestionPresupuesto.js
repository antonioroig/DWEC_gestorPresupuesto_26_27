'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(value) {

    if (typeof value === "number" && value >= 0) {
        presupuesto = value;
        return presupuesto;
    }
    else {
        console.log('El valor no es válido');
        return -1;
    }

}

function mostrarPresupuesto() {
    // TODO
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    this.etiquetas = etiquetas;
    this.fecha = fecha;

    if (typeof valor === "number" && valor >= 0) {
        this.valor = valor;

    } else {
        this.valor = 0;
    }

    if (typeof fecha === "string" && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }


    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    }
    this.actualizarDescripcion = function (nvDesc) {
        this.descripcion = nvDesc;
    }
    this.actualizarValor = function (valor) {
        if (typeof valor === "number" && valor >= 0) {
            this.valor = valor;
        }
    }
    this.actualizarFecha = function (fecha) {

        if (typeof fecha === "string" && !isNaN(Date.parse(fecha))) {
            this.fecha = Date.parse(fecha);
        }
    }
    this.anyadirEtiquetas = function (...nvEtiquetas) {
        for (let i = 0; i < nvEtiquetas.length; i++) {
            if (!this.etiquetas.includes(nvEtiquetas[i])) {
                this.etiquetas.push(nvEtiquetas[i]);
            }
        }
    }
    this.borrarEtiquetas = function (...dltEtiquetas) {
        for (let i = 0; i < dltEtiquetas.length; i++) {
            let pos = this.etiquetas.indexOf(dltEtiquetas[i]);

            if (pos !== -1) {
                this.etiquetas.splice(pos, 1);
            }
        }
    }
    this.mostrarGastoCompleto = function () {
        let result = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`
        result += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        result += `Etiquetas:\n`
        for (let i = 0; i < etiquetas.length; i++) {
            result += `- ${etiquetas[i]}\n`
        }
        return result;
    }
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fechaGasto = new Date(this.fecha);
        let anyo = fechaGasto.getFullYear();
        let mes = fechaGasto.getMonth() + 1;
        let dia = fechaGasto.getDate();
        if (mes < 10) {
            mes = "0" + mes;
        }

        if (dia < 10) {
            dia = "0" + dia;
        }
        if (periodo === "dia") {
            return anyo + "-" + mes + "-" + dia;
        } else if (periodo === "mes") {
            return anyo + "-" + mes;
        } else if (periodo === "anyo") {
            return String(anyo);
        }
    };
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
    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
            break;
        }
    }
}


function calcularTotalGastos() {
    let calc = 0;
    for (let i = 0; i < gastos.length; i++) {
        calc += gastos[i].valor;
    }
    return calc;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtros) {
    return gastos.filter(function (gasto) {
        let cumple = true;

        if (filtros.fechaDesde !== undefined) {
            cumple = cumple && gasto.fecha >= Date.parse(filtros.fechaDesde);
        }
        if (filtros.fechaHasta !== undefined) {
            cumple = cumple && gasto.fecha <= Date.parse(filtros.fechaHasta);
        }
        if (filtros.valorMinimo !== undefined) {
            cumple = cumple && gasto.valor >= filtros.valorMinimo;
        }
        if (filtros.valorMaximo !== undefined) {
            cumple = cumple && gasto.valor <= filtros.valorMaximo;
        }
        if (filtros.descripcionContiene !== undefined) {
            cumple = cumple && gasto.descripcion.toLowerCase()
                .includes(filtros.descripcionContiene.toLowerCase());
        }
        if (filtros.etiquetasTiene !== undefined && filtros.etiquetasTiene.length > 0) {
            let etiquetasFiltro = filtros.etiquetasTiene.map(e => e.toLowerCase());
            cumple = cumple && gasto.etiquetas.some(
                e => etiquetasFiltro.includes(e.toLowerCase())
            );
        }

        return cumple;
    });


}

function agruparGastos(periodo, fechaDesde, fechaHasta, ...etiquetas) {

    filtrarGastos()
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
