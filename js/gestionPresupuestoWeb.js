import * as gp from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor) {
    document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let gastoDesc = document.createElement("div");
    gastoDesc.className = "gasto-descripcion";
    gastoDesc.textContent = gasto.descripcion;
    divGasto.append(gastoDesc);

    let gastoFecha = document.createElement("div");
    gastoFecha.className = "gasto-fecha";
    gastoFecha.textContent = new Date(gasto.fecha).toLocaleString();
    divGasto.append(gastoFecha);

    let gastoValor = document.createElement("div");
    gastoValor.className = "gasto-valor";
    gastoValor.textContent = gasto.valor;
    divGasto.append(gastoValor);

    let gastoEtiqueta = document.createElement("div");
    gastoEtiqueta.className = "gasto-etiquetas";
    for(let etiqueta of gasto.etiquetas){
        let etiquetaSpan = document.createElement("span");
        etiquetaSpan.className = "gasto-etiquetas-etiqueta";
        etiquetaSpan.textContent = etiqueta;
        gastoEtiqueta.append(etiquetaSpan);
    }
    divGasto.append(gastoEtiqueta);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);

    let textoPeriodo;
    if(periodo === "dia")
    {
        textoPeriodo = "día";
    }
    else if(periodo === "anyo"){
        textoPeriodo = "año";
    }
    else{
        textoPeriodo = "mes";
    }

    let divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    let h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + textoPeriodo;
    divAgrupacion.append(h1);

    
    for(let clave in agrup){
        let valor = agrup[clave];

        let agrupDato = document.createElement("div");
        agrupDato.className = "agrupacion-dato";

        let agrupClave = document.createElement("span");
        agrupClave.className = "agrupacion-dato-clave";
        agrupClave.textContent = clave;
        agrupDato.append(agrupClave)

        let agrupValor = document.createElement("span");
        agrupValor.className = "agrupacion-dato-valor";
        agrupValor.textContent = valor;
        agrupDato.append(agrupValor);

        divAgrupacion.append(agrupDato);
    }
    contenedor.append(divAgrupacion);
}

function repintar(){  

    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gp.calcularBalance());

    document.getElementById("listado-gastos-completo").innerHTML = "";

    for(let gasto of gp.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb(){
    let nuevoPresupuesto = prompt("Introduzca el nuevo presupuesto");
    nuevoPresupuesto = Number(nuevoPresupuesto);

    gp.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

let botonNuevoPresupuesto = document.getElementById("actualizarpresupuesto");
    botonNuevoPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let nuevaDesc = prompt("Introduzca la nueva descripción");

    let nuevoValor = prompt("Introduzca el nuevo valor");
    nuevoValor = Number(nuevoValor);

    let nuevaFecha = prompt("Introduzca la nueva fecha (yyyy-mm-dd)");

    let nuevaEtiqueta = prompt("Introduzca las nuevas etiquetas");
    nuevaEtiqueta = nuevaEtiqueta.split(',');

    let nuevoGasto = gp.CrearGasto(nuevaDesc, nuevoValor, nuevaFecha, ...nuevaEtiqueta);
    gp.anyadirGasto(nuevoGasto);

    repintar();
}

let botonNuevoGasto = document.getElementById("anyadirgasto");
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){

    this.handleEvent = function(){
        let nuevaDesc = prompt("Introduzca la nueva descripción", this.gasto.descripcion);
        this.gasto.actualizarDescripcion(nuevaDesc);

        let nuevoValor = prompt("Introduzca el nuevo valor", this.gasto.valor);
        nuevoValor = Number(nuevoValor);
        this.gasto.actualizarValor(nuevoValor);

        let nuevaFecha = prompt("Introduzca la nueva fecha (yyyy-mm-dd)", this.gasto.fecha);
        this.gasto.actualizarFecha(nuevaFecha);

        let nuevaEtiqueta = prompt("Introduzca las nuevas etiquetas", this.gasto.etiquetas);
        nuevaEtiqueta = nuevaEtiqueta.split(',');
        this.gasto.anyadirEtiquetas(...nuevaEtiqueta);

        repintar();
    }
}

let manejador = new EditarHandle();
manejador.gasto = gasto;
manejador.addEventListener("click", manejador)

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}