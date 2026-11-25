// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
 let presupuesto = 0;
 let gastos = [];
 let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if(
        typeof nuevoPresupuesto === "number" &&
        Number.isFinite(nuevoPresupuesto) && 
        nuevoPresupuesto >= 0
    )
    {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    }
    else {
        console.error("El presupuesto no puede ser negativo.");
        return -1
    }
}

function mostrarPresupuesto() {
        return "Tu presupuesto actual es de " + presupuesto + " €";   
    
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) { 
    this.descripcion = String(descripcion);

    if(typeof valor === "number" && Number.isFinite(valor) && valor >= 0 )
    {
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    if (
    typeof fecha === "string" && !Number.isNaN(Date.parse(fecha))) 
    {
    this.fecha = Date.parse(fecha);
    } 
    else {
    this.fecha = Date.now();
    }

    this.etiquetas = [];

    this.mostrarGasto = function () {
    return "Gasto correspondiente a " + this.descripcion +
           " con valor " + this.valor + " €";
    }

    this.mostrarGastoCompleto = function () {
    let texto = this.mostrarGasto() + ".";
    texto += "\nFecha: " + new Date(this.fecha).toLocaleString();
    texto += "\nEtiquetas:";

    for (let etiqueta of this.etiquetas) {
        texto += "\n- " + etiqueta;
    }
    texto += "\n";
    return texto;
};
    
    this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = String(nuevaDescripcion);

    };

this.anyadirEtiquetas = function (...nuevasEtiquetas) {
    for (let etiqueta of nuevasEtiquetas) {
        if (!this.etiquetas.includes(etiqueta)) {
            this.etiquetas.push(etiqueta);
        }
    }

this.obtenerPeriodoAgrupacion = function(periodo){
    let fecha = new Date(this.fecha);

    let anyo = fecha.getFullYear();
    let mes = fecha.getMonth() + 1;
    let dia = fecha.getDate();

    if (mes < 10){
        mes  =  "0" + mes;
    }

    if(dia < 10){
        dia = "0" + dia;
    }

    if (periodo === "dia"){
        return anyo + "-" + mes + "-" + dia;
    }
    else if (periodo === "anyo"){
        return anyo;
    }
    else{
        return anyo + "-" + mes;
    }

}

};

this.anyadirEtiquetas(...etiquetas);



this.actualizarValor = function (nuevoValor) {
    if (
        typeof nuevoValor === "number" &&
        Number.isFinite(nuevoValor) &&
        nuevoValor >= 0
    ) {
        this.valor = nuevoValor;
    }
};

this.actualizarFecha = function (nuevaFecha) {
    if (
        typeof nuevaFecha === "string" &&
        !Number.isNaN(Date.parse(nuevaFecha))
    ) {
        this.fecha = Date.parse(nuevaFecha);
    }
};

this.borrarEtiquetas = function (...etiquetasBorrar) {
    for (let etiqueta of etiquetasBorrar) {
        let posicion = this.etiquetas.indexOf(etiqueta);

        if (posicion !== -1) {
            this.etiquetas.splice(posicion, 1);
        }
    }
};

}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
gasto.id = idGasto;
idGasto += 1;
gastos.push(gasto);
}

function borrarGasto(id) {
    for(let i = 0; i < gastos.length ; i ++){
        if(gastos[i].id === id){
            gastos.splice(i,1);
            return;
        }
    }
}

function calcularTotalGastos() {
    let total = 0;

    for (let i = 0; i < gastos.length ; i ++){
        total += gastos[i].valor;
    }

    return total;
}

function calcularBalance() {
      let totalGastos = calcularTotalGastos();
    let balance = presupuesto - totalGastos;

    return balance;
}

function filtrarGastos(filtros = {}){
    let gastosFiltrados = gastos.filter (function(gasto){

    if(filtros.fechaDesde !== undefined && gasto.fecha < Date.parse(filtros.fechaDesde)){
        return false;
    }

     if (
            filtros.fechaHasta !== undefined &&
            gasto.fecha > Date.parse(filtros.fechaHasta)
        ) {
            return false;
        }

        if (
            filtros.valorMinimo !== undefined &&
            gasto.valor < filtros.valorMinimo
        ) {
            return false;
        }

        if (
            filtros.valorMaximo !== undefined &&
            gasto.valor > filtros.valorMaximo
        ) {
            return false;
        }

        if (filtros.descripcionContiene !== undefined) {
            let descripcion = gasto.descripcion.toLowerCase();
            let textoBuscado = filtros.descripcionContiene.toLowerCase();

            if (!descripcion.includes(textoBuscado)) {
                return false;
            }
        }

        if (
            filtros.etiquetasTiene !== undefined &&
            filtros.etiquetasTiene.length > 0
        ) {
            let encontrada = false;

            for (let etiquetaBuscada of filtros.etiquetasTiene) {
                for (let etiquetaGasto of gasto.etiquetas) {
                    if (
                        etiquetaBuscada.toLowerCase() ===
                        etiquetaGasto.toLowerCase()
                    ) {
                        encontrada = true;
                    }
                }
            }

            if (!encontrada) {
                return false;
            }
        }

        return true;

    })
    return gastosFiltrados;
}

function agruparGastos( periodo = "mes", etiquetas = [],fechaDesde,fechaHasta) {
    let filtros = {};

    if (etiquetas.length > 0) {
        filtros.etiquetasTiene = etiquetas;
    }

    if (fechaDesde !== undefined) {
        filtros.fechaDesde = fechaDesde;
    }

    if (fechaHasta !== undefined) {
        filtros.fechaHasta = fechaHasta;
    } else {
        filtros.fechaHasta = new Date().toISOString();
    }

    let gastosFiltrados = filtrarGastos(filtros);

    return gastosFiltrados.reduce(function (acumulador, gasto) {
        let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acumulador[periodoGasto] === undefined) {
            acumulador[periodoGasto] = 0;
        }

        acumulador[periodoGasto] += gasto.valor;

        return acumulador;
    }, {});
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
