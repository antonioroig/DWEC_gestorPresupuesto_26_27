import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";
 
gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId(
    "presupuesto",
    gp.mostrarPresupuesto()
);

const gastos = [
    new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")
];
 
for (const gasto of gastos) {
    gp.anyadirGasto(gasto);
}

gpw.mostrarDatoEnId(
    "gastos-totales",
    gp.calcularTotalGastos()
);
gpw.mostrarDatoEnId(
    "balance-total",
    gp.calcularBalance()
);

for (const gasto of gp.listarGastos()) {
    gpw.mostrarGastoWeb("listado-gastos-completo", gasto);
}

function mostrarFiltrado(idElemento, filtro) {
    for (const gasto of gp.filtrarGastos(filtro)) {
        gpw.mostrarGastoWeb(idElemento, gasto);
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

gpw.mostrarGastosAgrupadosWeb(
    "agrupacion-dia",
    gp.agruparGastos("dia"),
    "dia"
);
gpw.mostrarGastosAgrupadosWeb(
    "agrupacion-mes",
    gp.agruparGastos("mes"),
    "mes"
);
gpw.mostrarGastosAgrupadosWeb(
    "agrupacion-anyo",
    gp.agruparGastos("anyo"),
    "anyo"
);