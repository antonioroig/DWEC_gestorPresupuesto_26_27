import * as gp from './gestionPresupuesto.js'
import * as gpWeb from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500)

gpWeb.mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto())

let gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
let gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
let gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
let gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

gpWeb.mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos())

gpWeb.mostrarDatoEnId('balance-total', gp.calcularBalance())

let gastos = gp.listarGastos();

for (let gasto of gastos)
{    
    gpWeb.mostrarGastoWeb('listado-gastos-completo', gasto)
}

let filtro1 = {
    fechaDesde: '2021-09-1',
    fechaHasta: '2021-09-30'
}
 for (let gasto of gp.filtrarGastos(filtro1))
 {
    gpWeb.mostrarGastoWeb('listado-gastos-filtrado-1', gasto)
 }

 let filtro2 = {
    valorMinimo: 50
 }
  for (let gasto of gp.filtrarGastos(filtro2))
 {
    gpWeb.mostrarGastoWeb('listado-gastos-filtrado-2', gasto)
 }

 let filtro3 = {
    valorMinimo: 200,
    etiquetasTiene: ['seguros']
 }
  for (let gasto of gp.filtrarGastos(filtro3))
 {
    gpWeb.mostrarGastoWeb('listado-gastos-filtrado-3', gasto)
 }

 let filtro4 = {
    valorMaximo: 50,
    etiquetasTiene: ['comida', 'transporte']
 }
  for (let gasto of gp.filtrarGastos(filtro4))
 {
    gpWeb.mostrarGastoWeb('listado-gastos-filtrado-4', gasto)
 }

 gpWeb.mostrarGastosAgrupadosWeb('agrupacion-dia', gp.agruparGastos('dia'), 'dia')

 
 gpWeb.mostrarGastosAgrupadosWeb('agrupacion-mes', gp.agruparGastos('mes'), 'mes')

 
 gpWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo', gp.agruparGastos('anyo'), 'anyo')