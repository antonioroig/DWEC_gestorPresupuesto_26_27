import * as gPWeb from "./gestionPresupuestoWeb.js";
import * as gP from "./gestionPresupuesto.js";

gP.actualizarPresupuesto(1500);
gPWeb.mostrarDatoEnId("presupuesto", gP.mostrarPresupuesto());

let g1 = new gP.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let g2 = new gP.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let g3 = new gP.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
let g4 = new gP.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let g5 = new gP.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let g6 = new gP.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

gP.anyadirGasto(g1)
gP.anyadirGasto(g2)
gP.anyadirGasto(g3)
gP.anyadirGasto(g4)
gP.anyadirGasto(g5)
gP.anyadirGasto(g6)

gPWeb.mostrarDatoEnId("gastos-totales", gP.calcularTotalGastos().toFixed(2));

gPWeb.mostrarDatoEnId("balance-total", gP.calcularBalance().toFixed(2));

for(let gasto of gP.listarGastos()){
    gPWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

for(let gasto of gP.filtrarGastos({fechaDesde: "2021-9-1", fechaHasta: "2021-9-30"})){
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

for(let gasto of gP.filtrarGastos({valorMinimo: 50, })){
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

for(let gasto of gP.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"] })){
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

for(let gasto of gP.filtrarGastos({valorMaximo: 50, etiquetasTiene: ["comida", "transporte"] })){
    gPWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

gPWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gP.agruparGastos("dia"), "dia")

gPWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gP.agruparGastos("mes"), "mes")

gPWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gP.agruparGastos("anyo"), "anyo")



