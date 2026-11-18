import * as gp from "./gestionPresupuesto.js"


function mostrarDatoEnId(idElemento, valor){
    const divMostarElemento = document.getElementById(idElemento);
    divMostarElemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    const divMaestro = document.createElement("div");
    divMaestro.className = "gasto";
    document.getElementById(idElemento).append(divMaestro);
    const divDes = document.createElement("div");
    divDes.className = "gasto-descripcion";
    divDes.textContent = gasto.descripcion;
    divMaestro.append(divDes);
    const divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha;
    divMaestro.append(divFecha);
    const divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divMaestro.append(divValor);
    const divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";
    for (let e of gasto.etiquetas){
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = e + " ";     
        divEtiq.append(span); 
    }
    divMaestro.append(divEtiq);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    if (periodo === "anyo"){periodo = "año"};

    const divAgMaestro = document.getElementById(idElemento);
    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
    divAgMaestro.append(divAgrupacion);
    const h1 = document.createElement("h1");
    h1.textContent = "Gastos agrupados por " + periodo;
    divAgrupacion.append(h1);

    for (let [clave, valor] of Object.entries(agrup)){
    const divAgDato = document.createElement("div");
    divAgDato.className = "agrupacion-dato";  
    const spanNom = document.createElement("span");
    spanNom.className = "agrupacion-dato-clave";
    spanNom.textContent = clave + ": ";
    const spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.textContent = valor.toFixed(2);
    divAgDato.append(spanNom, spanValor);  
    divAgrupacion.append(divAgDato);  
    }   
}

function repintar(){
    mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos().toFixed(2));
    mostrarDatoEnId("balance-total", gp.calcularBalance().toFixed(2));
    
    document.getElementById("listado-gastos-completo").innerHTML = '';
  

    for (let g of gp.listarGastos()){
        mostrarGastoWeb("listado-gastos-completo", g);
    };
}

function actualizarPresupuestoWeb(){
    let nuevoPres = prompt("Introduzca el nuevo presupuesto");
    nuevoPres = parseFloat(nuevoPres);
    gp.actualizarPresupuesto(nuevoPres);
    repintar();
}

let botonActPres = document.getElementById("actualizarpresupuesto");
botonActPres.addEventListener("click", actualizarPresupuestoWeb);

function nuevoGastoWeb(){
    let desc = prompt("Introduce la descripción del gasto: ");
    let valor = prompt("Introduce el valor del gasto: ");
    valor = parseFloat(valor);
    let fecha = prompt("Introduce la fecha del gasto(aaaa-mm-dd): ");
    let eti = prompt("Introduce las etiquetas del gasto separada por comas(ej: eti1,eti2,eti3): ");

    let etiqutas = eti.split(",");

    let nuevoGasto = new gp.CrearGasto(desc, valor, fecha, ...etiqutas);
    gp.anyadirGasto(nuevoGasto);

    repintar();
}

let btnAnyGasto = document.getElementById("anyadirgasto");
btnAnyGasto.addEventListener("click", nuevoGastoWeb);

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    
}