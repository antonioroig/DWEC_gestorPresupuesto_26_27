'use strict';

function mostrarDatoEnId(idElemento, valor) {
    const elemento = document.getElementById(idElemento);
    if (elemento) {
        elemento.textContent = valor;
    }
}
