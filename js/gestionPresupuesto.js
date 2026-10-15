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
