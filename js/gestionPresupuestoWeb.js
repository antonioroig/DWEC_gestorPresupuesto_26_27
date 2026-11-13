function mostrarDatoEnId(idElemento, valor)
{
    let elemento = document.getElementById(idElemento);
    elemento.textContent = valor;
}

function mostrarGastoWeb(idElemento, gasto)
{
    let caja = document.getElementById(idElemento);
    let etiquetas = "";
    for (let i = 0; i < gasto.etiquetas.length; i++) 
        {
            etiquetas += `<span class="gasto-etiquetas-etiqueta">${gasto.etiquetas[i]}</span>`;
        }

    caja.innerHTML += `<div class="gasto">
            <div class="gasto-descripcion">${gasto.descripcion}</div>
            <div class="gasto-fecha">${gasto.fecha}</div> 
            <div class="gasto-valor">${gasto.valor}</div> 
            <div class="gasto-etiquetas">
                ${etiquetas}
            </div> 
        </div>
    `;
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    
    let caja =  document.getElementById(idElemento);

    let entradas = Object.entries(agrup);
    let datoshtml = "";

    for(let i = 0; i < entradas.length; i++)
    {
        let clave = entradas[i][0];
        let valor = entradas[i][1];

        datoshtml+= `
        <div class="agrupacion-dato">
            <span class="agrupacion-dato-clave">${clave}</span>
            <span class="agrupacion-dato-valor">${valor}</span>
        </div>
        `;
    }

    

    caja.innerHTML=`
    <div class="agrupacion">
        <h1>Gastos agrupados por ${periodo}</h1>
        ${datoshtml}
        </div>
        `;
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,    
    mostrarGastosAgrupadosWeb
}