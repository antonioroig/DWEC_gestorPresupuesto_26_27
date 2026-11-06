function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);

    const divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    const descripcion = document.createElement("div");
    descripcion.classList.add("gasto-descripcion");
    descripcion.textContent = gasto.descripcion;

    const fecha = document.createElement("div");
    fecha.classList.add("gasto-fecha");
    fecha.textContent = gasto.fecha;

    const valor = document.createElement("div");
    valor.classList.add("gasto-valor");
    valor.textContent = gasto.valor;

    const etiquetas = document.createElement("div");
    etiquetas.classList.add("gasto-etiquetas");
    for (const etiqueta of gasto.etiquetas) {
        const span = document.createElement("span");
        span.classList.add("gasto-etiquetas-etiqueta");
        span.textContent = etiqueta;
        etiquetas.append(span);
    }

    divGasto.append(descripcion, fecha, valor, etiquetas);
    contenedor.append(divGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
    const contenedor = document.getElementById(idElemento);
    const nombres = {mes: "mes", dia: "día", anyo: "año"};

    const divAgrup = document.createElement("div");
    divAgrup.classList.add("agrupacion");

    const titulo = document.createElement("h1");
    titulo.textContent = `Gastos agrupados por ${nombres[periodo]}`;
    divAgrup.append(titulo);

    for (const [clave, valor] of Object.entries(agrup)) {
        const dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");

        const spanClave = document.createElement("span");
        spanClave.classList.add("agrupacion-dato-clave");
        spanClave.textContent = clave;

        const spanValor = document.createElement("span");
        spanValor.classList.add("agrupacion-dato-valor");
        spanValor.textContent = valor;

        dato.append(spanClave, spanValor);
        divAgrup.append(dato);
    }

    contenedor.append(divAgrup);
}

export   { 
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
};