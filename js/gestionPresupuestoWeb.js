'use strict';

import * as logica from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    let elemento = document.getElementById(idElemento);
    if (!elemento) return;

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha.toLocaleDateString('es-ES');
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.appendChild(divEtiquetas);

    for(let i = 0; i < gasto.etiquetas.length; i++){
        let etiqueta = gasto.etiquetas[i];

        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = etiqueta;

        let manejadorBorrarEtiqueta = new BorrarEtiquetasHandle();
        manejadorBorrarEtiqueta.gasto = gasto;
        manejadorBorrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", manejadorBorrarEtiqueta);

        divEtiquetas.appendChild(spanEtiqueta);       
    }

    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";

    let manejadorEditar = new EditarHandle();
    manejadorEditar.gasto = gasto;
    botonEditar.addEventListener("click", manejadorEditar);
    divGasto.appendChild(botonEditar);

    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    let manejadorBorrar = new BorrarHandle();
    manejadorBorrar.gasto = gasto;
    botonBorrar.addEventListener("click", manejadorBorrar);
    divGasto.appendChild(botonBorrar);

    elemento.appendChild(divGasto);
    
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elemento = document.getElementById(idElemento);
    if(!elemento) return;

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let h1Titulo = document.createElement("h1");
    h1Titulo.textContent = `Gastos agrupados por ${periodo}`;
    divAgrupacion.appendChild(h1Titulo);

    for(let clave in agrup){
        let valor = agrup[clave];    

        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;
        divDato.appendChild(spanClave);

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor; 
        divDato.appendChild(spanValor);

        divAgrupacion.appendChild(divDato);
    }

    elemento.appendChild(divAgrupacion);
}

function repintar() {
    mostrarDatoEnId("presupuesto", logica.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", logica.calcularTotalGastos());
    mostrarDatoEnId("balance-total", logica.calcularBalance());

    let divListado = document.getElementById("listado-gastos-completo");
    if (divListado) {
        divListado.innerHTML = "";
    }

    let listaGastos = logica.listarGastos();
    for (let i = 0; i < listaGastos.length; i++) {
        mostrarGastoWeb("listado-gastos-completo", listaGastos[i]);
    }
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuestoStr = prompt("Introduce el nuevo presupuesto:");
    let nuevoPresupuesto = Number(nuevoPresupuestoStr);
    
    logica.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
if (btnActualizarPresupuesto) {
    btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);
}

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripcion del gasto");
    let valorStr = prompt("Introduce el valor del gasto:");
    let fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    let etiquetasStr = prompt("Introduce las etiquetas separadas por comas (ej: comida,casa):");

    let valor = Number(valorStr);
    let etiquetas = etiquetasStr ? etiquetasStr.split(",") : [];

    let nuevoGasto = new logica.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    logica.anyadirGasto(nuevoGasto);
    
    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
if (btnAnyadirGasto) {
    btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);
}

function EditarHandle(){
    this.handleEvent = function(){
        let anyo = this.gasto.fecha.getFullYear();
        let mes = String(this.gasto.fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(this.gasto.fecha.getDate()).padStart(2, '0');
        let fechaActualStr = `${anyo}-${mes}-${dia}`;

        let etiquetasActualesStr = this.gasto.etiquetas.join(",");

        let nuevaDescripcion = prompt("Introduce la nueva descripción:", this.gasto.descripcion);
        let nuevoValorStr = prompt("Introduce el nuevo valor:", this.gasto.valor);
        let nuevaFecha = prompt("Introduce la nueva fecha (yyyy-mm-dd):", fechaActualStr);
        let nuevasEtiquetasStr = prompt("Introduce las nuevas etiquetas separadas por comas:", etiquetasActualesStr);

        let nuevoValor = Number(nuevoValorStr);
        let nuevasEtiquetas = nuevasEtiquetasStr ? nuevasEtiquetasStr.split(",") : [];

        this.gasto.actualizarDescripcion(nuevaDescripcion);
        this.gasto.actualizarValor(nuevoValor);
        this.gasto.actualizarFecha(nuevaFecha);
        this.gasto.anyadirEtiquetas(...nuevasEtiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function() {
        logica.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function() {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}