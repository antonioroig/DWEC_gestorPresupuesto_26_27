function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor
}

function mostrarGastoWeb(idElemento, gasto){
    const nodoPadre = document.createElement("div")
    nodoPadre.className = "gasto"
    
    const nodoHijo1 = document.createElement("div")
    nodoHijo1.className = "gasto-descripcion"
    nodoHijo1.textContent = gasto.descripcion
    nodoPadre.append(nodoHijo1)

    const nodoHijo2 = document.createElement("div")
    nodoHijo2.className = "gasto-fecha"
    nodoHijo2.textContent = gasto.fecha
    nodoPadre.append(nodoHijo2)

    const nodoHijo3 = document.createElement("div")
    nodoHijo3.className = "gasto-valor"
    nodoHijo3.textContent = gasto.valor
    nodoPadre.append(nodoHijo3)

    const nodoHijo4 = document.createElement("div")
    nodoHijo4.className = "gasto-etiquetas"
    nodoPadre.append(nodoHijo4)

    for(let etiqueta of gasto.etiquetas){
        const nodoHijo4_1 = document.createElement("span")
        nodoHijo4_1.className = "gasto-etiquetas-etiqueta"
        nodoHijo4_1.textContent = etiqueta
        nodoHijo4.append(nodoHijo4_1)
    }
    const contenedor = document.getElementById(idElemento)
    if(contenedor){
        contenedor.append(nodoPadre)
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    const nodoPadre = document.createElement("div")
    nodoPadre.className = "agrupacion"

    const nodoHijo1 = document.createElement("h1")
    nodoHijo1.textContent = `Gastos agrupados por ${periodo}`
    nodoPadre.append(nodoHijo1)

    for(let [nombre, valor] of Object.entries(agrup)){
        const nodoHijo2 = document.createElement("div")
        nodoHijo2.className = "agrupacion-dato"

        const nodoHijo2_1 = document.createElement("span")
        nodoHijo2_1.className = "agrupacion-dato-clave"
        nodoHijo2_1.textContent = nombre
        nodoHijo2.append(nodoHijo2_1)
        
        const nodoHijo2_2 = document.createElement("span")
        nodoHijo2_2.className = "agrupacion-dato-valor"
        nodoHijo2_2.textContent = `: ${valor.toFixed(2)}`
        nodoHijo2.append(nodoHijo2_2)

        nodoPadre.append(nodoHijo2)
    }

    const contenedor = document.getElementById(idElemento)
    if(contenedor){
        contenedor.append(nodoPadre)
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}