import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

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

gpw.mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2));
gpw.mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2));


let listadoCompleto = gp.listarGastos();
for (let i = 0; i < listadoCompleto.length; i++) {
    gpw.mostrarGastoWeb('listado-gastos-completo', listadoCompleto[i]);
}

let filtroSeptiembre = gp.filtrarGastos({ fechaDesde: "2021-09-01", fechaHasta: "2021-09-30" });
for (let i = 0; i < filtroSeptiembre.length; i++) {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-1', filtroSeptiembre[i]);
}

let filtroMas50 = gp.filtrarGastos({ valorMinimo: 51 });
for (let i = 0; i < filtroMas50.length; i++) {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-2', filtroMas50[i]);
}

let filtroMas200Seguros = gp.filtrarGastos({ valorMinimo: 200, etiquetasTiene: ["seguros"] });
for (let i = 0; i < filtroMas200Seguros.length; i++) {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-3', filtroMas200Seguros[i]);
}

let filtroComidaTransporteMenos50 = gp.filtrarGastos({ valorMaximo: 49, etiquetasTiene: ["comida", "transporte"] });
for (let i = 0; i < filtroComidaTransporteMenos50.length; i++) {
    gpw.mostrarGastoWeb('listado-gastos-filtrado-4', filtroComidaTransporteMenos50[i]);
}

let agrupacionDia = gp.agruparGastos('dia');
gpw.mostrarGastosAgrupadosWeb('agrupacion-dia', agrupacionDia, 'día');

let agrupacionMes = gp.agruparGastos('mes');
gpw.mostrarGastosAgrupadosWeb('agrupacion-mes', agrupacionMes, 'mes');

let agrupacionAnyo = gp.agruparGastos('anyo');
gpw.mostrarGastosAgrupadosWeb('agrupacion-anyo', agrupacionAnyo, 'año');