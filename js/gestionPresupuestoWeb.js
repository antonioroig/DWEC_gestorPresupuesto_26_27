import * as gestion from "./gestionPresupuesto.js";
function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto) {
    const destino = document.getElementById(idElemento);

    const contenedor = document.createElement("div");
    contenedor.classList.add("gasto");

    const descripcion = document.createElement("div");
    descripcion.classList.add("gasto-descripcion");
    descripcion.textContent = gasto.descripcion;

    const fecha = document.createElement("div");
    fecha.classList.add("gasto-fecha");
    fecha.textContent = new Date(gasto.fecha).toLocaleString();

    const valor = document.createElement("div");
    valor.classList.add("gasto-valor");
    valor.textContent = gasto.valor;

    const etiquetas = document.createElement("div");
    etiquetas.classList.add("gasto-etiquetas");

    for (const etiqueta of gasto.etiquetas) {
        const span = document.createElement("span");
        span.classList.add("gasto-etiquetas-etiqueta");
        span.textContent = etiqueta;
        etiquetas.append(span);
    }

    contenedor.append(descripcion, fecha, valor, etiquetas);
    destino.append(contenedor);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const destino = document.getElementById(idElemento);

    const contenedor = document.createElement("div");
    contenedor.classList.add("agrupacion");

    let nombrePeriodo = periodo;

    if (periodo === "dia") {
        nombrePeriodo = "día";
    } else if (periodo === "anyo") {
        nombrePeriodo = "año";
    }

    const titulo = document.createElement("h1");
    titulo.textContent = "Gastos agrupados por " + nombrePeriodo;
    contenedor.append(titulo);

    for (const clave of Object.keys(agrup)) {
        const dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");

        const periodoTexto = document.createElement("span");
        periodoTexto.classList.add("agrupacion-dato-clave");
        periodoTexto.textContent = clave;

        const valor = document.createElement("span");
        valor.classList.add("agrupacion-dato-valor");
        valor.textContent = agrup[clave];

        dato.append(periodoTexto, valor);
        contenedor.append(dato);
    }

    destino.append(contenedor);
}
function repintar() {
    mostrarDatoEnId("presupuesto", gestion.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestion.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestion.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    for (const gasto of gestion.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}
function actualizarPresupuestoWeb() {
    const respuesta = prompt("Introduce un presupuesto:");
    const presupuesto = parseFloat(respuesta);
    gestion.actualizarPresupuesto(presupuesto);
    repintar();
}
document
    .getElementById("actualizarpresupuesto")
    .addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    const descripcion = prompt("Descripción del gasto:");
    const valor = parseFloat(prompt("Valor del gasto:"));
    const fecha = prompt("Fecha del gasto (yyyy-mm-dd):");
    const etiquetas = prompt("Etiquetas (separadas por comas):").split(",");

    const gasto = new gestion.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestion.anyadirGasto(gasto);
    repintar();
}
document
    .getElementById("anyadirgasto")
    .addEventListener("click", nuevoGastoWeb);
function EditarHandle() {
    this.handleEvent = function () {
        const descripcion = prompt("Descripción del gasto:", this.gasto.descripcion);
        const valor = parseFloat(prompt("Valor del gasto:", this.gasto.valor));
        const fecha = prompt(
            "Fecha del gasto (yyyy-mm-dd):",
            new Date(this.gasto.fecha).toISOString().slice(0, 10)
        );
        const etiquetas = prompt(
            "Etiquetas (separadas por comas):",
            this.gasto.etiquetas.join(",")
        ).split(",");

        this.gasto.actualizarValor(valor);
        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}
function BorrarHandle() {
    this.handleEvent = function () {
        gestion.borrarGasto(this.gasto.id);
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
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
     BorrarEtiquetasHandle

};