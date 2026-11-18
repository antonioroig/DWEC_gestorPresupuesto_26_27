import * as gp from './gestionPresupuesto.js';

// Funciones para interactuar con el DOM

export function mostrarDatoEnId(idElemento, valor) {
    let elemento = document.getElementById(idElemento)
    elemento.textContent = valor
}

export function mostrarGastoWeb(idElemento, gasto) {
    let contenedor = document.getElementById(idElemento)

    let divGasto = document.createElement("div")
    divGasto.classList.add("gasto")

    let divDescripcion = document.createElement("div")
    divDescripcion.classList.add("gasto-descripcion")
    divDescripcion.textContent = gasto.descripcion

    let divFecha = document.createElement("div")
    divFecha.classList.add("gasto-fecha")
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString()

    let divValor = document.createElement("div")
    divValor.classList.add("gasto-valor")
    divValor.textContent = gasto.valor

    let divEtiquetas = document.createElement("div")
    divEtiquetas.classList.add("gasto-etiquetas")

    for (let index = 0; index < gasto.etiquetas.length; index++) {
        let spanEtiqueta = document.createElement("span")
        spanEtiqueta.classList.add("gasto-etiquetas-etiqueta")
        spanEtiqueta.textContent = gasto.etiquetas[index]

        divEtiquetas.append(spanEtiqueta)
    }

    divGasto.append(divDescripcion, divFecha, divValor, divEtiquetas)

    contenedor.append(divGasto)
}

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    let elemento = document.getElementById(idElemento)

    let divAgrupacion = document.createElement("div")
    divAgrupacion.classList.add("agrupacion")

    let h1Gastos = document.createElement("h1")
    h1Gastos.textContent = `Gastos agrupados por ${periodo}`
    

    divAgrupacion.append(h1Gastos)

    for (let [clave, valor] of Object.entries(agrup)) {
        let divAgrupacionDato = document.createElement("div")
        divAgrupacionDato.classList.add("agrupacion-dato")

        let span = document.createElement("span")
        let span2 = document.createElement("span")

        span.classList.add("agrupacion-dato-clave")
        span2.classList.add("agrupacion-dato-valor")

        span.textContent = clave
        span2.textContent = valor.toFixed(2)

        divAgrupacionDato.append(span, span2)
        divAgrupacion.append(divAgrupacionDato)
    }

    elemento.append(divAgrupacion)
}

export function repintar(){
    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());

    mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2));
    
    // Mostrar el balance total
    mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2));

    document.getElementById('listado-gastos-completo').innerHTML = '';
    
    // Mostrar el listado completo de gastos
    let todosLosGastos = gp.listarGastos();

    for (let gasto of todosLosGastos) {
        mostrarGastoWeb('listado-gastos-completo', gasto);
    }
    
    // Mostrar listado gastos Septiembre 2021
    let filtroSeptiembre = gp.filtrarGastos({
        fechaDesde: "2021-09-01",
        fechaHasta: "2021-09-30"
    });
    
    for (let gasto of filtroSeptiembre) {
        mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
    }
    
    // Mostrar gastos de mas de 50 euros
    let filtro50 = gp.filtrarGastos({ valorMinimo: 50 });
    
    for (let gasto of filtro50) {
        mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
    }
    
    // Mostrar gastos de mas de 200 euros con etiqueta seguros
    let filtroSeguros = gp.filtrarGastos({
        valorMinimo: 200,
        etiquetasTiene: ["seguros"]
    });
    
    for (let gasto of filtroSeguros) {
        mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
    }
    
    // Mostrar gastos de comida o transporte de menos de 50 euros
    let filtroEtiquetas = gp.filtrarGastos({
        valorMaximo: 50,
        etiquetasTiene: ["comida", "transporte"]
    });
    
    for (let gasto of filtroEtiquetas) {
        mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
    }
    
    // Mostrar gastos agrupados por dia
    mostrarGastosAgrupadosWeb("agrupacion-dia", gp.agruparGastos("dia"), "día");
    
    // Mostrar gastos agrupados por mes
    mostrarGastosAgrupadosWeb("agrupacion-mes", gp.agruparGastos("mes"), "mes");

    // Mostrar gastos agrupados por año
    mostrarGastosAgrupadosWeb("agrupacion-anyo", gp.agruparGastos("anyo"), "año");
    
}

export function actualizarPresupuestoWeb(){
    let presupuesto = Number.parseInt(prompt("Introduce un presupuesto: "))

    gp.actualizarPresupuesto(presupuesto)

    repintar();
}

let boton = document.getElementById("actualizarpresupuesto")

boton.addEventListener("click", actualizarPresupuestoWeb)




