"use strict";
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0) 
    {
        presupuesto = nuevoPresupuesto;   
    }
    else
    {
       console.log("El presupuesto no puede ser negativo");
        nuevoPresupuesto = -1;      
    }
    return nuevoPresupuesto;
}

function mostrarPresupuesto() {
    // TODO
    let mensaje = "Tu presupuesto actual es de " + presupuesto + " €";
    return mensaje;
}

function CrearGasto(descripcion, valor, fecha, ...etiqueta) {
    // TODO
    //Propiedades

    this.descripcion = descripcion;
    this.valor = parseFloat(valor);
    
    if (etiqueta === undefined || etiqueta === null || etiqueta === "") {
        this.etiquetas = [];
    }
    else {
        this.etiquetas = Array.from(etiqueta);
    }
    
    if (fecha === undefined || fecha === null || fecha === "") {
        this.fecha = Date.now();
    }else {
        let Fecha = Date.parse(fecha);

        if (isNaN(Fecha)) {
            this.fecha = Date.now();
        }
        else {
            this.fecha = Fecha;
        }
    }
    
    if (valor < 0 || isNaN(valor)) 
    {
        this.valor = 0;
    }
    else{
        this.valor = valor;
    }

    //Métodos

    this.mostrarGasto = function() {
        let mensaje = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
        return mensaje;
    }

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    }

    this.actualizarValor = function(nuevovalor) {
        nuevovalor = parseFloat(nuevovalor);

        if (nuevovalor < 0 || isNaN(nuevovalor)) 
        {
            this.valor = this.valor;
        }
        else{
            this.valor = nuevovalor;
        }
    }

    this.anyadirEtiquetas = function(...nuevaEtiqueta) {
        if (nuevaEtiqueta === undefined || nuevaEtiqueta === null || nuevaEtiqueta === "") {
            this.etiquetas = this.etiquetas;
        }
        else {
            for (let e of nuevaEtiqueta) {
                
                if (!this.etiquetas.includes(e)) {
                    this.etiquetas.push(e);
                }
            }
        }  
    }

    this.mostrarGastoCompleto = function() {
        let fechaFormateada = new Date(this.fecha);
        let mensaje = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + 
        " €.\nFecha: " + fechaFormateada.toLocaleString()  + 
        "\nEtiquetas:\n- " + this.etiquetas.join("\n- ") + "\n";
        return mensaje;
    }

    this.actualizarFecha = function(nuevaFecha) {
        if (nuevaFecha === undefined || nuevaFecha === null || nuevaFecha === "") {
            this.fecha = this.fecha;
        }
        else {
            let Fecha = Date.parse(nuevaFecha);

            if (isNaN(Fecha)) {
                this.fecha = this.fecha;
            }
            else {
                this.fecha = Fecha;
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetas) {
        for (let etiqueta of etiquetas) {
            let index = this.etiquetas.indexOf(etiqueta);
            if (index !== -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let fecha = new Date(this.fecha);
        let periodoAgrupacion = "";
        switch (periodo) {
            case "dia":
                let dia = String(fecha.getDate()).padStart(2, "0");
                let mes = String(fecha.getMonth() + 1).padStart(2, "0");
                let anyo = String(fecha.getFullYear());
                periodoAgrupacion = anyo + "-" + mes + "-" + dia;
                break;
            case "mes":
                let Mes = String(fecha.getMonth() + 1).padStart(2, "0");
                let Anyo = String(fecha.getFullYear());
                periodoAgrupacion = Anyo + "-" + Mes;
                break;
            case "anyo":
                periodoAgrupacion = String(fecha.getFullYear());
                break;
        }
        return periodoAgrupacion;
    }

}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
};

function borrarGasto(id) {
    
    let index = gastos.findIndex(gasto => gasto.id === id); 
    if (index !== -1) {
        gastos.splice(index, 1);

    }
};

function listarGastos() {

    if (gastos.length === 0) {
        return [];
    }
    else {
        return gastos;
    }

};

function calcularTotalGastos() {
    let totalGastos = 0; 
    for (let i = 0; i < gastos.length; i++) {
        totalGastos += gastos[i].valor;
    }
    return totalGastos;
};

function calcularBalance() {
    let balance = presupuesto - calcularTotalGastos();
    return balance;
};

function filtrarGastos({ fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene }){

    return gastos.filter(gasto => {
       if (fechaDesde !== undefined){
        let fechaGasto = gasto.fecha;
        let FechaDesde = Date.parse(fechaDesde);
        if (fechaGasto < FechaDesde || isNaN(FechaDesde)) {
            return false;
        }
       }

       if (fechaHasta !== undefined){
        let fechaGasto = gasto.fecha;
        let FechaHasta = Date.parse(fechaHasta);
        if (fechaGasto > FechaHasta || isNaN(FechaHasta)) {
            return false;
        }
       }

       if (valorMinimo !== undefined){
        if (gasto.valor < valorMinimo) {
            return false;
        }
       }

       if (valorMaximo !== undefined){
        if (gasto.valor > valorMaximo) {
            return false;
        }
       }

       if (descripcionContiene !== undefined){
        let escrito = descripcionContiene.toLowerCase();
        if (!gasto.descripcion.toLowerCase().includes(escrito)) {
            return false;
        }
       }

       if (etiquetasTiene !== undefined){
        let etiquetasBuscadas = etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());
        let etiquetasGasto = gasto.etiquetas.map(etiqueta => etiqueta.toLowerCase());
        if (!etiquetasBuscadas.some(etiqueta => etiquetasGasto.includes(etiqueta))) {
            return false;
        }
       }
       return true;
    });
}
    function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let gastosFiltrados = filtrarGastos({ fechaDesde, fechaHasta, etiquetasTiene: etiquetas });
    
    return gastosFiltrados.reduce((acc, gasto) => {
       
            let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
            if (acc[periodoAgrupacion]) {
                acc[periodoAgrupacion]  = (acc[periodoAgrupacion] || 0) + gasto.valor;
            }       
        return acc;
    }, {});
}

    /*function agruparGastos(periodo, etiquetas = [], fechaDesde, fechaHasta) {
        let gastosFiltrados = filtrarGastos({ fechaDesde, fechaHasta, etiquetasTiene: etiquetas });
        let resultado = gastosFiltrados.reduce((acc, gasto) => {
            let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
            acc[periodoAgrupacion] = (acc[periodoAgrupacion] || 0) + gasto.valor;
            return acc;
        }, {});
        return resultado;
    }*/

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
