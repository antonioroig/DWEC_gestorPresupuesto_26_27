import * as gp from './gestionPresupuesto.js';
function mostrarDatoEnId(idElemento, valor) {
    let elem = document.getElementById(idElemento);
    elem.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let descr = document.createElement("div");
    descr.className = "gasto-descripcion";
    descr.textContent = gasto.descripcion;

    let fecha = document.createElement("div");
    fecha.className = "gasto-fecha";
    fecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let valor = document.createElement("div");
    valor.className = "gasto-valor";
    valor.textContent = gasto.valor;

    let etiquetas = document.createElement("div");
    etiquetas.className = "gasto-etiquetas";
    for (let i = 0; i < gasto.etiquetas.length; i++) {
        let etiqueta = document.createElement("span");
        etiqueta.className = "gasto-etiquetas-etiqueta";
        etiqueta.textContent = gasto.etiquetas[i];

        let borrarEtiquetaHandle = new BorrarEtiquetasHandle();
        borrarEtiquetaHandle.gasto = gasto;
        borrarEtiquetaHandle.etiqueta = gasto.etiquetas[i];

        etiqueta.addEventListener("click", borrarEtiquetaHandle);

        etiquetas.appendChild(etiqueta);
    }

    let botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";

    let editarHandle = new EditarHandle();
    editarHandle.gasto = gasto;
    botonEditar.addEventListener("click", editarHandle);

    let botonBorrar = document.createElement("button");
    botonBorrar.type = "button";
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    let borrarHandle = new BorrarHandle();
    borrarHandle.gasto = gasto;

    botonBorrar.addEventListener("click", borrarHandle);
    divGasto.appendChild(descr);
    divGasto.appendChild(fecha);
    divGasto.appendChild(valor);
    divGasto.appendChild(etiquetas);
    divGasto.appendChild(botonEditar);
    divGasto.appendChild(botonBorrar);
    elem.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let elem = document.getElementById(idElemento);

    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";

    let titulo = document.createElement("h1");

    if (periodo === "mes") {
        titulo.textContent = "Gastos agrupados por mes";
    } else if (periodo === "dia") {
        titulo.textContent = "Gastos agrupados por día";
    } else if (periodo === "anyo") {
        titulo.textContent = "Gastos agrupados por año";
    }

    divAgrup.appendChild(titulo);

    let claves = Object.keys(agrup);

    for (let i = 0; i < claves.length; i++) {
        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let clave = document.createElement("span");
        clave.className = "agrupacion-dato-clave";
        clave.textContent = claves[i];

        let valor = document.createElement("span");
        valor.className = "agrupacion-dato-valor";
        valor.textContent = agrup[claves[i]];

        divDato.appendChild(clave);
        divDato.appendChild(valor);

        divAgrup.appendChild(divDato);
    }

    elem.appendChild(divAgrup);
}
function repintar() {

    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());

    mostrarDatoEnId("balance-total", gp.calcularBalance());

    let elem = document.getElementById("listado-gastos-completo");
    elem.innerHTML = "";
    let gastos = gp.listarGastos();

    for (let i = 0; i < gastos.length; i++) {
        mostrarGastoWeb("listado-gastos-completo", gastos[i]);
    }
}
function actualizarPresupuestoWeb() {

    let presupuesto = prompt("Introduce el nuevo presupuesto:");
    presupuesto = Number(presupuesto);
    gp.actualizarPresupuesto(presupuesto);

    repintar();
}
let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {

    let descripcion = prompt("Introduce la descripción del gasto:");
    let valor = Number(prompt("Introduce el valor del gasto:"));
    let fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    let etiquetas = prompt("Introduce las etiquetas separadas por comas:");

    etiquetas = etiquetas.split(",");

    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);

    gp.anyadirGasto(gasto);

    repintar();
}
let botonAnyadirGasto = document.getElementById("anyadirgasto");
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {

    this.handleEvent = function () {

        let descripcion = prompt("Introduce la descripción:", this.gasto.descripcion);

        let valor = prompt("Introduce el valor:", this.gasto.valor);

        let fecha = prompt("Introduce la fecha (yyyy-mm-dd):",
            new Date(this.gasto.fecha).toISOString().slice(0, 10));

        let etiquetas = prompt("Introduce las etiquetas separadas por comas:",
            this.gasto.etiquetas.join(","));

        valor = Number(valor);
        etiquetas = etiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);

        this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}
function BorrarHandle() {

    this.handleEvent = function () {

        gp.borrarGasto(this.gasto.id);

        repintar();
    };
}
function BorrarEtiquetasHandle() {

    this.handleEvent = function () {

        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    };
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
};