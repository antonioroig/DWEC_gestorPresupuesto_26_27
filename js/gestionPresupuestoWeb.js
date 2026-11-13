
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
