import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId("presupuesto", gestionPresupuesto.mostrarPresupuesto());

let gasto1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");

let gasto2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");

let gasto3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");

let gasto4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");

let gasto5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");

let gasto6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gestionPresupuesto.anyadirGasto(gasto1);
gestionPresupuesto.anyadirGasto(gasto2);
gestionPresupuesto.anyadirGasto(gasto3);
gestionPresupuesto.anyadirGasto(gasto4);
gestionPresupuesto.anyadirGasto(gasto5);
gestionPresupuesto.anyadirGasto(gasto6);

gestionPresupuestoWeb.mostrarDatoEnId(
    "gastos-totales", gestionPresupuesto.calcularTotalGastos().toFixed(2)
);

gestionPresupuestoWeb.mostrarDatoEnId(
    "balance-total", gestionPresupuesto.calcularBalance().toFixed(2)
);

let listaGastos = gestionPresupuesto.listarGastos();
for (let gasto of listaGastos) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

let gastoSeptiembre = gestionPresupuesto.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});

for (let gasto of gastoSeptiembre) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

let gastosMayor50 = gestionPresupuesto.filtrarGastos({
    valorMinimo: 50.01
});

for (let gasto of gastosMayor50) {
  gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

let gastoSeguros = gestionPresupuesto.filtrarGastos({
    valorMinimo: 200.01,
    etiquetasTiene: ["seguros"]
});

for (let gasto of gastoSeguros) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

let gastosComidaTransporte = gestionPresupuesto.filtrarGastos({
    valorMaximo: 49.99,
    etiquetasTiene: ["comida", "transporte"]
});

for (let gasto of gastosComidaTransporte) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}


let gastosAgrupadosDia = gestionPresupuesto.agruparGastos("dia");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-dia", gastosAgrupadosDia, "dia"); 

let gastosAgrupadosMes = gestionPresupuesto.agruparGastos("mes");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-mes", gastosAgrupadosMes,"mes");

let gastosAgrupadosAnyo = gestionPresupuesto.agruparGastos("anyo");
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb("agrupacion-anyo", gastosAgrupadosAnyo, "anyo");

