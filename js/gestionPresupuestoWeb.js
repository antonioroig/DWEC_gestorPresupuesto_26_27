import * as gP from "./gestionPresupuesto.js";

function mostrarDatoEnId (idElemento, valor){
    
 document.getElementById(idElemento).textContent = valor;

}

function mostrarGastoWeb (idElemento,gasto){
    let divGasto = document.createElement("div")
    divGasto.className = "gasto";
    document.getElementById(idElemento).append(divGasto)


    let divGastoDesc = document.createElement("div")
    divGastoDesc.className ="gasto-descripcion"
    divGastoDesc.textContent = gasto.descripcion
    divGasto.append(divGastoDesc)


    let divGastoFecha = document.createElement("div")
    divGastoFecha.className ="gasto-fecha"
    divGastoFecha.textContent = gasto.fecha
    divGasto.append(divGastoFecha)
   
   
    let divGastoValor = document.createElement("div")
    divGastoValor.className = "gasto-valor"
    divGastoValor.textContent = gasto.valor
    divGasto.append(divGastoValor)


    let divGastoEtiq = document.createElement("div")
    divGastoEtiq.className ="gasto-etiquetas"



    for(let etiqueta of gasto.etiquetas) {
        let spanEtiquetas = document.createElement("span")
        spanEtiquetas.className ="gasto-etiquetas-etiqueta"
        spanEtiquetas.textContent = etiqueta +" "
        divGastoEtiq.append(spanEtiquetas)

    };
        divGasto.append(divGastoEtiq)

        let editarBoton = document.createElement("button");
        editarBoton.textContent = "Editar";

        let editarManejador = new EditarHandle();
        editarManejador.gasto = gasto;

        editarBoton.addEventListener("click", editarManejador);
        divGasto.append(editarBoton);
}


function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

    let nombres = { mes: "mes", dia: "día", anyo: "año" };

    let divMaestro = document.createElement("div");
    divMaestro.className = "agrupacion";
    document.getElementById(idElemento).append(divMaestro);

    let titulo = document.createElement("h1");
    titulo.textContent = "Gastos agrupados por " + nombres[periodo];
    divMaestro.append(titulo);

    for (let [clave, valor] of Object.entries(agrup)) {
        let divGrupo = document.createElement("div");
        divGrupo.className = "agrupacion-dato";
        divMaestro.append(divGrupo);

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave;
        divGrupo.append(spanClave);

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = valor;
        divGrupo.append(spanValor);
    }
}

function repintar(){
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());//.toFixed(2));
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gP.calcularBalance());
    document.getElementById("listado-gastos-completo").innerHTML = "";

    for( let gasto of gP.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }

}

// Función actualizarPresupuestoWeb y botón actualizarpresupuesto
function actualizarPresupuestoWeb(){
    gP.actualizarPresupuesto(parseInt(prompt("introduzca su presupuesto")))
    repintar();
}

let botonActualizarPresupuesto = document.getElementById("actualizarpresupuesto")
botonActualizarPresupuesto.addEventListener("click",actualizarPresupuestoWeb)

function nuevoGastoWeb(){
    let des = prompt("introduzca la descripcion");
    let valor = parseInt(prompt("introduzca el valor"));
    let fecha = prompt("introduzca la fecha");
    let etiquetas = prompt("introduzca las etiquetas").split(","); //convierte el string en un array
    

    let gasto = new gP.CrearGasto(des,valor,fecha,etiquetas);
    
    gP.anyadirGasto(gasto);
    repintar();
}



function EditarHandle() {
    this.handleEvent = function() {
        let des = prompt("Descripción: ", this.gasto.descripcion);
        let valor = parseInt(prompt("Valor: ", this.gasto.valor));
        let fecha = prompt("Fecha: ", this.gasto.fecha);
        let etiquetas = prompt("Etiquetas: ", this.gasto.etiquetas.join(",")).split(",");
    }

    this.gasto.actualizarDescripcion(des);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.anyadirEtiquetas(...etiquetas);

    repintar();
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}