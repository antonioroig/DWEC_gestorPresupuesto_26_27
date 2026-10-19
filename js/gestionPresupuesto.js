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

    this.obtenerPeriodoAgrupacion = function(periodo) {
    let fecha = new Date(this.fecha).toISOString();

    if (periodo === "dia") {
        return fecha.slice(0, 10);
    }

    if (periodo === "anyo") {
        return fecha.slice(0, 4);
    }

    return fecha.slice(0, 7);
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

function filtrarGastos(filtro){
    let resultado = gastos;
    if(filtro){
        resultado = gastos.filter(gasto => {
            let Escorrecto = true;
            if(filtro.fechaDesde && gasto.fecha < Date.parse(filtro.fechaDesde)){
                Escorrecto = false;
            }
            if(filtro.fechaHasta && gasto.fecha > Date.parse(filtro.fechaHasta)){
                Escorrecto = false;
            }
            if(filtro.valorMinimo !== undefined && gasto.valor < filtro.valorMinimo){
                Escorrecto = false;
            }
            if(filtro.valorMaximo !== undefined && gasto.valor > filtro.valorMaximo){
                Escorrecto = false;
            }
            if(filtro.descripcionContiene && !gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())){
                Escorrecto = false;
            }
            if(filtro.etiquetasTiene && filtro.etiquetasTiene.length > 0){
                let etiquetasBuscar = filtro.etiquetasTiene.map(e => e.toLowerCase());
                let tieneAlguna = gasto.etiquetas.some(etiquetasGasto => etiquetasBuscar.includes(etiquetasGasto.toLowerCase()));
                if(!tieneAlguna){
                    Escorrecto = false;
                }
            }
            return Escorrecto;
        });
    }
    return resultado;
}
function agruparGastos(periodo = "mes",etiquetas = [], fechaDesde, fechaHasta){
    let filtros = {};
    if(etiquetas && etiquetas.length > 0){
        filtros.etiquetasTiene = etiquetas;
    }
    if(fechaDesde){
        filtros.fechaDesde = fechaDesde;
    }
    filtros.fechaHasta = fechaHasta || new Date().toISOString();
    let gastosFiltrados = filtrarGastos(filtros);
    let agrupados = gastosFiltrados.reduce((acumulador, gasto) => {
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
        if(!acumulador[periodoAgrupacion]){
            acumulador[periodoAgrupacion] = 0;
        }
        acumulador[periodoAgrupacion] += gasto.valor;
        return acumulador;
    }, {});
    return agrupados;
}






export {
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


