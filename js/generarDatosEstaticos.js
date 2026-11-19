'use strict';
import * as gpw from './gestionPresupuestoWeb.js';
import * as gp from './gestionPresupuesto.js';

gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto());

let gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
let gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

gpw.mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos());
gpw.mostrarDatoEnId('balance-total', gp.calcularBalance());

let listaCompleta = gp.listarGastos();
for (let gasto of listaCompleta){
    gpw.mostrarGastoWeb('listado-gastos-completo',gasto);
}

let filtrado1 = gp.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"});
for (let gasto of filtrado1){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-1', gasto);
}
let filtrado2 = gp.filtrarGastos({ valorMinimo: 50});
for (let gasto of filtrado2){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-2', gasto);
}
let filtrado3 = gp.filtrarGastos({valorMinimo: 200, etiquetasTiene: ["seguros"] });
for (let gasto of filtrado3){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-3', gasto);
}
let filtrado4 = gp.filtrarGastos({valorMaximo: 50, etiquetasTiene: ['comida', 'transporte'] });
for (let gasto of filtrado4){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-4', gasto);
}
let agrupDia = gp.agruparGastos('dia');
gpw.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupDia, 'dia');

let agrupMes = gp.agruparGastos('mes');
gpw.mostrarGastosAgrupadosWeb('agrupacion-mes', agrupMes, 'mes');

let agrupAnyo = gp.agruparGastos('anyo');
gpw.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupAnyo, 'anyo');