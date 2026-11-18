'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

let presupuesto = 0
let gastos = []
let idGasto = 0

function actualizarPresupuesto(newpresupuesto) {
    
    if(typeof newpresupuesto === 'number' && newpresupuesto >= 0)
    {
        presupuesto = newpresupuesto
        return presupuesto;
    }else{
        console.log("Error al poner el nuevo presupuesto, comprueba el tipo o que sea mayor que 0")
        return -1;
    }

}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;

}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    if(typeof valor !== "number" || valor < 0){
        valor = 0;
    }

    if(typeof fecha !== "string" || isNaN(Date.parse(fecha)))
        fecha = Date.now()
    else
        fecha = Date.parse(fecha)

    this.descripcion = descripcion;
    this.valor = valor;
    this.etiquetas = etiquetas;
    this.fecha = fecha
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(newdescripcion) {
        this.descripcion = newdescripcion
    };

    this.actualizarValor = function(newValor) {
        if(newValor < 0 || typeof newValor !== "number"){
            newValor = this.valor;
        }
        this.valor = newValor;
    };

    this.mostrarGastoCompleto = function() {
        let textEtiquetas  = "";

        for (let etiqueta of this.etiquetas) {
            textEtiquetas  += `- ${etiqueta}\n`;
        }
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
            `Fecha: ${new Date(this.fecha).toLocaleString()}\n` +
            `Etiquetas:\n` +
            textEtiquetas;
    };

    this.anyadirEtiquetas = function(...newEtiquetas){
        for ( let newEtiqueta of newEtiquetas )
            if(!this.etiquetas.includes(newEtiqueta))
                this.etiquetas.push(newEtiqueta)
    }

    this.actualizarFecha = function(newfecha){
        if(typeof newfecha === "string"){
            if(!isNaN(Date.parse(newfecha)))
                this.fecha = Date.parse(newfecha)
        }
    }

    this.borrarEtiquetas = function (...borrarEtiquetas){
        for ( let borrarEtiqueta of borrarEtiquetas )
            if(this.etiquetas.includes(borrarEtiqueta))
                this.etiquetas = this.etiquetas.filter(etiqueta => etiqueta != borrarEtiqueta)
    }

    this.obtenerPeriodoAgrupacion = function (fecha){

        if(typeof fecha !== "string" ){
            return
        }
        let fechaString = new Date(this.fecha).toISOString()

        if(fecha == "dia")
            return fechaString.slice(0,10)
        if(fecha == "mes")
            return fechaString.slice(0,7)
        if(fecha == "anyo")
            return fechaString.slice(0,4)
    }

}
function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene, etiquetasTiene}){

    let result = gastos

    if(typeof fechaDesde === 'string' && !isNaN(Date.parse(fechaDesde))){
        fechaDesde = Date.parse(fechaDesde);
        result = result.filter(gasto => gasto.fecha >= fechaDesde )
    }
    
    if(typeof fechaHasta === 'string' && !isNaN(Date.parse(fechaHasta))){
        fechaHasta = Date.parse(fechaHasta);
        result = result.filter(gasto => gasto.fecha <= fechaHasta );
    }

    if(typeof valorMinimo === 'number' ){
        valorMinimo = Number.parseInt(valorMinimo)
        result = result.filter(gasto => gasto.valor >= valorMinimo );
    }

    if(typeof valorMaximo === 'number' ){
        valorMaximo = Number.parseInt(valorMaximo)
        result = result.filter(gasto => gasto.valor <= valorMaximo );
    }

    if(typeof descripcionContiene === 'string'){
        result = result.filter(gasto => gasto.descripcion.includes(descripcionContiene) );

    }

    if(Array.isArray(etiquetasTiene))
    {
        result = result.filter(gasto => gasto.etiquetas.some(etiqueta => etiquetasTiene.includes(etiqueta.toLowerCase())));
    }

    return result

}

function agruparGastos(periodo, etiquetas , fechaDesde, fechaHasta){

    const gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });
    return gastosFiltrados.reduce((acc, gasto) =>
    {
        const periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
        if (acc[periodoAgrupacion] === undefined)
            acc[periodoAgrupacion] = 0;


        acc[periodoAgrupacion] += gasto.valor;
        return acc;
    }, {});
    
}

function listarGastos(){
    return gastos
}

function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++;
    gastos.push(gasto)
}

function borrarGasto(idGasto){
    gastos = gastos.filter(gasto => gasto.id != idGasto)
}

function calcularTotalGastos(){
    let total = 0
    for (let gasto of gastos) {
        total += gasto.valor
    }
    return total    
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
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
