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
