
"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let gastos = [];
let idGastos = 0;
let presupuesto = 0;


function mostrarPresupuesto() {
    let mensaje = "Tu presupuesto actual es de " + presupuesto + " €";
    return mensaje;
}

function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0)
    {
        presupuesto = valor;
        return valor;
    }
    else 
    {
        console.log("El valor del presupuesto debe ser un número positivo");
        return valor = -1;
    }
}



function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
    
    if (etiquetas === undefined || etiquetas === null || etiquetas === "") {
        this.etiquetas = [];
    }
    else{
        this.etiquetas = Array.from(etiquetas);
    }

    
    if (fecha === undefined || fecha === null || fecha === "") {
        this.fecha = Date.now();
    }
    else{
        let Fecha = Date.parse(fecha);
        if (isNaN(Fecha)) {
            fecha = Date.now();
        }
        else{
            this.fecha = Fecha;
        }
    }


    valor = parseFloat(valor);
    if (isNaN(valor) || valor < 0) {
        valor = 0;
    } 

    this.descripcion = descripcion;
    this.valor = valor;
   
    this.mostrarGastoCompleto = function() {
        let Fecha = new Date(this.fecha);
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${Fecha.toLocaleString()}\nEtiquetas:\n- ${this.etiquetas.join("\n- ")}\n`;
        return mensaje;
    }
    
    this.actualizarFecha = function(nuevaFecha){
        nuevaFecha = Date.parse(nuevaFecha);
        if (nuevaFecha === undefined || nuevaFecha === null || nuevaFecha === "" || isNaN(nuevaFecha)) {
            this.fecha = this.fecha;
        }
        else{
            this.fecha = nuevaFecha;
        }
    }

    /*this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let i = 0; i < nuevasEtiquetas.length; i++) {
            if (!this.etiquetas.includes(nuevasEtiquetas[i])) {
                this.etiquetas.push(nuevasEtiquetas[i]);
            }
        }
    }*/
   this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let eti of nuevasEtiquetas) {
            if (!this.etiquetas.includes(eti)) {
                this.etiquetas.push(eti);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        for (let eti of etiquetasABorrar){
            if (this.etiquetas.includes(eti)) {
                this.etiquetas.splice(this.etiquetas.indexOf(eti), 1);
            }
        }
    }
    this.mostrarGasto = function() {
        let mensaje = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        return mensaje;
    }
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }
    this.actualizarValor = function(nuevoValor) {
        nuevoValor = parseFloat(nuevoValor);
        if (!isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    }
    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha).toISOString();
        
        if(periodo == "dia"){
            return fecha.slice(0, 10);
        }
        if (periodo == "mes"){
            return fecha.slice(0, 7);
        }
        if (periodo == "anyo"){
            return fecha.slice(0, 4);
        }
    }
}



function listarGastos() {
    if (gastos.length === 0) {
        return [];
    }
    else{
        return gastos;
    }
}

function anyadirGasto(nuevoGasto) {
    nuevoGasto.id = idGastos;
    idGastos++;
    gastos.push(nuevoGasto);
}
function borrarGasto(gastoABorrar) {
    for (let gasto of gastos) {
        if (gasto.id === gastoABorrar) {
            gastos.splice(gastos.indexOf(gasto), 1);
            break;
        }
    }
}
function calcularTotalGastos() {
    let totalGastos = 0;
    for (let gasto of gastos){
        totalGastos += gasto.valor;
    }
    return totalGastos;
}
function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
}
function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}) {
    let gastosFiltrados = gastos;

    if (typeof fechaDesde === "string" && !isNaN(Date.parse(fechaDesde))) {
       
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha >= Date.parse(fechaDesde));
    }
    if (typeof fechaHasta === "string" && !isNaN(Date.parse(fechaHasta))) {
       
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.fecha <= Date.parse(fechaHasta));
    }
    if (valorMinimo !== undefined) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor >= valorMinimo);
    }
    if (valorMaximo !== undefined) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.valor <= valorMaximo);
    }
    if (descripcionContiene) {
        gastosFiltrados = gastosFiltrados.filter(gasto => gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase()));
    }
    if (etiquetasTiene){
    gastosFiltrados = gastosFiltrados.filter(gasto => 
        gasto.etiquetas.some(etiquetaGasto => etiquetasTiene.some(etiquetaFiltro =>etiquetaGasto.toLowerCase() === etiquetaFiltro.toLowerCase())));
    }
    
    return gastosFiltrados;
}
function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
   
    let gastosFiltrados = filtrarGastos({fechaDesde: fechaDesde, fechaHasta: fechaHasta, etiquetasTiene: etiquetas});
    let agrupacion = gastosFiltrados.reduce((acc, gasto) => {
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[periodoAgrupacion] = (acc[periodoAgrupacion] || 0) + gasto.valor;
        return acc;
    }, {});
    return agrupacion;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos, 
    anyadirGasto, 
    borrarGasto, 
    calcularTotalGastos, 
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    CrearGasto
}
