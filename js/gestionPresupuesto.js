'use strict';

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(typeof valor === `number` && !isNaN(valor) && valor >= 0) {
        presupuesto = valor;
    }
    else{
        console.error(`El valor del presupuesto debe ser un número mayor o igual a 0`);
        valor = -1;
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    //alert(`Tu presupuesto actual es de ${presupuesto}`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
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
    gastos = gastos.filter(gasto => gasto.id !== id);
}
function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function CrearGasto(descripcion, valor,fecha, ...etiquetas) {
    // TODO
    this.descripcion = String(descripcion);
    this.valor = (typeof valor === 'number' && valor >= 0) ? valor : 0;

    let fechaParsada = Date.parse(fecha);
    this.fecha = !isNaN(fechaParsada) ? fechaParsada : Date.now();
    this.etiquetas = [];

    this.mostrarGastoCompleto = function() {

        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:`;
        
        for (let etiqueta of this.etiquetas) {
            texto += `\n- ${etiqueta}`;
        }
        
        return texto + "\n";
    };
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = String(nuevaDescripcion);
    };
    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };
    this.anyadirEtiquetas(...etiquetas);
    this.borrarEtiquetas = function(...etiquetasAborrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasAborrar.includes(etiqueta));
    };

    this.actualizarFecha = function(nuevaFecha) {
        let parsed = Date.parse(nuevaFecha);
        if (!isNaN(parsed)) {
            this.fecha = parsed;
        }
    };
    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha);
        switch(periodo){
            case 'dia':
                return fecha.getFullYear() + '-' + fecha.getMonth() + '-' + fecha.getDate();
            case 'mes':
                return fecha.getFullYear() + '-' + fecha.getMonth();
            case 'anyo':
                return fecha.getFullYear();
            default:
                return null;
        }
    }
}
function filtrarGastos(){

}
function agruparGastos(){

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
};
