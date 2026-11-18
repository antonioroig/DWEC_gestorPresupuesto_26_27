import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor
}
function mostrarGastoWeb(idElemento, gasto) {
    let gastoPadre = document.createElement("div");
    gastoPadre.className = "gasto";

    let gastoHijo = document.createElement("div");
    gastoHijo.className = "gasto-descripcion";
    gastoHijo.textContent = gasto.descripcion;
    gastoPadre.append(gastoHijo);

    let gastoHijo2 = document.createElement("div");
    gastoHijo2.className = "gasto-fecha";
    gastoHijo2.textContent = gasto.fecha;
    gastoPadre.append(gastoHijo2);

    let gastoHijo3 = document.createElement("div");
    gastoHijo3.className = "gasto-valor";
    gastoHijo3.textContent = gasto.valor;
    gastoPadre.append(gastoHijo3);

    let gastoHijo4 = document.createElement("div");
    gastoHijo4.className = "gasto-etiquetas";
    gastoPadre.append(gastoHijo4);

    for (let etiqueta of gasto.etiquetas) { 
        let etiqueta1 = document.createElement("span");
        etiqueta1.className = "gasto-etiquetas-etiqueta";
        etiqueta1.textContent = etiqueta;
        gastoHijo4.append(etiqueta1);
    }
    
    let botonEditar = document.createElement("button")
    botonEditar.className = "gasto-editar"
    botonEditar.textContent = "Editar"
    gastoPadre.append(botonEditar)

    
    let botonBorrar = document.createElement("button")
    botonBorrar.className = "gasto-borrar"
    botonBorrar.textContent = "Borrar"
    gastoPadre.append(botonBorrar)


    let miEdicion = new EditarHandle()
    miEdicion.g = gasto

    
    let miBorrar = new BorrarHandle()
    miBorrar.gasto = gasto

    botonEditar.addEventListener("click", miEdicion);

    
    botonBorrar.addEventListener("click", miBorrar);

    let id = document.getElementById(idElemento);
    if (id) {
        id.append(gastoPadre);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let agrupPadre = document.createElement("div")
    agrupPadre.className = "agrupacion"
    
    let textoPeriodo = periodo
    if(periodo === 'dia'){
        textoPeriodo = 'día'
    }
    if(periodo === 'anyo'){
        textoPeriodo = 'año'
    }
    
    let encabezado = document.createElement("h1")
    encabezado.textContent = `Gastos agrupados por ${textoPeriodo}`
    agrupPadre.append(encabezado)

    for(let [clave,valor] of Object.entries(agrup)){
        let agrupHijo1 = document.createElement("div")
        agrupHijo1.className = "agrupacion-dato"

        let agrupHijo2 = document.createElement("span")
        agrupHijo2.className = "agrupacion-dato-clave"
        agrupHijo2.textContent = clave
        agrupHijo1.append(agrupHijo2)

        let agrupHijo3 = document.createElement("span")
        agrupHijo3.className = "agrupacion-dato-valor"
        agrupHijo3.textContent = valor.toFixed(2)
        agrupHijo1.append(agrupHijo3)

        agrupPadre.append(agrupHijo1);
    }
    let id = document.getElementById(idElemento);
    if (id) {
        id.append(agrupPadre);
    }
} 
function repintar(){
    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto())
    mostrarDatoEnId('gastos-totales',gp.calcularTotalGastos())
    mostrarDatoEnId('balance-total',gp.calcularBalance())
    document.getElementById('listado-gastos-completo').innerHTML = ""
    for(let gasto of gp.listarGastos()){
    mostrarGastoWeb('listado-gastos-completo',gasto)
    }
}
function actualizarPresupuestoWeb(){
    let presupuesto = prompt('Introduce una cantidad de presupuesto',1600)
    presupuesto = Number(presupuesto)
    gp.actualizarPresupuesto(presupuesto)
    repintar()
}
document.getElementById("actualizarpresupuesto").addEventListener("click",actualizarPresupuestoWeb)
function nuevoGastoWeb(){
    let descripcion = prompt('Introduce una descipcion','Esta es la descripcion')
    let valor = prompt('Introduce el valor','50')
    valor = Number(valor)
    let fecha = prompt('Introduce la fecha','2026-11-17')
    let etiqueta = prompt('Introduce una etiqueta','etiqueta1,etiqueta2,etiqueta3')
    let arrayEtiqueta = etiqueta.split(', ') 
    let gasto = new gp.CrearGasto(descripcion,valor,fecha,...arrayEtiqueta)
    gp.anyadirGasto(gasto)
    repintar()
}
document.getElementById("anyadirgasto").addEventListener("click",nuevoGastoWeb)
function EditarHandle(){
    this.handleEvent = function(event){    
    let descripcion = prompt('Introduce una descipcion','Esta es la descripcion')
    let valor = prompt('Introduce el valor','50')
    valor = Number(valor)
    let fecha = prompt('Introduce la fecha','2026-11-17')
    let etiqueta = prompt('Introduce una etiqueta','etiqueta1,etiqueta2,etiqueta3')
    let arrayEtiqueta = etiqueta.split(', ') 
    let gasto = new gp.CrearGasto(descripcion,valor,fecha,...arrayEtiqueta)
    this.g.actualizarValor(valor)
    this.g.actualizarDescripcion(descripcion)
    this.g.actualizarFecha(fecha)
    this.g.anyadirEtiquetas(...arrayEtiqueta)
    repintar()
    }
}
function BorrarHandle(){
    this.handleEvent = function(event){    
    gp.borrarGasto(this.gasto.id)
    repintar()
    }
}
export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb, 
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle
}