function mostrarDatoEnId(valor,idElemento){
let elem= document.getElementById(idElemento);
    elem.textContent = valor;

}
function mostrarGastoWeb(idElemento, gasto){
    let elem = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";

    let descr = document.createElement("div");
    descr.className = "gasto-descripcion";
    descr.textContent = gasto.descripcion;

    let fecha = document.createElement("div");
    fecha.className = "gasto-fecha";
    fecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let valor = document.createElement("div");
    valor.className = "gasto-valor";
    valor.textContent = gasto.valor;

    let etiquetas = document.createElement("div");
    etiquetas.className = "gasto-etiquetas";

    for (let i = 0; i < gasto.etiquetas.length; i++) {
        let etiqueta = document.createElement("span");
        etiqueta.className = "gasto-etiquetas-etiqueta";
        etiqueta.textContent = gasto.etiquetas[i];

        etiquetas.appendChild(etiqueta);
    }

    divGasto.appendChild(descr);
    divGasto.appendChild(fecha);
    divGasto.appendChild(valor);
    divGasto.appendChild(etiquetas);

    elem.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    let elem = document.getElementById(idElemento);

    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";

    let titulo = document.createElement("h1");

    if (periodo === "mes") {
        titulo.textContent = "Gastos agrupados por mes";
    } else if (periodo === "dia") {
        titulo.textContent = "Gastos agrupados por día";
    } else if (periodo === "anyo") {
        titulo.textContent = "Gastos agrupados por año";
    }

    divAgrup.appendChild(titulo);

    let claves = Object.keys(agrup);

    for (let i = 0; i < claves.length; i++) {
        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let clave = document.createElement("span");
        clave.className = "agrupacion-dato-clave";
        clave.textContent = claves[i];

        let valor = document.createElement("span");
        valor.className = "agrupacion-dato-valor";
        valor.textContent = agrup[claves[i]];

        divDato.appendChild(clave);
        divDato.appendChild(valor);

        divAgrup.appendChild(divDato);
    }

    elem.appendChild(divAgrup);
}