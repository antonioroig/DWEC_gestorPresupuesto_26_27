import * as gPresupuesto from './gestionPresupuesto.js';
import * as gPresupuestoWeb from './gestionPresupuestoWeb.js';

gPresupuesto.actualizarPresupuesto(1500);
gPresupuestoWeb.mostrarDatoEnId("presupuesto", gPresupuesto.mostrarPresupuesto());

let g1 = new gPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new gPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new gPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new gPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new gPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new gPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");


gPresupuesto.anyadirGasto(g1);
gPresupuesto.anyadirGasto(g2);
gPresupuesto.anyadirGasto(g3);
gPresupuesto.anyadirGasto(g4);
gPresupuesto.anyadirGasto(g5);
gPresupuesto.anyadirGasto(g6);

gPresupuestoWeb.mostrarDatoEnId("gastos-totales", gPresupuesto.calcularTotalGastos().toFixed(2));

gPresupuestoWeb.mostrarDatoEnId("balance-total", gPresupuesto.calcularBalance().toFixed(2));

for (let gasto of gPresupuesto.listarGastos()) {
    gPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

for (let gasto of gPresupuesto.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" })) {
    gPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

for (let gasto of gPresupuesto.filtrarGastos({ valorMinimo: 50 })) {
    gPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

for (let gasto of gPresupuesto.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] })) {
    gPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

for (let gasto of gPresupuesto.filtrarGastos({ valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] })) {
    gPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

gPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gPresupuesto.agruparGastos("dia"), "día")

gPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gPresupuesto.agruparGastos("mes"), "mes")

gPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gPresupuesto.agruparGastos("anyo"), "año")


