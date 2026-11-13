// mostrarDatoEnId \\
function mostrarDatoEnId(idElemento, valor) {
 const elemento = document.getElementById(idElemento);  
 elemento.textContent = valor;                         
}

// crearElemento \\
function crearElemento(etiqueta, clase, texto) {
 const el = document.createElement(etiqueta); 
 el.classList.add(clase); 
 el.textContent = texto; 
 return el;
}

// mostrarGastoWeb \\
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

// mostrarGastosAgrupadosEnWeb \\
function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo) {
 const contenedor = document.getElementById(idElemento);



 const nombresPeriodo = { mes: "mes", dia: "día", anyo: "año" };

 const divAgrupacion = document.createElement("div");
 divAgrupacion.classList.add("agrupacion");
 
 const titulo = document.createElement("h1");
 titulo.textContent = "Gastos agrupados por " + nombresPeriodo[periodo];
 divAgrupacion.append(titulo);
 
 for (const [clave, valor] of Object.entries(agrup)) {
    const divDato = document.createElement("div");
    divDato.classList.add("agrupacion-dato");
    
    const spanClave = document.createElement("span");
    spanClave.classList.add("agrupacion-dato-clave");
    spanClave.textContent = clave;

    const spanValor = document.createElement("span");
    spanValor.classList.add("agrupacion-dato-valor");
    spanValor.textContent = valor;
    
    divDato.append(spanClave, spanValor); 
    divAgrupacion.append(divDato);
 }
 contenedor.append(divAgrupacion);
}


export {
  mostrarDatoEnId,
  mostrarGastoWeb,
  mostrarGastosAgrupadosWeb
};