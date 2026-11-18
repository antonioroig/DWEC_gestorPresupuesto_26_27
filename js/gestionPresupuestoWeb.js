import * as gPresupuesto from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    const divMaestro = document.createElement('div');
    divMaestro.className = 'gasto';
    document.getElementById(idElemento).append(divMaestro);

    const divDescripcion = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divMaestro.append(divDescripcion);

    const divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = gasto.fecha;
    divMaestro.append(divFecha);

    const divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divMaestro.append(divValor);

    const divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';

    for (let etiqueta of gasto.etiquetas) {
        const spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta + " ";
        divEtiquetas.append(spanEtiqueta);
    }
    divMaestro.append(divEtiquetas);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    const divMaestro = document.createElement('div');
    divMaestro.className = 'agrupacion';
    document.getElementById(idElemento).append(divMaestro);

    const h1Agrup = document.createElement('h1');
    h1Agrup.textContent = "Gastos agrupados por " + periodo;
    divMaestro.append(h1Agrup);
    
    
    for (let [clave,valor] of Object.entries(agrup)){
        const divAgrup = document.createElement('div');
        divAgrup.className = 'agrupacion-dato';
        divMaestro.append(divAgrup);
        
        const spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = clave + ": ";
        divAgrup.append(spanClave);

        const spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = valor.toFixed(2);
        divAgrup.append(spanValor);


    }

    
}
function repintar(){
    mostrarDatoEnId("presupuesto", gPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gPresupuesto.calcularTotalGastos().toFixed(2));
    mostrarDatoEnId("balance-total", gPresupuesto.calcularBalance().toFixed(2));
    document.getElementById('listado-gastos-completo').innerHTML = '';

    for (let gasto of gPresupuesto.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }

}
function actualizarPresupuestoWeb(){
    let presupuesto = prompt("Introduzca el nuevo presupuesto")
    presupuesto = parseFloat(presupuesto);
    gPresupuesto.actualizarPresupuesto(presupuesto);
    repintar();
}
let botonActualizar = document.getElementById('actualizarpresupuesto');
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let descripcion = prompt("Introduzca la descripcion del gasto");
    let valor = prompt("Introduzca el valor del gasto");
    valor = parseFloat(valor);
    let fecha = prompt("Introduce la fecha en la que se realizo el gasto (yyyy-mm-dd)");
    let etiquetas = prompt("Introduce las etiquetas separadas por comas");
    etiquetas = etiquetas.split(", ");
    let gasto = new gPresupuesto.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gPresupuesto.anyadirGasto(gasto);
    repintar()
}
let botonNuevoGasto = document.getElementById('anyadirgasto');
botonNuevoGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(gasto){
        this.gasto = gasto;
        let descripcion = prompt("Introduzca la descripcion del gasto");
        gasto.gPresupuesto.actualizarDescripcion(descripcion);
        let valor = prompt("Introduzca el valor del gasto");
        valor = parseFloat(valor);
        gasto.gPresupuesto.actualizarValor(valor);
        let fecha = prompt("Introduce la fecha en la que se realizo el gasto (yyyy-mm-dd)");
        gasto.gPresupuesto.actualizarFecha(fecha);
        let etiquetas = prompt("Introduce las etiquetas separadas por comas");
        etiquetas = etiquetas.split(", ");
        gasto.gPresupuesto.actualizarEtiquetas(etiquetas);
        repintar()
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}