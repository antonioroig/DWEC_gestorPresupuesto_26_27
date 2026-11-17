"use strict"

import * as gp from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, objetoGasto) {
    const elemento = document.getElementById(idElemento);

    const gasto = document.createElement("div");
    gasto.className = "gasto";

    const gastoDescripcion = document.createElement("div");
    gastoDescripcion.className = "gasto-descripcion";
    gastoDescripcion.textContent = objetoGasto.descripcion;
    gasto.append(gastoDescripcion);

    const gastoFecha = document.createElement("div");
    gastoFecha.className = "gasto-fecha";
    gastoFecha.textContent = objetoGasto.fecha;
    gasto.append(gastoFecha);

    const gastoValor = document.createElement("div");
    gastoValor.className = "gasto-valor";
    gastoValor.textContent = objetoGasto.valor.toFixed(2);     
    gasto.append(gastoValor);


    const gastoEtiquetas = document.createElement("div");
    gastoEtiquetas.className = "gasto-etiquetas";
    gasto.append(gastoEtiquetas);    
    
    for (const etiqueta of objetoGasto.etiquetas) {
    const gastoEtiquetasEtiqueta = document.createElement("span");
    gastoEtiquetasEtiqueta.className = "gasto-etiquetas-etiqueta";
    gastoEtiquetasEtiqueta.textContent = etiqueta + " ";
    gastoEtiquetas.append(gastoEtiquetasEtiqueta);
}

    elemento.append(gasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const elemento = document.getElementById(idElemento);

    const agrupacion = document.createElement("div");
    agrupacion.className = "agrupacion";

    let textoPeriodo;
    if (periodo === "dia") {
        textoPeriodo = "día";
    } else if (periodo === "anyo") {
            textoPeriodo = "año";
    } else {
        textoPeriodo = "mes";
    }

    const h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + textoPeriodo;
    agrupacion.append(h1);

    for (let [clave, valor] of Object.entries(agrup)) {
        const agrupacionDato = document.createElement("div");
        agrupacionDato.className = "agrupacion-dato";
        agrupacion.append(agrupacionDato);

        const agrupacionDatoClave = document.createElement("span");
        agrupacionDatoClave.className = "agrupacion-dato-clave";
        agrupacionDatoClave.textContent = clave + ": "; 

        const agrupacionDatoValor = document.createElement("span");
        agrupacionDatoValor.className = "agrupacion-dato-valor";
        agrupacionDatoValor.textContent = valor.toFixed(2) + "€"; 

        agrupacionDato.append(agrupacionDatoClave, agrupacionDatoValor);
    }

    elemento.append(agrupacion);
}

function repintar() {
    const presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);

    const gastosTotales = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gastosTotales);

    const balanceTotal = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balanceTotal);

    document.getElementById("listado-gastos-completo").innerHTML = "";

    const listadoGastos = gp.listarGastos();
    for (const gasto of listadoGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuesto = prompt("Introduce el nuevo prespuesto: ");
    nuevoPresupuesto = Number(nuevoPresupuesto);
    gp.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

let boton = document.getElementById("actualizarpresupuesto");
boton.addEventListener('click', actualizarPresupuestoWeb);

export {
    mostrarDatoEnId, 
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}