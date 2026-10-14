'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
// TODO: Variable global


function actualizarPresupuesto(presupuestoActualizado) {
    if(!isNaN(presupuestoActualizado) && presupuestoActualizado > 0){
        presupuesto = presupuestoActualizado;
        return presupuesto;
    }
    else{
        return -1
        console.log('blabla')
    }

}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    if(typeof valor === "number" && valor > 0){
        this.valor = valor;   
        this.descripcion = descripcion;   
    }
    else{
        this.valor = 0;
        this.descripcion = descripcion;
    }

    if(typeof fecha === "string" && !isNaN(Date.parse(fecha))){
        this.fecha = Date.parse(fecha);
    }
    else{
        this.fecha = Date.now();
    }

    this.etiquetas = [];
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevadesc){
        this.descripcion = nuevadesc;
    };
    
    this.actualizarValor = function(nuevovalor) {
        if (typeof nuevovalor === "number" && !isNaN(nuevovalor) && nuevovalor >= 0) {
            this.valor = nuevovalor;
            return this.valor;
        } 
        else {
            return -1;
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let nuevaEtiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(nuevaEtiqueta)) {
                this.etiquetas.push(nuevaEtiqueta);
            }
        }
    };

    this.actualizarFecha = function(nuevaFecha) {
        if (typeof nuevaFecha === "string" && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    }

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        for(let etiquetaABorrar of etiquetasABorrar) {
            if(this.etiquetas.includes(etiquetaABorrar)) {
                let index = this.etiquetas.indexOf(etiquetaABorrar);
                this.etiquetas.splice(index, 1);
            }
        }
    }
    this.mostrarGastoCompleto = function() {

        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:`;

        for (let etiqueta of this.etiquetas) {
            texto += `\n- ${etiqueta}`;
        }
        texto += `\n`;
        return texto;
    };

    this.anyadirEtiquetas(...etiquetas);


    return this;
}

function listarGastos(){
    if(gastos.length === 0){
        return [];
    }
    else{
        return gastos;
    }
}

function anyadirGasto(gastoNuevo){
    gastoNuevo.id = idGasto;
    idGasto++;
    gastos.push(gastoNuevo);
}

function borrarGasto(idGastoABorrar){
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id == idGastoABorrar){
            gastos.splice(i,1);
        }
    }
}

function calcularBalance(){
    let gastosTotales = calcularTotalGastos();
    let balance = presupuesto - gastosTotales;
    return balance;
}

function calcularTotalGastos(){
    let totalGastos = 0;
    for(let gasto of gastos){
        totalGastos += gasto.valor;
    }
    return totalGastos;
}
function agruparGastos(){

}
function filtrarGastos(){
    
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
    calcularBalance,
    agruparGastos,
    filtrarGastos,

}
