import * as gP
    from "./gestionPresupuesto.js"

import * as gPWEB
    from "./gestionPresupuestoWeb.js"


gP.actualizarPresupuesto(1500)

gPWEB.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto())


const g1 = new gP.CrearGasto ("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const g2 = new gP.CrearGasto ("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const g3 = new gP.CrearGasto ("Bonobús", 18.60, "2020-05-26", "transporte");
const g4 = new gP.CrearGasto ("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const g5 = new gP.CrearGasto ("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const g6 = new gP.CrearGasto ("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gP.anyadirGasto(g1);
gP.anyadirGasto(g2);
gP.anyadirGasto(g3);
gP.anyadirGasto(g4);
gP.anyadirGasto(g5);
gP.anyadirGasto(g6);

gPWEB.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos().toFixed(2));
gPWEB.mostrarDatoEnId("balance-total", gP.calcularBalance().toFixed(2));

for(let gasto of gP.listarGastos()){
    gPWEB.mostrarGastoWeb("listado-gastos-completo", gasto)
}


for(let gasto of gP.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"})){
    gPWEB.mostrarGastoWeb("listado-gastos-filtrado-1", gasto)
}

for(let gasto of gP.filtrarGastos({valorMinimo: 50})){
    gPWEB.mostrarGastoWeb("listado-gastos-filtrado-2", gasto)
}

for(let gasto of gP.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"]})){
    gPWEB.mostrarGastoWeb("listado-gastos-filtrado-3", gasto)
}

for(let gasto of gP.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"]})){
    gPWEB.mostrarGastoWeb("listado-gastos-filtrado-4", gasto)
}

gPWEB.mostrarGastosAgrupadosWeb("agrupacion-dia", gP.agruparGastos("dia"), "día");


gPWEB.mostrarGastosAgrupadosWeb("agrupacion-mes", gP.agruparGastos("mes"), "mes");


gPWEB.mostrarGastosAgrupadosWeb("agrupacion-anyo", gP.agruparGastos("anyo"), "año");