'use strict';
function mostrarDatoEnId(idElemento, valor){
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    let contenedor = document.getElementById(idElemento);

    let divGasto = document.createAttribute('div');
    divGasto.className = 'gasto';

    let divDescripcion = document.createAttribute('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divGasto.appendChild(divDescripcion);
    
    let divFecha = document.createAttribute('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = new Date(gasto.fecha).toLocaleDateString();
    divGasto.appendChild(divFecha);

    let divValor = document.createAttribute('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divGasto.appendChild(divValor);

    let divEtiquetas = document.createAttribute('div');
    divEtiquetas.className = 'gasto-etiquetas';
    for (let etiqueta of gasto.etiquetas){
        let span = document.createElement('span');
        span.className = 'gasto-etiquetas-etiqueta';
        span.textContent = etiqueta;
        divEtiquetas.appendChild(span);
    }
    divGasto.appendChild(divEtiquetas);

    contenedor.appendChild(divGasto);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let contenedor = document.getElementById(idElemento);

    let textoPeriodo = periodo;
    if (periodo === 'dia'){
        textoPeriodo = 'día';
    } else if (periodo === 'anyo'){
        textoPeriodo = 'año';
    }

    let divAgrup = document.createElement('div');
    divAgrup.className = 'agrupacion';

    let titulo = document.createElement('h1');
    titulo.textContent = 'Gastos agrupados por ${textoPeriodo}';
    divAgrup.appendChild(titulo);

    let claves = Object.keys(agrup);
    for(let clave of claves){
        let divDato = document.createElement('div');
        divDato.className = 'agrupacion-dato';

        let spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = agrup[clave];
        divDato.appendChild(spanClave);

        let spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = agrup[clave];
        divDato.appendChild(spanValor);

        divAgrup.appendChild(divDato);
    }
    contenedor.appendChild(divAgrup);
}
export {
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}