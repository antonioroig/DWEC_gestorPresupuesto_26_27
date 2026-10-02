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

function CrearGasto(descripcion, valor) { 
    this.descripcion = String(descripcion);

    if(typeof valor === "number" && Number.isFinite(valor) && valor >= 0 )
    {
        this.valor = valor;
    }
    else{
        this.valor = 0;
    }

    this.mostrarGasto = function () {
    return "Gasto correspondiente a " + this.descripcion +
           " con valor " + this.valor + " €";
    }
    
    this.actualizarDescripcion = function (nuevaDescripcion) {
    this.descripcion = String(nuevaDescripcion);
};

this.actualizarValor = function (nuevoValor) {
    if (
        typeof nuevoValor === "number" &&
        Number.isFinite(nuevoValor) &&
        nuevoValor >= 0
    ) {
        this.valor = nuevoValor;
    }
};

}

function listarGastos() {
    return gastos;
}

function anyadirGasto() {
}

function borrarGasto() {
}

function calcularTotalGastos() {
}

function calcularBalance() {
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
    calcularBalance
}
