'use strict';

// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    // TODO
    if(typeof valor === `number` && !isNaN(valor) && valor >= 0) {
        presupuesto = valor;
    }
    else{
        console.error(`El valor del presupuesto debe ser un número mayor o igual a 0`);
        valor = -1;
    }
    return valor;
}

function mostrarPresupuesto() {
    // TODO
    //alert(`Tu presupuesto actual es de ${presupuesto}`);
    return `Tu presupuesto actual es de ${presupuesto} €`;
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
    gastos = gastos.filter(gasto => gasto.id !== id);
}
function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}
function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function CrearGasto(descripcion, valor,fecha, ...etiquetas) {
    // TODO
    this.descripcion = String(descripcion);
    this.valor = (typeof valor === 'number' && valor >= 0) ? valor : 0;

    let fechaParsada = Date.parse(fecha);
    this.fecha = !isNaN(fechaParsada) ? fechaParsada : Date.now();
    this.etiquetas = [];

    this.mostrarGastoCompleto = function() {

        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:`;
        
        for (let etiqueta of this.etiquetas) {
            texto += `\n- ${etiqueta}`;
        }
        
        return texto + "\n";
    };
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = String(nuevaDescripcion);
    };
    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
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
    this.borrarEtiquetas = function(...etiquetasAborrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasAborrar.includes(etiqueta));
    };

    this.actualizarFecha = function(nuevaFecha) {
        let parsed = Date.parse(nuevaFecha);
        if (!isNaN(parsed)) {
            this.fecha = parsed;
        }
    };
    this.obtenerPeriodoAgrupacion = function(periodo){
        let fecha = new Date(this.fecha);
        switch(periodo){
            case 'dia':
                return fecha.getFullYear() + '-' + (fecha.getMonth()+1).toString().padStart(2, '0') + '-' + fecha.getDate().toString().padStart(2, '0');
            case 'mes':
                return fecha.getFullYear() + '-' + (fecha.getMonth()+1).toString().padStart(2, '0');
            case 'anyo':
                return fecha.getFullYear();
            default:
                return "";
        }
    }
}
function filtrarGastos(filtro){
    let resultado = gastos;
    if(filtro){
        resultado = gastos.filter(gasto => {
            let cumpleCondicion = true;
            if(filtro.fechaDesde && gasto.fecha < Date.parse(filtro.fechaDesde)){
                cumpleCondicion = false;
            }
            if(filtro.fechaHasta && gasto.fecha > Date.parse(filtro.fechaHasta)){
                cumpleCondicion = false;
            }
            if(filtro.valorMinimo !== undefined && gasto.valor < filtro.valorMinimo){
                cumpleCondicion = false;
            }
            if(filtro.valorMaximo !== undefined && gasto.valor > filtro.valorMaximo){
                cumpleCondicion = false;
            }
            if(filtro.descripcionContiene && !gasto.descripcion.toLowerCase().includes(filtro.descripcionContiene.toLowerCase())){
                cumpleCondicion = false;
            }
            if(filtro.etiquetasTiene && filtro.etiquetasTiene.length > 0){
                let etiquetasBuscar = filtro.etiquetasTiene.map(e => e.toLowerCase());
                let tieneAlguna = gasto.etiquetas.some(etiquetasGasto => etiquetasBuscar.includes(etiquetasGasto.toLowerCase()));
                if(!tieneAlguna){
                    cumpleCondicion = false;
                }
            }
            return cumpleCondicion;
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
let gasto1 = new CrearGasto("Gasto 1", 23.55, "2021-09-06", "casa", "supermercado" );
console.log(gasto1.obtenerPeriodoAgrupacion("dia"));
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
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
};
