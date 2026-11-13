export function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}


export function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    const divGasto = document.createElement("div");
    divGasto.className = "gasto";

    const divDesc = document.createElement("div");
    divDesc.className = "gasto-descripcion";
    divDesc.textContent = gasto.descripcion;
    divGasto.appendChild(divDesc);

    const divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    divFecha.textContent = gasto.fecha;
    divGasto.appendChild(divFecha);

    const divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    const divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    
    if (gasto.etiquetas && Array.isArray(gasto.etiquetas)) {
        for (const etiqueta of gasto.etiquetas) {
            const spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = etiqueta;
            divEtiquetas.appendChild(spanEtiqueta);
        }
    }
    divGasto.appendChild(divEtiquetas);
    contenedor.appendChild(divGasto);
}

export function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    if (!contenedor) return;

    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";

    const h1 = document.createElement("h1");
    let nombrePeriodo = periodo;
    if (periodo === "mes") nombrePeriodo = "mes";
    else if (periodo === "dia") nombrePeriodo = "día";
    else if (periodo === "anyo") nombrePeriodo = "año";

    h1.textContent = `Gastos agrupados por ${nombrePeriodo}`;
    divAgrupacion.appendChild(h1);

    for (const clave in agrup) {
        if (Object.prototype.hasOwnProperty.call(agrup, clave)) {
            const divDato = document.createElement("div");
            divDato.className = "agrupacion-dato";

            const spanClave = document.createElement("span");
            spanClave.className = "agrupacion-dato-clave";
            spanClave.textContent = clave;
            divDato.appendChild(spanClave);

            const spanValor = document.createElement("span");
            spanValor.className = "agrupacion-dato-valor";
            spanValor.textContent = agrup[clave];
            divDato.appendChild(spanValor);

            divAgrupacion.appendChild(divDato);
        }
    }

    contenedor.appendChild(divAgrupacion);
}