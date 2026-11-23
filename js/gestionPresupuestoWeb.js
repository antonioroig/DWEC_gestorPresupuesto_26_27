'use strict';
import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createElement('div');
    divGasto.className = 'gasto';

    let divDescripcion = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);
    
    let divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';
    for (let etiqueta of gasto.etiquetas){
        let span = document.createElement('span');
        span.className = 'gasto-etiquetas-etiqueta';
        span.textContent = etiqueta;
        divEtiquetas.appendChild(span);
    }
    divGasto.appendChild(divEtiquetas);

    const botonEditar = document.createElement("button");
    botonEditar.type = "button";
    botonEditar.textContent = "Editar";
    botonEditar.classList.add("gasto-editar");
    const editarHandle = new EditarHandle();
    editarHandle.gasto = gasto;
    botonEditar.addEventListener("click", editarHandle);
    divGasto.appendChild(botonEditar);

    contenedor.appendChild(divGasto);
    
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);

    let textoPeriodo = periodo;
    if (periodo === 'dia'){
        textoPeriodo = 'día';
    } else if (periodo === 'anyo'){
        textoPeriodo = 'año';
    }

    let divAgrup = document.createElement('div');
    divAgrup.className = 'agrupacion';

    let titulo = document.createElement('h1');
    titulo.textContent = 'Gastos agrupados por ' + textoPeriodo;
    divAgrup.appendChild(titulo);

    let claves = Object.keys(agrup);
    for(let clave of claves){
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = agrup[clave];
        divDato.appendChild(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = agrup[clave];
        divDato.appendChild(spanValor);

        divAgrup.appendChild(divDato);
    }
    contenedor.appendChild(divAgrup);
}
function repintar(){
    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos());
    mostrarDatoEnId('balance-total', gp.calcularBalance());
    document.getElementById('listado-gastos-completo').innerHTML = '';
    for(const gasto of gp.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
}
function actualizarPresupuestoWeb(){
    const valor = prompt('Introduce un presupuesto: ');
    const presupuesto = parseFloat(valor);
    gp.actualizarPresupuesto(presupuesto);
    repintar();

}
function nuevoGastoWeb(){
    const descripcion = prompt("Introduce la descripción:");
  const valor = parseFloat(prompt("Introduce el valor:"));
  const fecha = prompt("Introduce la fecha (yyyy-mm-dd):");
  const etiquetas = prompt("Introduce las etiquetas separadas por comas:").split(",");
  const gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);
  gp.anyadirGasto(gasto);
  repintar();
}
function EditarHandle() {
  this.handleEvent = function () {
    const descripcion = prompt("Introduce la descripción:", this.gasto.descripcion);
    const valor = parseFloat(prompt("Introduce el valor:", this.gasto.valor));
    const fecha = prompt("Introduce la fecha (yyyy-mm-dd):",
    new Date(this.gasto.fecha).toISOString().substring(0, 10));
    const etiquetas = prompt(
      "Introduce las etiquetas separadas por comas:",
      this.gasto.etiquetas.join(",")
    ).split(",");
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);
    repintar();
  };
}
const botonAnyadir = document.getElementById("anyadirgasto");
botonAnyadir.addEventListener("click", nuevoGastoWeb);
const botonActualizar = document.getElementById("actualizarpresupuesto");
botonActualizar.addEventListener("click", actualizarPresupuestoWeb);
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb
}