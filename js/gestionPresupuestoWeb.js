

function mostrarDatoEnId(idElemento, valor){
    const Elemento = document.getElementById(idElemento);
    Elemento.textContent = String(valor);
};

function mostrarGastoWeb (idElemento, gasto){
    const Elemento = document.getElementById(idElemento);
    const div_gasto = document.createElement("div");
    div_gasto.className = "gasto";

    const gasto_des = document.createElement("div");
    gasto_des.className = "gasto-descripcion";
    gasto_des.textContent = gasto.descripcion;

    const gasto_fecha = document.createElement("div");
    gasto_fecha.className = "gasto-fecha";
    gasto_fecha.textContent = gasto.fecha;

    const gasto_valor = document.createElement("div");
    gasto_valor.className = "gasto-valor";
    gasto_valor.textContent = gasto.valor;

    const gasto_etiquetas = document.createElement("div");
    gasto_etiquetas.className = "gasto-etiquetas";

    

    for(const eti of gasto.etiquetas){
        const spanEti = document.createElement("span")
        spanEti.className = "gasto-etiquetas-etiqueta";
        spanEti.textContent = eti + " ";
        gasto_etiquetas.append(spanEti);
    }
    
    Elemento.append(div_gasto);
    div_gasto.append(gasto_des, gasto_fecha, gasto_valor, gasto_etiquetas);
    

};

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    const Elemento = document.getElementById(idElemento);
    
    const agrupacion = document.createElement("div");
    agrupacion.className = "agrupacion";

    const titulo = document.createElement("h1")
    titulo.textContent = "Gastos agrupados por " + periodo;

    Elemento.append(agrupacion);
    agrupacion.append(titulo);

    for (let [clave,valor] of Object.entries(agrup)){
        const agrupDato = document.createElement("div");
        agrupDato.className = "agrupacion-dato";
        agrupacion.append(agrupDato);
        
        const datoClave = document.createElement("span");
        datoClave.className = "agrupacion-dato-clave";
        datoClave.textContent = clave + ": ";

        const datoValor = document.createElement("span");
        datoValor.className = "agrupacion-dato-valor";
        datoValor.textContent = valor.toFixed(2);

        agrupDato.append(datoClave, datoValor);
    }
     


};



export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}