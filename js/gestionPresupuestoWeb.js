function mostrarDatoEnId(idElemento, valor){
    const elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}
function mostrarGastoWeb(idElemento, gasto){
    const divMaestro = document.createElement('div');
    divMaestro.className = 'gasto';
    document.getElementById(idElemento).append(divMaestro);

    const divDescripcion = document.createElement('div');
    divDescripcion.className = 'gasto-descripcion';
    divDescripcion.textContent = gasto.descripcion;
    divMaestro.append(divDescripcion);

    const divFecha = document.createElement('div');
    divFecha.className = 'gasto-fecha';
    divFecha.textContent = gasto.fecha;
    divMaestro.append(divFecha);

    const divValor = document.createElement('div');
    divValor.className = 'gasto-valor';
    divValor.textContent = gasto.valor;
    divMaestro.append(divValor);

    const divEtiquetas = document.createElement('div');
    divEtiquetas.className = 'gasto-etiquetas';

    for (let etiqueta of gasto.etiquetas) {
        const spanEtiqueta = document.createElement('span');
        spanEtiqueta.className = 'gasto-etiquetas-etiqueta';
        spanEtiqueta.textContent = etiqueta + " ";
        divEtiquetas.append(spanEtiqueta);
    }
    divMaestro.append(divEtiquetas);
}
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){

    const divMaestro = document.createElement('div');
    divMaestro.className = 'agrupacion';
    document.getElementById(idElemento).append(divMaestro);

    const h1Agrup = document.createElement('h1');
    h1Agrup.textContent = "Gastos agrupados por " + periodo;
    divMaestro.append(h1Agrup);
    
    
    for (let [clave,valor] of Object.entries(agrup)){
        const divAgrup = document.createElement('div');
        divAgrup.className = 'agrupacion-dato';
        divMaestro.append(divAgrup);
        
        const spanClave = document.createElement('span');
        spanClave.className = 'agrupacion-dato-clave';
        spanClave.textContent = clave + ": ";
        divAgrup.append(spanClave);

        const spanValor = document.createElement('span');
        spanValor.className = 'agrupacion-dato-valor';
        spanValor.textContent = valor.toFixed(2);
        divAgrup.append(spanValor);


    }

    
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}