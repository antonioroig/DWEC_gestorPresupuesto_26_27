// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


    function actualizarPresupuesto(nuevoPresupuesto)
    {
        if(nuevoPresupuesto >= 0 && typeof nuevoPresupuesto === "number") 
        {
            presupuesto = nuevoPresupuesto;
            return presupuesto;
        }
        else{
            console.error("Error: El presupuesto debe ser un número positivo.");
            return -1;
        }
    }


function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas ) {
    this.descripcion = descripcion;

    if (typeof valor === "number" && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (fecha === undefined || isNaN(Date.parse(fecha))) {
        this.fecha = new Date().getTime();
    } else {
        this.fecha = new Date(fecha).getTime();
    }
    this.etiquetas = [];

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.actualizarFecha = function(nuevaFecha) {
        if (typeof nuevaFecha === "string" && !isNaN(Date.parse(nuevaFecha))) {
            this.fecha = Date.parse(nuevaFecha);
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        for (let etiqueta of etiquetasABorrar) {
            let index = this.etiquetas.indexOf(etiqueta);
            if (index !== -1) {
                this.etiquetas.splice(index, 1);
            }
        }
    };

    this.mostrarGastoCompleto = function() {
        let fechaLocalizada = new Date(this.fecha).toLocaleString();
        let resultado = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaLocalizada}\nEtiquetas:`;
        for (let etiqueta of this.etiquetas) {
            resultado += `\n- ${etiqueta}`;
        }
        return resultado + "\n";
    };
}
function listarGastos() {
    return gastos;
}
function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let index = gastos.findIndex(g => g.id === id);
    if (index !== -1) {
        gastos.splice(index, 1);
    }
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}
export {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}


