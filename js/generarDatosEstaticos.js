import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

// 2
gestionPresupuesto.actualizarPresupuesto(1500);
// 3
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());
// 4
let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
// 5
gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);
// 6
gestionPresupuestoWeb.mostrarDatoEnId("gastos-totales", gestionPresupuesto.calcularTotalGastos());
// 7
gestionPresupuestoWeb.mostrarDatoEnId("balance-total", gestionPresupuesto.calcularBalance());
// 8
let gastos = gestionPresupuesto.listarGastos();
for(let gasto of gastos){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}
// 9
let gastosFil1 = gestionPresupuesto.filtrarGastos({fechaDesde: "2021-09-01",fechaHasta:"2021-09-30"})
for(let gasto of gastosFil1){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}
// 10
let gastosFil2 = gestionPresupuesto.filtrarGastos({valorMinimo: 50})
for(let gasto of gastosFil2){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}
// 11
let gastosFil3 = gestionPresupuesto.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]})
for(let gasto of gastosFil3){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}
// 12
let gastosFil4 = gestionPresupuesto.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})
for(let gasto of gastosFil4){
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}
// 13
let gastoDia = gestionPresupuesto.agruparGastos("dia")

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastoDia, "día");
// 14
let gastoMes = gestionPresupuesto.agruparGastos("mes")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastoMes, "mes");

// 15
let gastoAnyo = gestionPresupuesto.agruparGastos("anyo")
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastoAnyo, "año");


