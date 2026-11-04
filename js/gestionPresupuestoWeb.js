// mostrarDatoEnId //
function mostrarDatoEnId(idElemento, valor) {
 const elemento = document.getElementById(idElemento);  
 elemento.textContent = valor;                         
}

// crearElemento //
function crearElemento(etiqueta, clase, texto) {
 const el = document.createElement(etiqueta); 
 el.classList.add(clase); 
 el.textContent = texto; 
 return el;
}

// mostrarGastoWeb //
function mostrarGastoWeb(idElemento, gasto) {
    const contenedor = document.getElementById(idElemento);

    const divGasto = document.createElement("div");
    divGasto.classList.add("gasto");

    divGasto.append(crearElemento("div", "gasto-descripcion", gasto.descripcion));
    const fecha = new Date(gasto.fecha).toLocaleDateString();
    divGasto.append(crearElemento("div", "gasto-fecha", fecha));
    divGasto.append(crearElemento("div", "gasto-valor", gasto.valor));

    const divEtiquetas = document.createElement("div");
    divEtiquetas.classList.add("gasto-etiquetas");
    for (const etiqueta of gasto.etiquetas) {
        divEtiquetas.append(crearElemento("span", "gasto-etiquetas-etiqueta", etiqueta));
    }
    
    divGasto.append(divEtiquetas);
    contenedor.append(divGasto); 
}

export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
};