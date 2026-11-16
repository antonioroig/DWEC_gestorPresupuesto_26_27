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

    for(let etiqueta of gasto.etiquetas){
        let contenedorGastoEtiqueta = document.createElement("span");
        contenedorGastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        contenedorGastoEtiqueta.textContent = etiqueta;

        contenedorEtiquetas.appendChild(contenedorGastoEtiqueta);
    }

    contenedorGasto.appendChild(contenedorGastoDescripcion);
    contenedorGasto.appendChild(contenedorGastoFecha);
    contenedorGasto.appendChild(contenedorGastoValor);
    contenedorGasto.appendChild(contenedorEtiquetas);

    
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


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}