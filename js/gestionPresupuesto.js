'use strict';

// Variable global
let presupuesto = 0;
let gastos = new Array();
let idGasto = 0;

function actualizarPresupuesto(valor) {

    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    }
    else {
        console.log("Error: valor no válido");
        return -1;
    }

}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    this.descripcion = descripcion;
    this.valor = valor;
    this.fecha = fecha;
    this.etiquetas = etiquetas;

    if (typeof valor === "number" && valor >= 0) {
        this.valor = valor;
    }
    else {
        this.valor = 0;
    }

    if (typeof fecha === "string" && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    }
    else{
        this.fecha = Date.now();
    }

    this.mostrarGasto = function() {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
    this.anyadirEtiquetas = function(...newEtiquetas){
        for (let newEtiqueta of newEtiquetas) {
            if (!this.etiquetas.includes(newEtiqueta)) {
                this.etiquetas.push(newEtiqueta)
            }
        }
    }
    this.mostrarGastoCompleto = function() {
        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n";

        texto += "Fecha: " + new Date(this.fecha).toLocaleString() + "\n";
        texto += "Etiquetas:\n";

        for (let i = 0; i < this.etiquetas.length; i++) {
            texto += "- " + this.etiquetas[i] + "\n";
        }

        return texto;
    }
    this.actualizarFecha = function(nuevaFecha) {
        if (typeof nuevaFecha === "string" && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let i = 0; i < nuevasEtiquetas.length; i++) {

            if (!this.etiquetas.includes(nuevasEtiquetas[i])) {
                this.etiquetas.push(nuevasEtiquetas[i]);
            }

        }
    }
    this.borrarEtiquetas = function(...etiquetasBorrar) {
        this.etiquetas = this.etiquetas.filter(function(etiqueta) {
            return !etiquetasBorrar.includes(etiqueta);
        })
    }

    
    this.obtenerPeriodoAgrupacion = function(periodo) {

    let fecha = new Date(this.fecha).toISOString().split("T")[0];

    if (periodo === "dia") {
        return fecha;
    }
    else if (periodo === "mes") {
        return fecha.substring(0, 7);
    }
    else if (periodo === "anyo") {
        return fecha.substring(0, 4);
    }};
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    gastos = gastos.filter(function(gasto) {
        return gasto.id !== id;
    })
}

function calcularTotalGastos() {

    let total = 0;

    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }

    return total;
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}


function filtrarGastos(filtros = {}) {

    return gastos.filter(function(gasto) {

        if (filtros.fechaDesde !== undefined &&
            gasto.fecha < Date.parse(filtros.fechaDesde)) {
            return false;
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
            !gasto.descripcion.toLowerCase().includes(
                filtros.descripcionContiene.toLowerCase())) {
            return false;
        }

        if (filtros.etiquetasTiene !== undefined &&
            filtros.etiquetasTiene.length > 0) {

            let coincide = gasto.etiquetas.some(function(etiqueta) {
                return filtros.etiquetasTiene.some(function(filtro) {
                    return etiqueta.toLowerCase() === filtro.toLowerCase();
                });
            });

            if (!coincide) {
                return false;
            }
        }

        return true;
    });
}




function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta = new Date().toISOString()) {

    let gastosFiltrados = filtrarGastos({
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta,
        etiquetasTiene: etiquetas
    });

    let resultado = gastosFiltrados.reduce(function(acumulador, gasto) {

        let fecha = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acumulador[fecha] == undefined) {
            acumulador[fecha] = 0;
        }

        acumulador[fecha] = acumulador[fecha] + gasto.valor;

        return acumulador;

    }, {});

    return resultado;
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
    agruparGastos,
}