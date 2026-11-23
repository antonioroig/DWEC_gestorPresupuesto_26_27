import * as gp from './gestionPresupuesto.js'

function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, valor){

    let divgasto = document.createElement("div")
    divgasto.classList.add("gasto")

    let divdescripcion = document.createElement("div")
    divdescripcion.classList.add("gasto-descripcion")
    divdescripcion.textContent = valor.descripcion

    let divfecha = document.createElement("div")
    divfecha.classList.add("gasto-fecha")
    divfecha.textContent = valor.fecha


    let div_valor = document.createElement("div")
    div_valor.classList.add("gasto-valor")
    div_valor.textContent = valor.valor


    let divetiquetas = document.createElement("div")
    divetiquetas.classList.add("gasto-etiquetas")

    divgasto.append(divdescripcion)
    divgasto.append(divfecha)
    divgasto.append(div_valor)
    divgasto.append(divetiquetas)

    for(let i = 0; i < valor.etiquetas.length ;i++){
        let span_etiqueta = document.createElement("span")
        span_etiqueta.classList.add("gasto-etiquetas-etiqueta")
        span_etiqueta.textContent = valor.etiquetas[i]

        let borrarEtiqueta = new BorrarEtiquetasHandle();
        borrarEtiqueta.gasto = valor;
        borrarEtiqueta.etiqueta = valor.etiquetas[i];
        span_etiqueta.addEventListener("click", borrarEtiqueta);

        divetiquetas.append(span_etiqueta)
    }

    let botonEditar = document.createElement("button")
    botonEditar.type = "button"
    botonEditar.classList.add("gasto-editar")
    botonEditar.textContent = "Editar"

    let editarGasto = new EditarHandle()
    editarGasto.gasto = valor
    botonEditar.addEventListener("click", editarGasto)
    divgasto.append(botonEditar)

    let botonBorrar = document.createElement("button")
    botonBorrar.type = "button"
    botonBorrar.classList.add("gasto-borrar")
    botonBorrar.textContent = "Borrar"

    let borrarGasto = new BorrarHandle()
    borrarGasto.gasto = valor
    botonBorrar.addEventListener("click", borrarGasto)
    divgasto.append(botonBorrar)

    document.getElementById(idElemento).append(divgasto)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo ){

    let divprincipal = document.createElement("div")
    divprincipal.classList.add("agrupacion")

    let h1 = document.createElement("h1")
    h1.textContent = `Gastos agrupados por ${periodo}`

    divprincipal.append(h1)
    for (var [key, value] of Object.entries(agrup)) {
        
        let divagrup = document.createElement("div")
        divagrup.classList.add("agrupacion-dato")

        let span1 = document.createElement("span")
        span1.classList.add("agrupacion-dato-clave")
        span1.textContent = key + " - "

         let span2 = document.createElement("span")
        span2.classList.add("agrupacion-dato-valor")
        span2.textContent = value.toFixed(2)

        divagrup.append(span1)
        divagrup.append(span2)
        divprincipal.append(divagrup)
    }
    document.getElementById(idElemento).append(divprincipal)
}

function repintar(){
    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2));
    mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2));
    
    document.getElementById("listado-gastos-completo").innerHTML = "";

    let listadoCompleto = gp.listarGastos();
    for (let i = 0; i < listadoCompleto.length; i++) {
        mostrarGastoWeb('listado-gastos-completo', listadoCompleto[i]);
    }
    
}

function actualizarPresupuestoWeb(){
    let presupuesto = Number.parseInt(prompt("Dime el nuevo presupuesto"))

    gp.actualizarPresupuesto(presupuesto)

    repintar()
}

let actualizarPresupuestoBoton = document.getElementById("actualizarpresupuesto")
actualizarPresupuestoBoton.addEventListener("click", actualizarPresupuestoWeb)

function nuevoGastoWeb(){
    let descripción = prompt("Dime el nuevo descripción")
    let valor = Number(prompt("Dime el nuevo valor"))
    let fecha  = prompt("Dime la nueva fecha")
    let etiquetas = prompt("Dime las nuevas etiquetas")
    etiquetas= etiquetas.split(",")

    let gasto = new gp.CrearGasto(descripción,valor,fecha,etiquetas)
    gp.anyadirGasto(gasto)

    repintar()
}
let anyadirgastoBoton = document.getElementById("anyadirgasto")
anyadirgastoBoton.addEventListener("click", nuevoGastoWeb)

function EditarHandle(){

    this.handleEvent = function (event) {

        let fechaString = new Date(this.gasto.fecha).toISOString()

        let descripción = prompt("Dime el nuevo descripción", this.gasto.descripcion)
        let valor = Number(prompt("Dime el nuevo valor", this.gasto.valor))
        let fecha  = prompt("Dime la nueva fecha",fechaString)
        let etiquetas = prompt("Dime las nuevas etiquetas", this.gasto.etiquetas)
        etiquetas= etiquetas.split(",")

        this.gasto.actualizarDescripcion(descripción)
        this.gasto.actualizarValor(valor)
        this.gasto.actualizarFecha(fecha)
        this.gasto.anyadirEtiquetas(...etiquetas)

        repintar();
    };

    
}

function BorrarHandle() {
    this.handleEvent = function (event) {
        gp.borrarGasto(this.gasto.id);
        repintar();
    };
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    };
}

export{
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