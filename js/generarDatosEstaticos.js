import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';

//
gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId(
    "presupuesto", gestionPresupuesto.mostrarPresupuesto()
);

// crear y añadir gastos
const gastos = [
    new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"),
    new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"),
    new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"),
    new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"),
    new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"),
    new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"),
];

for  (const gasto of gastos) {
    gestionPresupuesto.anyadirGasto( gasto);
}

// mostrar gastos totales y balance
gestionPresupuestoWeb.mostrarDatoEnId(
    "gastos-totales", gestionPresupuesto.calcularTotalGastos()
);
gestionPresupuestoWeb.mostrarDatoEnId(
    "balance-total", gestionPresupuesto.calcularBalance()
);

// listados
function mostrarListado(idElemento, lista) {
    for (const gasto of lista) {
        gestionPresupuestoWeb.mostrarGastoWeb(idElemento, gasto);
    }
}

mostrarListado("listado-gastos-completo", gestionPresupuesto.listarGastos());

mostrarListado(
    "listado-gastos-filtrado-1",
    gestionPresupuesto.filtrarGastos({
        fechaDesde: "2021-09-01",
        fechaHasta: "2021-09-30",
    })
);

mostrarListado(
  "listado-gastos-filtrado-2",
  gestionPresupuesto.filtrarGastos({ valorMinimo: 50 })
);

mostrarListado(
    "listado-gastos-filtrado-3",
    gestionPresupuesto.filtrarGastos({
        valorMinimo: 200,
        etiquetasTiene: ["seguros"],
    })
);

mostrarListado(
    "listado-gastos-filtrado-4",
    gestionPresupuesto.filtrarGastos({
        valorMaximo: 50,
        etiquetasTiene: ["comida", "transporte"],
    })
);

// agrupaciones
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