function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto) {
    const destino = document.getElementById(idElemento);

    const contenedor = document.createElement("div");
    contenedor.classList.add("gasto");

    const descripcion = document.createElement("div");
    descripcion.classList.add("gasto-descripcion");
    descripcion.textContent = gasto.descripcion;

    const fecha = document.createElement("div");
    fecha.classList.add("gasto-fecha");
    fecha.textContent = new Date(gasto.fecha).toLocaleString();

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

    contenedor.append(descripcion, fecha, valor, etiquetas);
    destino.append(contenedor);
}
export { mostrarDatoEnId, mostrarGastoWeb };