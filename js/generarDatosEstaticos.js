import * as gP from './gestionPresupuesto.js'
import * as gPW from './gestionPresupuestoWeb.js'

gP.actualizarPresupuesto(1500)

gPW.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());

let gasto1 = new gP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gP.anyadirGasto(gasto1);
gP.anyadirGasto(gasto2);
gP.anyadirGasto(gasto3);
gP.anyadirGasto(gasto4);
gP.anyadirGasto(gasto5);
gP.anyadirGasto(gasto6);

gPW.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos());

gPW.mostrarDatoEnId("balance-total", gP.calcularBalance());

let listadoGastos = gP.listarGastos();

for(const tipoGasto of listadoGastos){
    gPW.mostrarGastoWeb("listado-gastos-completo", tipoGasto);
}

let listadoGastoFecha = gP.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});

for(const gastoFecha of listadoGastoFecha){
    gPW.mostrarGastoWeb("listado-gastos-filtrado-1", gastoFecha)
}

let listadoGastoSup = gP.filtrarGastos({
   valorMinimo: 50 
});

for(const valor of listadoGastoSup){
    gPW.mostrarGastoWeb("listado-gastos-filtrado-2", valor)
}

let valoresFiltrados =  gP.filtrarGastos({
    valorMinimo : 200,
    etiquetasTiene : ["seguros"]
});

for(const valores of valoresFiltrados){
    gPW.mostrarGastoWeb("listado-gastos-filtrado-3", valores)
}

let gastosFiltrados = gP.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ["comida", "transporte"]
});

for (const gasto of gastosFiltrados) {
    gPW.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

let gastosPorDia = gP.agruparGastos("dia");

gPW.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosPorDia, "dia");

let gastosPorMes = gP.agruparGastos("mes");

gPW.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosPorMes, "mes");

let gastosPorAnyo = gP.agruparGastos("anyo");

gPW.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosPorAnyo, "anyo");