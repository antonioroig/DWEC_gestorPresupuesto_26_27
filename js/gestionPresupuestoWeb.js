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
    divFecha.textContent = segundosADDMMAAAA(gasto.fecha);
    divMaestro.append(divFecha);
    const divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divMaestro.append(divValor);
    const divEtiq = document.createElement("div");
    divEtiq.className = "gasto-etiquetas";

     const btnEditGasto = document.createElement("button");
    btnEditGasto.setAttribute("type", "button");
    btnEditGasto.textContent = "Editar gasto";
    btnEditGasto.className = "gasto-editar";

    divMaestro.append(btnEditGasto);

    for (let e of gasto.etiquetas){
        let span = document.createElement("span");
        span.className = "gasto-etiquetas-etiqueta";
        span.textContent = e + " ";    
        
       const borrarEtiGasto = new BorrarEtiquetasHandle();
        borrarEtiGasto.gasto = gasto;
        borrarEtiGasto.etiqueta = e;

        span.addEventListener("click", borrarEtiGasto);

        divEtiq.append(span); 
    }    

     const editorGasto = new EditarHandle();
    editorGasto.gasto = gasto;
    btnEditGasto.addEventListener("click", editorGasto);

    const btnBorrarGasto = document.createElement("button");
    btnBorrarGasto.setAttribute("type", "button");
    btnBorrarGasto.textContent = "Borrar gasto";
    btnBorrarGasto.className = "gasto-borrar";

    divMaestro.append(btnBorrarGasto);

    const borraGasto = new BorrarHandle();
    borraGasto.gasto = gasto;
    btnBorrarGasto.addEventListener("click", borraGasto);

    /*const btnBorrarEtiGasto = document.createElement("button");
    btnBorrarEtiGasto.setAttribute("type", "button");
    btnBorrarEtiGasto.textContent = "Borrar etiquetas del gasto";
    //btnBorrarEtiGasto.className = "gasto-borrar";*/

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
    if(eti === null)return;
    let etiqutas = eti.split(",");

    let nuevoGasto = new gp.CrearGasto(desc, valor, fecha, ...etiqutas);
    gp.anyadirGasto(nuevoGasto);

    repintar();
}

let btnAnyGasto = document.getElementById("anyadirgasto");
btnAnyGasto.addEventListener("click", nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(event){
        let desc = prompt("Introduce la descripción del gasto: ", this.gasto.descripcion);
        let valor = prompt("Introduce el valor del gasto: ", this.gasto.valor);
        valor = parseFloat(valor);
        let fecha = prompt("Introduce la fecha del gasto(aaaa-mm-dd): ", this.gasto.fecha);
        let eti = prompt("Introduce las etiquetas del gasto separada por comas(ej: eti1,eti2,eti3): ", this.gasto.etiquetas);

        let etiqutas = eti.split(",");

        this.gasto.actualizarDescripcion(desc);
        this.gasto.actualizarValor(valor);
        this.gasto.actualizarFecha(fecha);
        this.gasto.anyadirEtiquetas(etiqutas);

        repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(event){
        gp.borrarGasto(this.gasto.id);
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

function segundosADDMMAAAA(segundos) {
  const fecha = new Date(segundos);

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();

  return `${dia}/${mes}/${anio}`;
}

export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,  
}