'use strict';
import * as gp from './gestionPresupuesto.js'

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    const elemento = document.getElementById(idElemento);
    
    const divGasto = document.createElement('div');
    divGasto.setAttribute('class', 'gasto');
    elemento.append(divGasto);
    
    const divGastoDescripcion = document.createElement('div');
    divGastoDescripcion.setAttribute('class', 'gasto-descripcion');
    divGastoDescripcion.textContent = gasto.descripcion;
    divGasto.append(divGastoDescripcion);

    const divGastoFecha = document.createElement('div');
    divGastoFecha.setAttribute('class', 'gasto-fecha');
    divGastoFecha.textContent = gasto.fecha;
    divGasto.append(divGastoFecha);

    const divGastoValor = document.createElement('div');
    divGastoValor.setAttribute('class', 'gasto-valor');
    divGastoValor.textContent = gasto.valor;
    divGasto.append(divGastoValor);

    const divGastoEtiquetas = document.createElement('div');
    divGastoEtiquetas.setAttribute('class', 'gasto-etiquetas');
    divGasto.append(divGastoEtiquetas);

    for (let etiqueta of gasto.etiquetas)
    {
        const spanGastoEtiquetas = document.createElement('span');
        spanGastoEtiquetas.setAttribute('class', 'gasto-etiquetas-etiqueta');
        spanGastoEtiquetas.textContent = etiqueta + " ";
        
        let borrarEtiquetasHandler = new BorrarEtiquetasHandler();
        borrarEtiquetasHandler.gasto = gasto;
        borrarEtiquetasHandler.etiqueta = etiqueta;
        
        spanGastoEtiquetas.addEventListener("click", borrarEtiquetasHandler);        
        divGastoEtiquetas.append(spanGastoEtiquetas);
    }

    const botonEditar = document.createElement('button');
    botonEditar.type = "button";
    botonEditar.setAttribute('class', 'gasto-editar');
    botonEditar.textContent = "Editar";
    
    let editarHandler = new EditarHandler();
    editarHandler.gasto = gasto;

    botonEditar.addEventListener("click", editarHandler);
    divGasto.append(botonEditar);

    const botonBorrar = document.createElement('button');
    botonBorrar.type = "button";
    botonBorrar.setAttribute('class', 'gasto-borrar');
    botonBorrar.textContent = "Borrar";

    let borrarHandler = new BorrarHandler();
    borrarHandler.gasto = gasto;

    botonBorrar.addEventListener("click", borrarHandler);
    divGasto.append(botonBorrar);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);

    const divAgrupacion = document.createElement('div');
    divAgrupacion.setAttribute('class', 'agrupacion');
    elemento.append(divAgrupacion);

    let mensaje = ""
    if (periodo === "dia")
    {
        mensaje = "Gastos agrupados por día";
    }
    else if (periodo === "anyo")
    {
        mensaje = "Gastos agrupados por año";
    }
    else
    {
        mensaje = "Gastos agrupados por mes";
    }

    const h1 = document.createElement('h1');
    h1.textContent = mensaje;
    divAgrupacion.append(h1);

    for (let [clave, valor] of Object.entries(agrup))
    {
        const divAgrupacionDato = document.createElement('div');
        divAgrupacionDato.setAttribute('class', 'agrupacion-dato');
        divAgrupacion.append(divAgrupacionDato);

        const spanAgrupacionClave = document.createElement('span');
        spanAgrupacionClave.setAttribute('class', 'agrupacion-dato-clave')
        spanAgrupacionClave.textContent = clave + ": ";
        divAgrupacionDato.append(spanAgrupacionClave);

        
        const spanAgrupacionValor = document.createElement('span');
        spanAgrupacionValor.setAttribute('class', 'agrupacion-dato-valor')
        spanAgrupacionValor.textContent = valor;
        divAgrupacionDato.append(spanAgrupacionValor);
    }
}

function repintar(){
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gp.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for(let gasto of gp.listarGastos())
    {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let resultado = prompt("Introduce el presupuesto:");
    let nuevoPresupuesto = Number(resultado);
    gp.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

let botonActualizar = document.getElementById('actualizarpresupuesto');

botonActualizar.addEventListener('click', actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt("Introduce la descripción:");
    let valorTexto = prompt("Introduce el valor:");
    let valor = Number(valorTexto);
    let fecha = prompt("Introduce la fecha:");
    let etiquetasTexto = prompt("Introduce las etiquetas:");
    let etiquetas;

    if (etiquetasTexto) {
        etiquetas = etiquetasTexto.split(",");
    } else {
        etiquetas = [];
    }

    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gp.anyadirGasto(gasto);
    repintar();
}
let botonAnyadir = document.getElementById('anyadirgasto');

botonAnyadir.addEventListener('click', nuevoGastoWeb);    

function EditarHandler(){
    this.handleEvent = function(){
    let descripcion = prompt("Introduce la descripción:", this.gasto.descripcion);
    let valorTexto = prompt("Introduce el valor:", this.gasto.valor);
    let valor = Number(valorTexto);
    let fecha = prompt("Introduce la fecha:", this.gasto.fecha);
    let etiquetasTexto = prompt("Introduce las etiquetas:", this.gasto.etiquetas.join(","));
    let etiquetas;

    if (etiquetasTexto) {
        etiquetas = etiquetasTexto.split(",");
    } else {
        etiquetas = [];
    }

    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();
    }
}

function BorrarHandler(){
    this.handleEvent = function(){
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandler(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}
export {
        mostrarDatoEnId,
        mostrarGastoWeb,
        mostrarGastosAgrupadosWeb
    }