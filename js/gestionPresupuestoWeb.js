import * as gestionPresupuesto from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento,valor){
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}


function mostrarGastoWeb(idElemento,gasto){
    let elemento = document.getElementById(idElemento);

    let contenedorGasto = document.createElement("div");
    contenedorGasto.className = "gasto";

    let contenedorGastoDescripcion = document.createElement("div");     //Nota: appendChild solo sirve para estructuras html,tengo que usar txtcontent para esto
    contenedorGastoDescripcion.className = "gasto-descripcion";
    contenedorGastoDescripcion.textContent = gasto.descripcion;

    let contenedorGastoFecha = document.createElement("div");
    contenedorGastoFecha.className = "gasto-fecha";
    contenedorGastoFecha.textContent = gasto.fecha;

    let contenedorGastoValor = document.createElement("div");
    contenedorGastoValor.className = "gasto-valor";
    contenedorGastoValor.textContent = gasto.valor;

    let contenedorEtiquetas = document.createElement("div");
    contenedorEtiquetas.className = "gasto-etiquetas";

    contenedorGasto.appendChild(contenedorGastoDescripcion);
    contenedorGasto.appendChild(contenedorGastoFecha);
    contenedorGasto.appendChild(contenedorGastoValor);
    contenedorGasto.appendChild(contenedorEtiquetas);

    let botonEditar = document.createElement("button");
    botonEditar.setAttribute("type", "button");
    botonEditar.className = "gasto-editar";
    botonEditar.textContent = "Editar";

    let manejadorEditar = new EditarHandle(gasto);

    botonEditar.addEventListener("click", manejadorEditar);

    contenedorGasto.appendChild(botonEditar);

    let botonBorrar = document.createElement("button");
    botonBorrar.setAttribute("type", "button");
    botonBorrar.className = "gasto-borrar";
    botonBorrar.textContent = "Borrar";

    let manejadorBorrar = new BorrarHandle(gasto);

    botonBorrar.addEventListener("click", manejadorBorrar);

    contenedorGasto.appendChild(botonBorrar);

    for (let etiqueta of gasto.etiquetas) {
    let contenedorGastoEtiqueta = document.createElement("span");

    contenedorGastoEtiqueta.className =
        "gasto-etiquetas-etiqueta";

    contenedorGastoEtiqueta.textContent = etiqueta;

    let manejadorBorrarEtiqueta =
        new BorrarEtiquetasHandle(gasto, etiqueta);

    contenedorGastoEtiqueta.addEventListener(
        "click",
        manejadorBorrarEtiqueta
    );

    contenedorEtiquetas.appendChild(contenedorGastoEtiqueta);
}
    
    elemento.appendChild(contenedorGasto);
    

}

function mostrarGastosAgrupadosWeb(idElemento,agrup,periodo){
let elemento = document.getElementById(idElemento);

let agrupacion = document.createElement("div");
agrupacion.className = "agrupacion";

let textoPeriodo = periodo;

if (periodo === "dia") {
    textoPeriodo = "día";
} else if (periodo === "anyo") {
    textoPeriodo = "año";
}

let titulo = document.createElement("h1");
titulo.textContent = "Gastos agrupados por " + textoPeriodo;

agrupacion.appendChild(titulo);

for(let clave in agrup){
    let valor = agrup[clave];

    let agrupacionDato = document.createElement("div");
    agrupacionDato.className = "agrupacion-dato";
   
    let agrupacionDatoClave = document.createElement("span");
    agrupacionDatoClave.className = "agrupacion-dato-clave";
    agrupacionDatoClave.textContent = clave;

    let agrupacionDatoValor = document.createElement("span");
    agrupacionDatoValor.className = "agrupacion-dato-valor";
    agrupacionDatoValor.textContent = valor;

    agrupacionDato.appendChild(agrupacionDatoClave);
    agrupacionDato.appendChild(agrupacionDatoValor);
    agrupacion.appendChild(agrupacionDato);

}

elemento.appendChild(agrupacion)

}

function repintar(){
    let presupuesto = gestionPresupuesto.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto",presupuesto);

    let totalGastos = gestionPresupuesto.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales",totalGastos);

    let balance = gestionPresupuesto.calcularBalance();
    mostrarDatoEnId("balance-total",balance);

    let listado = document.getElementById("listado-gastos-completo")
    listado.innerHTML = "";

    let gastos = gestionPresupuesto.listarGastos();

    for(let gasto of gastos) {
        mostrarGastoWeb("listado-gastos-completo",gasto)
    }
}

function actualizarPresupuestoWeb(){
    let nuevoPresupuesto = prompt("Introduce el nuevo presupuesto");

    nuevoPresupuesto = Number(nuevoPresupuesto);
gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);

repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto")

botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb);

function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripcion del gasto");
    let valor = prompt("Introduce el valor del gasto");
    let fecha = prompt("Introduce la fecha del gasto");
    let textoEtiquetas = prompt("Introduce las etiquetas separadas por comas");

    valor = Number(valor);

    let etiquetas = textoEtiquetas.split(",");

    let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion,valor,fecha,...etiquetas);

    gestionPresupuesto.anyadirGasto(nuevoGasto);

    repintar();
}

let botonAnyadirGasto = document.getElementById("anyadirgasto");

botonAnyadirGasto.addEventListener("click",nuevoGastoWeb);

function EditarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function () {
        let descripcion = prompt(
            "Introduce la nueva descripción",
            this.gasto.descripcion
        );

        let valor = prompt(
            "Introduce el nuevo valor",
            this.gasto.valor
        );

        let fecha = prompt(
            "Introduce la nueva fecha",
            new Date(this.gasto.fecha).toISOString().substring(0, 10)
        );

        let textoEtiquetas = prompt(
            "Introduce las etiquetas separadas por comas",
            this.gasto.etiquetas.join(",")
        );

        valor = Number(valor);
        let etiquetas = textoEtiquetas.split(",");

        this.gasto.actualizarDescripcion(descripcion);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(...etiquetas);

        repintar();
    };
}

function BorrarHandle(gasto) {
    this.gasto = gasto;

    this.handleEvent = function () {
        gestionPresupuesto.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle(gasto, etiqueta) {
    this.gasto = gasto;
    this.etiqueta = etiqueta;

    this.handleEvent = function () {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}