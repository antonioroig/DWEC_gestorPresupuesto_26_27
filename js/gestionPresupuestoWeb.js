function mostrarDatoEnId(idElemento, valor) {

    document.getElementById(idElemento).textContent=valor


}

function mostrarGastoWeb(idElemento, gasto){

    let DivGasto = document.createElement('div');
    DivGasto.className = "gasto";

    let gastoDescripcion = document.createElement('div');
    gastoDescripcion.className = "gasto-descripcion";
    gastoDescripcion.textContent = gasto.descripcion;

    let gastoFecha = document.createElement('div');
    gastoFecha.className = "gasto-fecha";
    gastoFecha.textContent = new Date(gasto.fecha).toLocaleString();

    let gastoValor = document.createElement('div');
    gastoValor.className = "gasto-valor";
    gastoValor.textContent = gasto.valor;

    let gastoEtiquetas = document.createElement('div');
    gastoEtiquetas.className = "gasto-etiquetas";

    document.getElementById(idElemento).append(DivGasto);
    DivGasto.append(gastoDescripcion);
    DivGasto.append(gastoFecha);
    DivGasto.append(gastoValor);
    DivGasto.append(gastoEtiquetas);

    for (let i = 0; i < gasto.etiquetas.length; i++)
    {
        let etiqueta = document.createElement('span');
        etiqueta.textContent = gasto.etiquetas[i];
        etiqueta.className = "gasto-etiquetas-etiqueta";
        gastoEtiquetas.append(etiqueta);
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    const nombres = { mes: "mes", dia: "día", anyo: "año" };

    let contenedor = document.getElementById(idElemento);

    let agrupacion = document.createElement("div");
    agrupacion.classList.add("agrupacion");

    let titulo = document.createElement("h1");
    titulo.textContent = "Gastos agrupados por " + nombres[periodo];
    agrupacion.appendChild(titulo);

    for (const [clave, valor] of Object.entries(agrup)) {

        let dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");

        let spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        let spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        dato.appendChild(spanClave);
        dato.appendChild(spanValor);

        agrupacion.appendChild(dato);
    }

    contenedor.appendChild(agrupacion);
}

function repintar() {
    mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
    mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());

    let divListado = document.getElementById("listado-gastos-completo");
    divListado.innerHTML = "";

    let listaGastos = gestionPresupuesto.listarGastos();
    for (let gasto of listaGastos) {
        mostrarGastoWeb("listado-gastos-completo", gasto);
    }
}

function actualizarPresupuestoWeb() {
    let nuevoPresupuestoStr = prompt("Introduce el nuevo presupuesto:");
    let nuevoPresupuesto = Number(nuevoPresupuestoStr);
    gestionPresupuesto.actualizarPresupuesto(nuevoPresupuesto);
    repintar();
}

let btnActualizarPresupuesto = document.getElementById("actualizarpresupuesto");
btnActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb() {
    let descripcion = prompt("Introduce la descripción del gasto:");
    let valorStr = prompt("Introduce el valor del gasto:");
    let fecha = prompt("Introduce la fecha del gasto (yyyy-mm-dd):");
    let etiquetasStr = prompt("Introduce las etiquetas separadas por comas:");

    let valor = Number(valorStr);
    let etiquetas = etiquetasStr ? etiquetasStr.split(",") : [];

    let nuevoGasto = new gestionPresupuesto.crearGasto(descripcion, valor, fecha, ...etiquetas);
    gestionPresupuesto.anyadirGasto(nuevoGasto);
    repintar();
}

let btnAnyadirGasto = document.getElementById("anyadirgasto");
btnAnyadirGasto.addEventListener("click", nuevoGastoWeb);

export {

    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb
}