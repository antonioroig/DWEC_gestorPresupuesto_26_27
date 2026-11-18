import * as gp from './gestionPresupuesto.js'

function mostrarDatoEnId(idElemento, valor) {
  document.getElementById(idElemento).textContent = valor;
}

function mostrarGastoWeb(idElemento, valor){

    let divgasto = document.createElement("div")
    divgasto.classList.add("gasto")

    let divdescripcion = document.createElement("div")
    divdescripcion.classList.add("gasto-descripcion")
    divdescripcion.textContent = valor.descripcion

    let divfecha = document.createElement("div")
    divfecha.classList.add("gasto-fecha")
    divfecha.textContent = valor.fecha


    let div_valor = document.createElement("div")
    div_valor.classList.add("gasto-valor")
    div_valor.textContent = valor.valor


    let divetiquetas = document.createElement("div")
    divetiquetas.classList.add("gasto-etiquetas")

    divgasto.append(divdescripcion)
    divgasto.append(divfecha)
    divgasto.append(div_valor)
    divgasto.append(divetiquetas)

    for(let i = 0; i < valor.etiquetas.length ;i++){
        let span_etiqueta = document.createElement("span")
        span_etiqueta.classList.add("gasto-etiquetas-etiqueta")
        span_etiqueta.textContent = valor.etiquetas[i]

        divetiquetas.append(span_etiqueta)
    }

    document.getElementById(idElemento).append(divgasto)
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo ){

    let divprincipal = document.createElement("div")
    divprincipal.classList.add("agrupacion")

    let h1 = document.createElement("h1")
    h1.textContent = `Gastos agrupados por ${periodo}`

    divprincipal.append(h1)
    for (var [key, value] of Object.entries(agrup)) {
        
        let divagrup = document.createElement("div")
        divagrup.classList.add("agrupacion-dato")

        let span1 = document.createElement("span")
        span1.classList.add("agrupacion-dato-clave")
        span1.textContent = key + " - "

         let span2 = document.createElement("span")
        span2.classList.add("agrupacion-dato-valor")
        span2.textContent = value.toFixed(2)

        divagrup.append(span1)
        divagrup.append(span2)
        divprincipal.append(divagrup)
    }
    document.getElementById(idElemento).append(divprincipal)
}

function repintar(){
    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());
    mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2));
    mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2));
    
    
    let listadoCompleto = gp.listarGastos();
    for (let i = 0; i < listadoCompleto.length; i++) {
        mostrarGastoWeb('listado-gastos-completo', listadoCompleto[i]);
    }
    
    let filtroSeptiembre = gp.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
    for (let i = 0; i < filtroSeptiembre.length; i++) {
        mostrarGastoWeb('listado-gastos-filtrado-1', filtroSeptiembre[i]);
    }
    
    let filtroMas50 = gp.filtrarGastos({ valorMinimo: 51 });
    for (let i = 0; i < filtroMas50.length; i++) {
        mostrarGastoWeb('listado-gastos-filtrado-2', filtroMas50[i]);
    }
    
    let filtroMas200Seguros = gp.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });
    for (let i = 0; i < filtroMas200Seguros.length; i++) {
        mostrarGastoWeb('listado-gastos-filtrado-3', filtroMas200Seguros[i]);
    }
    
    let filtroComidaTransporteMenos50 = gp.filtrarGastos({ valorMaximo: 49, etiquetasTiene: ["comida", "transporte"] });
    for (let i = 0; i < filtroComidaTransporteMenos50.length; i++) {
        mostrarGastoWeb('listado-gastos-filtrado-4', filtroComidaTransporteMenos50[i]);
    }
    
    let agrupacionDia = gp.agruparGastos('dia');
    mostrarGastosAgrupadosWeb('agrupacion-dia', agrupacionDia, 'día');
    
    let agrupacionMes = gp.agruparGastos('mes');
    mostrarGastosAgrupadosWeb('agrupacion-mes', agrupacionMes, 'mes');
    
    let agrupacionAnyo = gp.agruparGastos('anyo');
    mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupacionAnyo, 'año');
    
}


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar
}