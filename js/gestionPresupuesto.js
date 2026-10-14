'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(numero) {
    // TODO
    if (typeof numero === "number" && numero >=0){
        presupuesto = numero
        return numero;
    }
    else{
        console.log("Error: Valor no válido")
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) { //...permite no saber de antemano cuántas etiquetas va a recibir
    // Descripción
    this.descripcion = descripcion

    //Valor
    if (typeof valor === "number" && valor >= 0){
        this.valor = valor
    }
    else{
        this.valor = 0
    }

    //Fecha
    //si no se define, será la actual
    if (fecha === undefined) {
        this.fecha = Date.now();
    } else {
        let fechaTimestamp = Date.parse(fecha); //sino, se convierte el string en fecha con timeStamp

        if (isNaN(fechaTimestamp)) { //si el formato no es válido, se deja la fecha actual
            this.fecha = Date.now();
        } else {
            this.fecha = fechaTimestamp;
        }
    }

    //Etiquetas
    this.etiquetas = []; //primero se crea el array vacío
    // añade las etiquetas recibidas al crear el gasto
    for (let etiqueta of etiquetas) {
        if (!this.etiquetas.includes(etiqueta)) {
            this.etiquetas.push(etiqueta); //push añade el elemento al final de la lista
        }
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }
    
    this.actualizarValor = function(valor){
        if(typeof valor === "number" && valor >= 0){
            this.valor = valor;
        }
    }

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.mostrarGastoCompleto = function(){
        let textoEtiquetas = "";
        for (let etiqueta of this.etiquetas){
            textoEtiquetas += `- ${etiqueta}\n`
        }
       
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${new Date(this.fecha).toLocaleString()}
Etiquetas:
${textoEtiquetas}`;}

    this.actualizarFecha = function (fecha){
        let fechaTimestamp = Date.parse(fecha)
        if (!isNaN(fechaTimestamp)) {
            this.fecha = fechaTimestamp;
        }
    }

     this.borrarEtiquetas = function (...etiquetasABorrar) {
        for (let etiqueta of etiquetasABorrar) {
            let posicion = this.etiquetas.indexOf(etiqueta);

            if (posicion !== -1) {
                this.etiquetas.splice(posicion, 1);
            }
        }
    };
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++;
    gastos.push(gasto)
}


function borrarGasto(id){
    for(let i = 0; i <gastos.length; i++){
        if(gastos[i].id === id){
            gastos.splice(i, 1);
            return; //este return hace que termine cuando lo encuentre (si lo encuentra)
        }
    }
}


function calcularTotalGastos(){
    let total = 0
    for (let gasto of gastos){
        total = total + gasto.valor
    }
    return total;
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


