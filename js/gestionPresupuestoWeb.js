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
    const fechaBruto = new Date(gasto.fecha);
    const fecha = fechaBruto.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
    });
    divFecha.textContent = fecha;
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
        let eliminar = new BorrarEtiquetasHandle();
        eliminar.gasto = gasto;
        eliminar.etiqueta = etiqueta;
        divEtiquetas.append(spanEtiqueta);

        spanEtiqueta.addEventListener("click", eliminar)
        
    }
    divMaestro.append(divEtiquetas);

    const btnEditar = document.createElement('button');
    btnEditar.className = 'gasto-editar'
    btnEditar.textContent = "Editar gasto";
    divMaestro.append(btnEditar);
    let editar = new EditarHandle();
    editar.gasto = gasto;

    btnEditar.addEventListener("click", editar)

    const btnBorrar = document.createElement('button');
    btnBorrar.className = 'gasto-borrar'
    btnBorrar.textContent = "Eliminar gasto";
    divMaestro.append(btnBorrar);
    let eliminar = new BorrarHandle();
    eliminar.gasto = gasto;

    btnBorrar.addEventListener("click", eliminar)
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
    this.handleEvent = function(){
        let gasto = this.gasto.id;
        let descripcion = prompt("Introduzca la descripcion del gasto");
        this.gasto.actualizarDescripcion(descripcion);
        let valor = prompt("Introduzca el valor del gasto");
        valor = parseFloat(valor);
        this.gasto.actualizarValor(valor);
        let fecha = prompt("Introduce la fecha en la que se realizo el gasto (yyyy-mm-dd)");
        this.gasto.actualizarFecha(fecha);
        let etiquetas = prompt("Introduce las etiquetas separadas por comas");
        etiquetas = etiquetas.split(",");
        this.gasto.anyadirEtiquetas(etiquetas);
        repintar()
    }
}

function BorrarHandle(){
    this.handleEvent = function(){
        let gasto = this.gasto.id;
        gPresupuesto.borrarGasto(gasto)
        repintar()
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(){
        this.gasto.borrarEtiquetas(this.etiqueta)
        repintar()
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}