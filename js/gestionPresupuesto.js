// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict';
// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    let numero = Number(valor);

    if(isNaN(numero) || numero < 0){
        console.error('ERROR... no es un numero o es negativo');
        return -1;
}
    presupuesto = numero;
    return presupuesto;
    
}

function mostrarPresupuesto() {
    return 'Tu presupuesto actual es de ' + presupuesto + ' €';
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    }

    let timestamp = Date.parse(fecha);
    if (isNaN(timestamp)) {
        timestamp = Date.now();
    }

    this.descripcion = descripcion;
    this.valor = valor;
    this.fecha = timestamp;
    this.etiquetas = [];

    this.mostrarGasto = function() {
        return 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €';
    };

    this.actualizarDescripcion = function(nuevaDescripcion){
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevoValor){
        if(!isNaN(nuevoValor) && nuevoValor >= 0){
            this.valor = nuevoValor;
        }
    }

    this.anyadirEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.anyadirEtiquetas(...etiquetas);

   this.mostrarGastoCompleto = function() {
    let texto = 'Gasto correspondiente a ' + this.descripcion + ' con valor ' + this.valor + ' €.\n' +
        'Fecha: ' + new Date(this.fecha).toLocaleString() + '\n' +
        'Etiquetas:\n';

    for (let etiqueta of this.etiquetas) {
        texto += '- ' + etiqueta + '\n';
    }

    return texto;
}

    this.actualizarFecha = function(fecha){
        let fechaString = Date.parse(fecha);

        if(!isNaN(fechaString)){
            this.fecha = fechaString;
        }
    }

    this.borrarEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            let posicion = this.etiquetas.indexOf(etiqueta);

            if (posicion != -1) {
                this.etiquetas.splice(posicion, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        let tipofecha = new Date(this.fecha).toISOString();
        if(periodo == "dia"){
            return tipofecha.slice(0,10);
        }
        if(periodo == "mes"){
            return tipofecha.slice(0,7);
        }
        if(periodo == "anyo"){
            return tipofecha.slice(0,4);
        }
    }

    
}


function listarGastos(){
return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++){
        if(gastos[i].id == id){
            gastos.splice(i, 1);
            break;
        }
    }
}

function calcularTotalGastos(){
    let totalGastos = 0;
    for(let i = 0; i < gastos.length; i++){
        totalGastos += gastos[i].valor;
    }

    return totalGastos;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}


let filtros ={
    fechaDesde: "2021-10-10",
    fechaHasta: "2021-10-15",
    valorMinimo: 10,
    valorMaximo: 50,
    descripcionContiene: "alimentacion",
    etiquetasTiene: ["gasolina"]
};

function filtrarGastos(filtros){
    let resultados = gastos
    if(filtros.fechaDesde != undefined){
        resultados = resultados.filter(gasto => gasto.fecha >= Date.parse(filtros.fechaDesde))
    }
    if(filtros.fechaHasta != undefined){
        resultados = resultados.filter(gasto => gasto.fecha <= Date.parse(filtros.fechaHasta))  
    }
    
    if(filtros.valorMinimo != undefined){
        resultados = resultados.filter(gasto => gasto.valor >= filtros.valorMinimo)
    }
    if(filtros.valorMaximo != undefined){
        resultados = resultados.filter(gasto => gasto.valor <= filtros.valorMaximo)
    }
    
    if(filtros.descripcionContiene != undefined){
        resultados = resultados.filter(gasto => gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase()))
    }
    
    if (filtros.etiquetasTiene !== undefined) {
    resultados = resultados.filter(gasto => filtros.etiquetasTiene.some(etiqueta => gasto.etiquetas.includes(etiqueta)));
    }   
    
    return resultados;
}

function agruparGastos(){

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
    filtrarGastos,
    agruparGastos
}
