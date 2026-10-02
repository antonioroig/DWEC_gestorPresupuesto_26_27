'use strict'
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(numero) {
    
    if(typeof numero !== "number"||numero < 0 ){
        console.log("El dato debe ser 0 o superior");
        return -1;
    }
    presupuesto = numero;
    return presupuesto;
}

function mostrarPresupuesto() {
    return (`Tu presupuesto actual es de ${presupuesto} €`);
}
//gasto ob --> descripción string, valor int
function CrearGasto(descripcion, valor,fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    if(etiquetas === undefined){
        etiquetas = [];
    }
    if(fecha === undefined){
        fecha = Date.now();
    }
    if(typeof fecha !== "string" || isNaN(Date.parse(fecha))){
        fecha = Date.now();
    }
    else{
        fecha = Date.parse(fecha);        
    }
        this.etiquetas = etiquetas;
        this.fecha=fecha;
    if(valor < 0 || typeof valor !== "number"){
        this.valor = 0;
    }
    else{
        this.valor = valor;
    }
    this.mostrarGasto = function () {
        return (`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`);
    }
    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;
        this.etiquetas.forEach(etiqueta => {
            texto += `- ${etiqueta}\n`;
        });
        return texto;
    }
    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;

    }
    this.actualizarValor = function(valor){
        if(valor >= 0){
            this.valor = valor;
        }
        
        
    }

}
function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto += 1;
    gastos.push(gasto);

}
function borrarGasto(id){
    
    const index = gastos.findIndex(gasto => gasto.id === id);

    if(index !== -1){
        gastos.splice(index, 1);
    }
}
function calcularTotalGastos(){
    let total = 0;
    gastos.forEach(gasto => {
        total += gasto.valor;
    });
    return total;
}
function calcularBalance(){
    let gastosTotales = calcularTotalGastos();
    return (presupuesto - gastosTotales);
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
