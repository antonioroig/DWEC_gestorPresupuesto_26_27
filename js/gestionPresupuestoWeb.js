function mostrarDatoEnId(idElemento, valor){
let elemento = document.getElementById(idElemento);

elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto){
let elementoGasto = document.getElementById(idElemento);

const divGastoDescrip = document.createElement("div");
divGastoDescrip.className = "gasto-descripcion";
divGastoDescrip.textContent = gasto.descripcion;

const divGastoFecha = document.createElement("div");
divGastoFecha.className = "gasto-fecha";
divGastoFecha.textContent = gasto.fecha;

const divGastoValor = document.createElement("div");
divGastoValor.className = "gasto-valor";
divGastoValor.textContent = gasto.valor;

const divGastoEtiqueta = document.createElement("div");
divGastoEtiqueta.className = "gasto-etiquetas"

 for (const ETIQUETA of gasto.etiquetas) {
        const spanGastoEtiqueta = document.createElement("span");
        spanGastoEtiqueta.className = "gasto-etiquetas-etiqueta";
        spanGastoEtiqueta.textContent = ETIQUETA;

        divGastoEtiqueta.append(spanGastoEtiqueta);
    }

const divGasto = document.createElement("div");
divGasto.className="gasto"
divGasto.append(divGastoDescrip, divGastoFecha, divGastoValor, divGastoEtiqueta);

elementoGasto.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let elementoGastoWeb = document.getElementById(idElemento);

    const divAgrupacion = document.createElement("div");
    divAgrupacion.className = "agrupacion";
    let textoPeriodo = periodo;

    if (periodo === "dia") 
    {
        textoPeriodo = "día";
    } else if (periodo === "anyo") 
    {
        textoPeriodo = "año";
    }

    const h1 = document.createElement("h1");
    h1.textContent = 'Gastos agrupados por ' + textoPeriodo;
    divAgrupacion.append(h1);

    for(const [clave, valor] of Object.entries(agrup)){
        const divAgrupacionDato = document.createElement("div");
        divAgrupacionDato.className = "agrupacion-dato";

        const spanAgrupDatClave = document.createElement("span");
        spanAgrupDatClave.className = "agrupacion-dato-clave";
        spanAgrupDatClave.textContent = clave;

        const spanAgrupDatValor = document.createElement("span");
        spanAgrupDatValor.className = "agrupacion-dato-valor";
        spanAgrupDatValor.textContent  = valor;

        divAgrupacionDato.append(spanAgrupDatClave, spanAgrupDatValor);
        divAgrupacion.append(divAgrupacionDato);
    }
    elementoGastoWeb.append(divAgrupacion)
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}