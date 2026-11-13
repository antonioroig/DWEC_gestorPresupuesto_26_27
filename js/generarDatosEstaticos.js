
 // Funciones de logica de la web

import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

gp.actualizarPresupuesto(1500);

// Mostrar el presupuesto
gpw.mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());

// Crear los 6 gastos
let gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// Añadir los gastos
gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

// Mostrar los gastos totales
gpw.mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2));

// Mostrar el balance total
gpw.mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2));

// Mostrar el listado completo de gastos
let todosLosGastos = gp.listarGastos();
for (let gasto of todosLosGastos) {
    gpw.mostrarGastoWeb('listado-gastos-completo', gasto);
}

// Mostrar listado gastos Septiembre 2021
let filtroSeptiembre = gp.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});

for (let gasto of filtroSeptiembre) {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-1", gasto);
}

// Mostrar gastos de mas de 50 euros
let filtro50 = gp.filtrarGastos({ valorMinimo: 50 });

for (let gasto of filtro50) {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-2", gasto);
}

// Mostrar gastos de mas de 200 euros con etiqueta seguros
let filtroSeguros = gp.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
});

for (let gasto of filtroSeguros) {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-3", gasto);
}

// Mostrar gastos de comida o transporte de menos de 50 euros
let filtroEtiquetas = gp.filtrarGastos({
    valorMaximo: 50,
    etiquetasTiene: ["comida", "transporte"]
});

for (let gasto of filtroEtiquetas) {
    gpw.mostrarGastoWeb("listado-gastos-filtrado-4", gasto);
}

// Mostrar gastos agrupados por dia
gpw.mostrarGastosAgrupadosWeb("agrupacion-dia", gp.agruparGastos("dia"), "día");

// Mostrar gastos agrupados por mes
gpw.mostrarGastosAgrupadosWeb("agrupacion-mes", gp.agruparGastos("mes"), "mes");

// Mostrar gastos agrupados por año
gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo", gp.agruparGastos("anyo"), "año");

