'use strict';

import * as presupuestoLogica from './gestionPresupuesto.js';
import * as presupuestoWeb from './gestionPresupuestoWeb.js';

//Actualizar presupuesto y mostrar
presupuestoLogica.actualizarPresupuesto(1500);
presupuestoWeb.mostrarDatoEnId('presupuesto', presupuestoLogica.mostrarPresupuesto());

// Crear los gastos
let g1 = new presupuestoLogica.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let g2 = new presupuestoLogica.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let g3 = new presupuestoLogica.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let g4 = new presupuestoLogica.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let g5 = new presupuestoLogica.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let g6 = new presupuestoLogica.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

//añadir gastos a lista
presupuestoLogica.anyadirGasto(g1);
presupuestoLogica.anyadirGasto(g2);
presupuestoLogica.anyadirGasto(g3);
presupuestoLogica.anyadirGasto(g4);
presupuestoLogica.anyadirGasto(g5);
presupuestoLogica.anyadirGasto(g6);

//Mostrar los totales y balance
presupuestoWeb.mostrarDatoEnId('gastos-totales', presupuestoLogica.calcularTotalGastos());
presupuestoWeb.mostrarDatoEnId('balance-total', presupuestoLogica.calcularBalance());

//Listar gastos
let todosLosGastos = presupuestoLogica.listarGastos();
for (let gasto of todosLosGastos) {
    presupuestoWeb.mostrarGastoWeb('listado-gastos-completo', gasto);
}

//Listar filtrado 1: septiembre de 2021
let filtrados1 = presupuestoLogica.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});
for (let gasto of filtrados1) {
    presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}

//Listar filtrado 2: más de 50€
let filtrados2 = presupuestoLogica.filtrarGastos({
    valorMinimo: 51
});
for (let gasto of filtrados2) {
    presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}

//Listar filtrado 3: más de 200€ con etiqueta seguros
let filtrados3 = presupuestoLogica.filtrarGastos({
    valorMinimo: 201,
    etiquetasTiene: ["seguros"]
});
for (let gasto of filtrados3) {
    presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}

//Listar filtrado 4: comida o transporte de menos de 50€
let filtrados4 = presupuestoLogica.filtrarGastos({
    valorMaximo: 49,
    etiquetasTiene: ["comida", "transporte"]
});
for (let gasto of filtrados4) {
    presupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}

//Agrupacion por dia, mes y año
let agrupDia = presupuestoLogica.agruparGastos('dia');
presupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupDia, 'dia');

let agrupMes = presupuestoLogica.agruparGastos('mes');
presupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', agrupMes, 'mes');

let agrupAnyo = presupuestoLogica.agruparGastos('anyo');
presupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupAnyo, 'anyo');