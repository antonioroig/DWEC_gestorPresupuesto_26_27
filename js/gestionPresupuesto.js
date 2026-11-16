'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(typeof valor === "number" && valor >= 0)
    {
        presupuesto = valor;
    }
    else
    {
        console.log("Error: el presupuesto debe ser un número negativo");
        valor = -1
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    // TODO
    this.descripcion = descripcion;
    if (typeof valor === "number" && valor > 0)
    {
        this.valor = valor;
    }
    else
    {
        this.valor = 0;
    }

    if (typeof fecha === "string" && !isNaN(Date.parse(fecha)))
    {
        this.fecha = Date.parse(fecha);
    }
    else
    {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    this.mostrarGasto = function()
    {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.actualizarDescripcion = function(nuevaDescripcion)
    {
        this.descripcion = nuevaDescripcion;
    }
    
    this.actualizarValor = function(nuevoValor)
    {
        if (typeof nuevoValor === "number" && nuevoValor > 0)
            {
                this.valor = nuevoValor;
            }
    }

    this.mostrarGastoCompleto = function()
    {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
            texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
            texto += "Etiquetas:\n";

    for (let etiqueta of this.etiquetas)
    {
        texto += `- ${etiqueta}\n`;
    }
    return texto;
    }

    this.actualizarFecha = function(nuevaFecha)
    {
        let timestamp = Date.parse(nuevaFecha);
        if (!isNaN(timestamp))
        {
            this.fecha = timestamp;
        }
    }

    this.anyadirEtiquetas = function(...nuevasEtiquetas)
    {
        for (let etiqueta of nuevasEtiquetas)
        {
            if (!this.etiquetas.includes(etiqueta))
            {
                this.etiquetas.push(etiqueta);
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasABorrar)
    {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasABorrar.includes(etiqueta));
    }
    this.anyadirEtiquetas(...etiquetas);

    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha);

        let anyo = String(fecha.getFullYear());
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(fecha.getDate()).padStart(2, '0');

        switch(periodo){
            case 'dia':
                return `${anyo}-${mes}-${dia}`;
            case 'mes':
                return `${anyo}-${mes}`;
            case 'anyo':
                return `${anyo}`;
            default:
                return null;
        }
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto)
}

function borrarGasto(id){
    let indice = gastos.findIndex(gasto => gasto.id === id);
    if (indice !== -1)
    {
        gastos.splice(indice, 1);
    }
}

function calcularTotalGastos(){
    let suma = 0
    for(let gasto of gastos){
        suma += gasto.valor;
    }
    return suma;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}


function filtrarGastos(filtros) {
    return gastos.filter(gasto => {

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
                filtros.descripcionContiene.toLowerCase()
            )) {
            return false;
        }

        if (filtros.etiquetasTiene !== undefined &&
            !filtros.etiquetasTiene.some(etiqueta =>
                gasto.etiquetas.some(etiquetaGasto =>
                    etiquetaGasto.toLowerCase() === etiqueta.toLowerCase()
                )
            )) {
            return false;
        }

        return true;
    });
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {
    if (!fechaHasta || isNaN(Date.parse(fechaHasta))) {
        fechaHasta = new Date().toISOString().substring(0, 10);
    }

    let filtro = { fechaHasta };

    if (fechaDesde && !isNaN(Date.parse(fechaDesde))) {
        filtro.fechaDesde = fechaDesde;
    }

    if (Array.isArray(etiquetas) && etiquetas.length > 0) {
        filtro.etiquetasTiene = etiquetas;
    }

    let gastosFiltrados = filtrarGastos(filtro);

    let resultado = gastosFiltrados.reduce(function (acc, gasto) {
        let per = gasto.obtenerPeriodoAgrupacion(periodo);
        acc[per] = (acc[per] || 0) + gasto.valor;
        return acc;
    }, {});

    return resultado;
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