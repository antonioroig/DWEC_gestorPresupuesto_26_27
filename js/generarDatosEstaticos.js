'use strict';

import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";
 
gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId(
    "presupuesto",
    gp.mostrarPresupuesto()
);

const gastos = [
    gestionPresupuesto.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    gestionPresupuesto.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    gestionPresupuesto.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    gestionPresupuesto.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    gestionPresupuesto.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    gestionPresupuesto.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];
 
for (const gasto of gastos) {
    gestionPresupuesto.anyadirGasto(gasto);
}

gestionPresupuestoWeb.mostrarDatoEnId(
    "gastos-totales",
    gestionPresupuesto.calcularTotalGastos()
);
gestionPresupuestoWeb.mostrarDatoEnId(
    "balance-total",
    gestionPresupuesto.calcularBalance()
);

for (const gasto of gestionPresupuesto.listarGastos()) {
    gestionPresupuestoWeb.mostrarGastoWeb("listado-gastos-completo", gasto);
}

function mostrarFiltrado(idElemento, filtro) {
    for (const gasto of gestionPresupuesto.filtrarGastos(filtro)) {
        gestionPresupuestoWeb.mostrarGastoWeb(idElemento, gasto);
    }
}

mostrarFiltrado("listado-gastos-filtrado-1", {
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});

mostrarFiltrado("listado-gastos-filtrado-2", { valorMinimo: 50 });

mostrarFiltrado("listado-gastos-filtrado-3", {
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
});

mostrarFiltrado("listado-gastos-filtrado-4", {
    valorMaximo: 50,
    etiquetasTiene: ["comida", "transporte"]
});

gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-dia",
    gestionPresupuesto.agruparGastos("dia"),
    "dia"
);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-mes",
    gestionPresupuesto.agruparGastos("mes"),
    "mes"
);
gestionPresupuestoWeb.mostrarGastosAgrupadosWeb(
    "agrupacion-anyo",
    gestionPresupuesto.agruparGastos("anyo"),
    "anyo"
);