import * as gestionP from "./gestionPresupuesto.js";

function mostrarDatoEnId(idElemento, valor)
{
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";


    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    let fechaObj = new Date(gasto.fecha);
    divFecha.textContent = fechaObj.toLocaleDateString('es-ES');
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.appendChild(divEtiquetas);

   if (gasto.etiquetas) {
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            let etiqueta = gasto.etiquetas[i];
            
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = etiqueta; 
            divEtiquetas.appendChild(spanEtiqueta);
        }
    }

    elemento.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    

    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";

    let h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;

    divAgrup.appendChild(h1Periodo);

    for (let clave in agrup) {
        let valor = agrup[clave]; 

        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave + " - ";
        divDato.appendChild(spanClave);

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = `${Number(valor).toFixed(2)} €`;
        divDato.appendChild(spanValor);

        divAgrup.appendChild(divDato);
    }

    elemento.appendChild(divAgrup);
}

function repintar()
{
    mostrarDatoEnId("presupuesto", gestionP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionP.calcularBalance());
    
    let listadoGastos = document.getElementById("listado-gastos-completo");
    listadoGastos.innerHTML = "";

    let listaGastos = gestionP.listarGastos();
    for(let i = 0; i < listaGastos.length; i++)
    {
        mostrarGastoWeb("listado-gastos-completo", listaGastos[i]);
    }
}

function actualizarPresupuestoWeb()
{
    let presupuesto = parseFloat(prompt("Introduzca un presupuesto"));
    if(!Number.isNaN(presupuesto))
    {
        gestionP.actualizarPresupuesto(presupuesto);
        repintar();
    }
}

let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb()
{
    let descripcion = prompt("Introduzca la descripcion del gasto: ");
    let valor = parseFloat(prompt("Introduzca el valor del gato"));

    let fecha = prompt("Introduzca la fecha del gasto");
    let fechaObj = new Date(fecha);

    let etiquetasTxt = prompt("Introduce las etiquetass del gasto separadas por comas");
    let etiquetas = etiquetasTxt.split(",");

    let gasto = new gestionP.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionP.anyadirGasto(gasto);

    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle() {
  this.handleEvent = function (evento) {
    let nuevaDescripcion = prompt(
      "Introduce la nueva descripción del gasto:",
      this.gasto.descripcion
    );
    let nuevoValorTexto = prompt(
      "Introduce el nuevo valor del gasto:",
      this.gasto.valor
    );
    let nuevaFecha = prompt(
      "Introduce la nueva fecha (yyyy-mm-dd):",
      this.gasto.fecha
    );
    let nuevasEtiquetasTexto = prompt(
      "Introduce las etiquetas separadas por comas (ej. etiqueta1,etiqueta2,etiqueta3):",
      this.gasto.etiquetas.join(",")
    );

    let nuevoValor = Number(nuevoValorTexto);

    let nuevasEtiquetas = nuevasEtiquetasTexto.split(",");

    actualizarDescripcion(this.gasto, nuevaDescripcion);
    actualizarValor(this.gasto, nuevoValor);
    actualizarFecha(this.gasto, nuevaFecha);
    anyadirEtiquetas(this.gasto, nuevasEtiquetas);

    repintar();
  };
}




export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}