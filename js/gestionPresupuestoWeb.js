function mostrarDatoEnId(idElemento, valor)
{
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let elemento = document.getElementById(idElemento);

    let divGasto = document.createElement("div");
    divGasto.className = "gasto";


    let divDescripcion = document.createElement("div");
    divDescripcion.className = "gasto-descripcion";
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);

    let divFecha = document.createElement("div");
    divFecha.className = "gasto-fecha";
    let fechaObj = new Date(gasto.fecha);
    divFecha.textContent = fechaObj.toLocaleDateString('es-ES');
    divGasto.appendChild(divFecha);

    let divValor = document.createElement("div");
    divValor.className = "gasto-valor";
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createElement("div");
    divEtiquetas.className = "gasto-etiquetas";
    divGasto.appendChild(divEtiquetas);

   if (gasto.etiquetas) {
        for (let i = 0; i < gasto.etiquetas.length; i++) {
            let etiqueta = gasto.etiquetas[i];
            
            let spanEtiqueta = document.createElement("span");
            spanEtiqueta.className = "gasto-etiquetas-etiqueta";
            spanEtiqueta.textContent = etiqueta; 
            divEtiquetas.appendChild(spanEtiqueta);
        }
    }

    elemento.appendChild(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo)
{
    let elemento = document.getElementById(idElemento);
    

    let divAgrup = document.createElement("div");
    divAgrup.className = "agrupacion";

    let h1Periodo = document.createElement("h1");
    h1Periodo.textContent = `Gastos agrupados por ${periodo}`;

    divAgrup.appendChild(h1Periodo);

    for (let clave in agrup) {
        let valor = agrup[clave]; 

        let divDato = document.createElement("div");
        divDato.className = "agrupacion-dato";

        let spanClave = document.createElement("span");
        spanClave.className = "agrupacion-dato-clave";
        spanClave.textContent = clave + " - ";
        divDato.appendChild(spanClave);

        let spanValor = document.createElement("span");
        spanValor.className = "agrupacion-dato-valor";
        spanValor.textContent = `${Number(valor).toFixed(2)} €`;
        divDato.appendChild(spanValor);

        divAgrup.appendChild(divDato);
    }

    elemento.appendChild(divAgrup);
}



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}