import * as gP
    from "./gestionPresupuesto.js"

function mostrarDatoEnId(idElemento, valor) {
    const Elemento = document.getElementById(idElemento);
    Elemento.textContent = String(valor);
};

function repintar() {
    mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());
    mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos().toFixed(2));
    mostrarDatoEnId("balance-total", gP.calcularBalance().toFixed(2));

    document.getElementById("listado-gastos-completo").innerHTML = '';


    for (let gasto of gP.listarGastos()) {
        mostrarGastoWeb("listado-gastos-completo", gasto)
    }

}


function actualizarPresupuestoWeb() {
    let promptPres = prompt("Introduzca el nuevo presupuesto");
    promptPres = parseFloat(promptPres);
    gP.actualizarPresupuesto(promptPres);
    repintar();
}
let actualizarPres = document.getElementById("actualizarpresupuesto");
actualizarPres.addEventListener("click", actualizarPresupuestoWeb);


function nuevoGastoWeb() {
    let promptDes = prompt("Introduzca la descripción:");

    let promptValor = prompt("Introduzca el valor: ");
    promptValor = parseFloat(promptValor);

    let promptDate = prompt("Introduzca la fecha en formato: yyyy-mm-dd");

    let promptEti = prompt("Introduzca etiquetas separadas por comas: (eti1, eti2, eit3...)");
    promptEti = promptEti.split(", ");

    let gasto = new gP.CrearGasto(promptDes, promptValor, promptDate, ...promptEti)
    gP.anyadirGasto(gasto);

    repintar();
}
let nuevoGasto = document.getElementById("anyadirgasto");
nuevoGasto.addEventListener("click", nuevoGastoWeb);


function EditarHandle() {
    this.handleEvent = function (event) {
        let promptDes = prompt("Introduzca la descripción:", this.gasto.descripcion);
        this.gasto.actualizarDescripcion(promptDes);

        let promptValor = prompt("Introduzca el valor: ", this.gasto.valor);
        promptValor = parseFloat(promptValor);
        this.gasto.actualizarValor(promptValor)

        let promptDate = prompt("Introduzca la fecha en formato: yyyy-mm-dd", this.gasto.fecha);
        this.gasto.actualizarFecha(promptDate);

        let promptEti = prompt("Introduzca etiquetas separadas por comas: (eti1, eti2, eit3...)", this.gasto.etiquetas);
        promptEti = promptEti.split(", ");
        this.gasto.anyadirEtiquetas(promptEti);

        repintar();
    }
}

function BorrarHandle() {
    this.handleEvent = function (event) {
        let gasto = this.gasto.id;
        gP.borrarGasto(gasto);

        repintar();
    }
}

function BorrarEtiquetasHandle() {
    this.handleEvent = function (event) {
        this.gasto.borrarEtiquetas(this.etiqueta);

        repintar();
    }
}

function mostrarGastoWeb(idElemento, gasto) {
    const Elemento = document.getElementById(idElemento);
    const div_gasto = document.createElement("div");
    div_gasto.className = "gasto";

    const gasto_des = document.createElement("div");
    gasto_des.className = "gasto-descripcion";
    gasto_des.textContent = gasto.descripcion;

    const gasto_fecha = document.createElement("div");
    gasto_fecha.className = "gasto-fecha";
    gasto_fecha.textContent = gasto.fecha;

    const gasto_valor = document.createElement("div");
    gasto_valor.className = "gasto-valor";
    gasto_valor.textContent = gasto.valor;

    const gasto_etiquetas = document.createElement("div");
    gasto_etiquetas.className = "gasto-etiquetas";


    const boton_editar = document.createElement("button");
    boton_editar.setAttribute("type", "button");
    boton_editar.textContent = "Editar";
    boton_editar.className = "gasto-editar";

    const editorGasto = new EditarHandle();
    editorGasto.gasto = gasto;
    boton_editar.addEventListener("click", editorGasto)


    const boton_borrar = document.createElement("button");
    boton_borrar.setAttribute("type", "button");
    boton_borrar.className = "gasto-borrar";

    const editBorrarGasto = new BorrarHandle();
    editBorrarGasto.gasto = gasto;
    boton_borrar.addEventListener("click", editBorrarGasto)



    for (const eti of gasto.etiquetas) {
        const spanEti = document.createElement("span")
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.textContent = eti + " ";

        const editBorrarEti = new BorrarEtiquetasHandle();
        editBorrarEti.gasto = gasto;
        editBorrarEti.etiqueta = eti;
        spanEti.addEventListener("click", editBorrarEti);

        gasto_etiquetas.append(spanEti);       
    }

    Elemento.append(div_gasto);
    div_gasto.append(gasto_des, gasto_fecha, gasto_valor, gasto_etiquetas, boton_editar, boton_borrar);


};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const Elemento = document.getElementById(idElemento);

    const agrupacion = document.createElement("div");
    agrupacion.className = "agrupacion";

    const titulo = document.createElement("h1")
    titulo.textContent = "Gastos agrupados por " + periodo;

    Elemento.append(agrupacion);
    agrupacion.append(titulo);

    for (let [clave, valor] of Object.entries(agrup)) {
        const agrupDato = document.createElement("div");
        agrupDato.className = "agrupacion-dato";
        agrupacion.append(agrupDato);

        const datoClave = document.createElement("span");
        datoClave.className = "agrupacion-dato-clave";
        datoClave.textContent = clave + ": ";

        const datoValor = document.createElement("span");
        datoValor.className = "agrupacion-dato-valor";
        datoValor.textContent = valor.toFixed(2);

        agrupDato.append(datoClave, datoValor);
    }



};



export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}