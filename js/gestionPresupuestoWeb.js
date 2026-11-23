import * as gestionPresupuesto from './gestionPresupuesto.js';


function mostrarDatoEnId(idElemento, valor) {

    document.getElementById(idElemento).textContent=valor


}

function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";

    for (let etiqueta of gasto.etiquetas) {
        let spanEtiqueta = document.createElement("span");
        spanEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanEtiqueta.textContent = etiqueta;

        let handleBorrarEtiqueta = new BorrarEtiquetasHandle();
        handleBorrarEtiqueta.gasto = gasto;
        handleBorrarEtiqueta.etiqueta = etiqueta;
        spanEtiqueta.addEventListener("click", handleBorrarEtiqueta);

        divEtiquetas.appendChild(spanEtiqueta);
    }
    divGasto.appendChild(divEtiquetas);

    let btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.className = "gasto-editar";
    btnEditar.textContent = "Editar";

    let handleEditar = new EditarHandle();
    handleEditar.gasto = gasto;
    btnEditar.addEventListener("click", handleEditar);
    divGasto.appendChild(btnEditar);

    let btnBorrar = document.createElement("button");
    btnBorrar.type = "button";
    btnBorrar.className = "gasto-borrar";
    btnBorrar.textContent = "Borrar";

    let handleBorrar = new BorrarHandle();
    handleBorrar.gasto = gasto;
    btnBorrar.addEventListener("click", handleBorrar);
    divGasto.appendChild(btnBorrar);

    contenedor.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    const nombres = { mes: "mes", dia: "día", anyo: "año" };

    let contenedor = document.getElementById(idElemento);

    let agrupacion = document.createElement("div");
    agrupacion.classList.add("agrupacion");

    let titulo = document.createElement("h1");
    titulo.textContent = "Gastos agrupados por " + nombres[periodo];
    agrupacion.appendChild(titulo);

    for (const [clave, valor] of Object.entries(agrup)) {

        let dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");

        let spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        let spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        dato.appendChild(spanClave);
        dato.appendChild(spanValor);

        agrupacion.appendChild(dato);
    }

    contenedor.appendChild(agrupacion);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    let divListado = document.getElementById("listado-gastos-completo");
    divListado.innerHTML = "";

    let listaGastos = gestionPresupuesto.listarGastos();
    for (let gasto of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuestoStr = prompt("Introduce el nuevo presupuesto:");
    let nuevoPresupuesto = Number(nuevoPresupuestoStr);
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto:");
    let valorStr = prompt("Introduce el valor del gasto:");
    let fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    let etiquetasStr = prompt("Introduce las etiquetas separadas por comas:");

    let valor = Number(valorStr);
    let etiquetas = etiquetasStr ? etiquetasStr.split(",") : [];

    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
    this.handleEvent = function (event) {
        let descripcion = prompt("Introduce la nueva descripción:", this.gasto.descripcion);
        let valorStr = prompt("Introduce el nuevo valor:", this.gasto.valor);
        let fecha = prompt("Introduce la nueva fecha (yyyy-mm-dd):", new Date(this.gasto.fecha).toISOString().slice(0, 10));
        let etiquetasStr = prompt("Introduce las nuevas etiquetas separadas por comas:", this.gasto.etiquetas.join(","));

        let valor = Number(valorStr);
        let etiquetas = etiquetasStr ? etiquetasStr.split(",") : [];

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}

function BorrarHandle() {
    this.handleEvent = function (event) {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
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
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}