"use strict";

import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

gp.actualizarPresupuesto(1500);
let valorPresupuesto = gp.mostrarPresupuesto();
gpw.mostrarDatoEnId('presupuesto', valorPresupuesto);

gp.anyadirGasto(new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida"));
gp.anyadirGasto(new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida"));
gp.anyadirGasto(new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte"));
gp.anyadirGasto(new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina"));
gp.anyadirGasto(new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros"));
gp.anyadirGasto(new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros"));

let gasto1 = new gp.CrearGasto("Coche", 200.54, "2021-10-12", "transporte", "gasolina");

gpw.mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos());

gpw.mostrarDatoEnId('balance-total', gp.calcularBalance());

let gastos = gp.listarGastos();
gastos.forEach(gasto => {
    gpw.mostrarGastoWeb('listado-gastos-completo', gasto);
});

let gastosFiltrados1 = gp.filtrarGastos({ fechaDesde: '2021-09-1', fechaHasta: '2021-09-30' });
gastosFiltrados1.forEach(gasto => {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
});

let gastosFiltrados2 = gp.filtrarGastos({ valorMinimo: 51 });
gastosFiltrados2.forEach(gasto => {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
});

let gastosFiltrados3 = gp.filtrarGastos({ valorMinimo: 201, etiquetasTiene: 'seguros' });
gastosFiltrados3.forEach(gasto => {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
});

let gastosFiltrados4 = gp.filtrarGastos({ valorMaximo: 49, etiquetasTiene: ['comida', 'transporte'] });
gastosFiltrados4.forEach(gasto => {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
});

let gastosAgrupadosPorDia = gp.agruparGastos('dia');
gpw.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrupadosPorDia, 'dia');

let gastosAgrupadosPorMes = gp.agruparGastos('mes');
gpw.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupadosPorMes, 'mes');

let gastosAgrupadosPorAnyo = gp.agruparGastos('anyo');
gpw.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupadosPorAnyo, 'anyo');