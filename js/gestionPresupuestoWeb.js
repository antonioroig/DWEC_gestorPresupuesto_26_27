function mostrarDatoEnId(idElemento, valor) {
  let elemento = document.getElementById(idElemento);
  elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {

  let elemento = document.getElementById(idElemento);

  let divGasto = document.createElement("div");
  divGasto.className = "gasto";

  let descripcion = document.createElement("div");
  descripcion.className = "gasto-descripcion";
  descripcion.textContent = gasto.descripcion;

  let fecha = document.createElement("div");
  fecha.className = "gasto-fecha";
  fecha.textContent = new Date(gasto.fecha).toLocaleString();

  let valor = document.createElement("div");
  valor.className = "gasto-valor";
  valor.textContent = gasto.valor;

  let etiquetas = document.createElement("div");
  etiquetas.className = "gasto-etiquetas";

  for (let etiqueta of gasto.etiquetas) {

    let span = document.createElement("span");
    span.className = "gasto-etiquetas-etiqueta";
    span.textContent = etiqueta;

    etiquetas.append(span);
  }

  divGasto.append(descripcion);
  divGasto.append(fecha);
  divGasto.append(valor);
  divGasto.append(etiquetas);

  elemento.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {

  let elemento = document.getElementById(idElemento);

  let divAgrupacion = document.createElement("div");
  divAgrupacion.className = "agrupacion";

  let titulo = document.createElement("h1");

  if (periodo === "dia") {
    titulo.textContent = "Gastos agrupados por día";
  } else if (periodo === "mes") {
    titulo.textContent = "Gastos agrupados por mes";
  } else {
    titulo.textContent = "Gastos agrupados por año";
  }

  divAgrupacion.append(titulo);

  for (let clave in agrup) {

    let divDato = document.createElement("div");
    divDato.className = "agrupacion-dato";

    let spanClave = document.createElement("span");
    spanClave.className = "agrupacion-dato-clave";
    spanClave.textContent = clave + "      ||       ";

    let spanValor = document.createElement("span");
    spanValor.className = "agrupacion-dato-valor";
    spanValor.textContent = agrup[clave].toFixed(2) + " euros";

    divDato.append(spanClave);
    divDato.append(spanValor);

    divAgrupacion.append(divDato);
  }

  elemento.append(divAgrupacion);
}

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
};