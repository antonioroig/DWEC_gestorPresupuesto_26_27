'use strict';

import * as gp from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) {
        return;
    }

    const divGasto = document.createElement('div');
    divGasto.classList.add('gasto');

    const divDescripcion = document.createElement('div');
    divDescripcion.classList.add('gasto-descripcion');
    divDescripcion.textContent = gasto.descripcion;
    divGasto.append(divDescripcion);

    const divFecha = document.createElement('div');
    divFecha.classList.add('gasto-fecha');
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(divFecha);

    const divValor = document.createElement('div');
    divValor.classList.add('gasto-valor');
    divValor.textContent = gasto.valor;
    divGasto.append(divValor);

    const divEtiquetas = document.createElement('div');
    divEtiquetas.classList.add('gasto-etiquetas');
    for (const etiqueta of gasto.etiquetas || []) {
        const span = document.createElement('span');
        span.classList.add('gasto-etiquetas-etiqueta');
        span.textContent = etiqueta;

        let borrarEtiquetas = new BorrarEtiquetasHandle();
        borrarEtiquetas.gasto = gasto;
        borrarEtiquetas.etiqueta = etiqueta;

        span.addEventListener("click", borrarEtiquetas)
        divEtiquetas.append(span);
    }
    divGasto.append(divEtiquetas);

    let botonEditar = document.createElement('button');
    botonEditar.type = 'button';
    botonEditar.setAttribute('class', 'gasto-editar');
    botonEditar.textContent = "Editar";

    let editarHandler = new EditarHandle();
    editarHandler.gasto = gasto;

    botonEditar.addEventListener("click", editarHandler);
    divGasto.append(botonEditar);

    let botonBorrar = document.createElement('button');
    botonBorrar.type = 'button';
    botonBorrar.setAttribute('class', 'gasto-editar');
    botonBorrar.textContent = "Editar";

    let borrarHandler = new BorrarHandle();
    borrarHandler.gasto = gasto;

    botonBorrar.addEventListener("click", borrarHandler);
    divGasto.append(botonBorrar);

    contenedor.append(divGasto);
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

function repintar() {
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
    mostrarDatoEnId("gastos-toatles", gp.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gp.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";
    for(let gasto of gp.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto)
}}

function actualizarPresupuestoWeb(){
    const presupuesto = parseInt(prompt("Introduce el presupuesto actualizado"));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}

let botonActualizarPres = document.getElementById("actualizarpresupuesto");
    botonActualizarPres.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    const descripcion = prompt("Introduce una descripción");
    const valor = Number(prompt("Introduce el valor"));
    const fecha = Date.parse(prompt("Introduce la fecha"));
    const etiquetas = prompt("Introduce la/las etiqueta/s").split(", ");

    let gasto = new gp.CrearGasto(descripcion, valor, fecha, etiquetas)
    gp.anyadirGasto(gasto);

    repintar();
}

let botonAnyadirGasto = document.getElementById('anyadirgasto');
    botonAnyadirGasto.addEventListener('click', nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function (event) {
        let descripcion = prompt("Introduce la descripción del gasto:", this.gasto.descripcion);
        let valor = prompt("Introduce el valor del gasto:", this.gasto.valor);
        let fecha = prompt("Introduce la fecha (yyyy-mm-dd):", this.gasto.fecha);

        let etiquetas = prompt(
            "Introduce las etiquetas separadas por comas:",
            this.gasto.etiquetas.join(", ")
        );

        valor = parseFloat(valor);

        let arrayEtiquetas = etiquetas.split(",");

        
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...arrayEtiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function(){
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar;
    }
}
export{
    mostrarDatoEnId,
    mostrarGastosAgrupadosWeb,
    mostrarGastoWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
}