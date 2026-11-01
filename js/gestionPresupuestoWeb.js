function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

export { mostrarDatoEnId };