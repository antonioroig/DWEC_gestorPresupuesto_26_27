function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, valor){

    let divgasto = document.createElement("div")
    divgasto.classList.add("gasto")

    let divdescripcion = document.createElement("div")
    divdescripcion.classList.add("gasto-descripcion")
    divdescripcion.textContent = valor.descripcion

    let divfecha = document.createElement("div")
    divfecha.classList.add("gasto-fecha")
    divfecha.textContent = valor.fecha


    let div_valor = document.createElement("div")
    div_valor.classList.add("gasto-valor")
    div_valor.textContent = valor.valor


    let divetiquetas = document.createElement("div")
    divetiquetas.classList.add("gasto-etiquetas")

    divgasto.append(divdescripcion)
    divgasto.append(divfecha)
    divgasto.append(div_valor)
    divgasto.append(divetiquetas)

    for(let i = 0; i < valor.etiquetas.length ;i++){
        let span_etiqueta = document.createElement("span")
        span_etiqueta.classList.add("gasto-etiquetas-etiqueta")
        span_etiqueta.textContent = valor.etiquetas[i]

        divetiquetas.append(span_etiqueta)
    }

    document.getElementById(idElemento).append(divgasto)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo ){

    let divprincipal = document.createElement("div")
    divprincipal.classList.add("agrupacion")

    let h1 = document.createElement("h1")
    h1.textContent = `Gastos agrupados por ${periodo}`

    divprincipal.append(h1)
    for (var [key, value] of Object.entries(agrup)) {
        
        let divagrup = document.createElement("div")
        divagrup.classList.add("agrupacion-dato")

        let span1 = document.createElement("span")
        span1.classList.add("agrupacion-dato-clave")
        span1.textContent = key

         let span2 = document.createElement("span")
        span2.classList.add("agrupacion-dato-valor")
        span2.textContent = value

        divagrup.append(span1)
        divagrup.append(span2)
        divprincipal.append(divagrup)
    }
    document.getElementById(idElemento).append(divprincipal)
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
}