function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento)
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
    let divGasto = document.createElement("div")
    divGasto.className = "gasto"


    let divDescripcion = document.createElement("div")
    divDescripcion.className = "gasto-descripcion"
    divDescripcion.textContent = gasto.descripcion

    let divFecha = document.createElement("div")
    divFecha.className = "gasto-fecha"
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();

    let divValor = document.createElement("div")
    divValor.className = "gasto-valor"
    divValor.textContent = gasto.valor

    let divEtiqueta = document.createElement("div")
    divEtiqueta.className = "gasto-etiquetas"

    for(let etiqueta of gasto.etiquetas){
        let spanEtiqueta = document.createElement("span")
        spanEtiqueta.className = "gasto-etiquetas-etiqueta"
        spanEtiqueta.textContent = etiqueta
        divEtiqueta.append(spanEtiqueta)
    }

    divGasto.append(divDescripcion)
    divGasto.append(divFecha)
    divGasto.append(divValor)
    divGasto.append(divEtiqueta)

    let elemento = document.getElementById(idElemento)
    elemento.append(divGasto)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let divAgrupacion = document.createElement("div")
    divAgrupacion.className = "agrupacion"
    
    let h1 = document.createElement("h1")
    h1.textContent = `Gastos agrupados por ${periodo}`
    divAgrupacion.append(h1)
    
    for(let [clave,valor] of Object.entries(agrup)){
        let divAgruDato = document.createElement("div")
        divAgruDato.className = "agrupacion-dato"

        let spanClave = document.createElement("span")
        spanClave.className = "agrupacion-dato-clave"
        spanClave.textContent = clave

        let spanValor = document.createElement("span")
        spanValor.className = "agrupacion-dato-valor"
        spanValor.textContent = valor

        divAgruDato.append(spanClave)
        divAgruDato.append(spanValor)
        divAgrupacion.append(divAgruDato)
    }
    let elemento = document.getElementById(idElemento)
    elemento.append(divAgrupacion)
}
export   {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}