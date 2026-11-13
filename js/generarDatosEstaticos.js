'use strict'
//Programa para generar conjunto gastos y info relacionada en la pag interaccionHTML.html
//importar info ficheros
import * as gestionPresupuesto from './gestionPresupuesto.js';
import * as gestionPresupuestoWeb from './gestionPresupuestoWeb.js';


gestionPresupuesto.actualizarPresupuesto(1500);
gestionPresupuestoWeb.mostrarDatoEnId('presupuesto',gestionPresupuesto.mostrarPresupuesto());

let g1 = new gestionPresupuesto.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");

let g2 = new gestionPresupuesto.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");

let g3 = new gestionPresupuesto.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");

let g4 = new gestionPresupuesto.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");

let g5 = new gestionPresupuesto.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");

let g6 = new gestionPresupuesto.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
gestionPresupuesto.anyadirGasto(g1);
gestionPresupuesto.anyadirGasto(g2);
gestionPresupuesto.anyadirGasto(g3);
gestionPresupuesto.anyadirGasto(g4);
gestionPresupuesto.anyadirGasto(g5);
gestionPresupuesto.anyadirGasto(g6);

let gastosTot = gestionPresupuesto.calcularTotalGastos();
gestionPresupuestoWeb.mostrarDatoEnId('gastos-totales',gastosTot);
let balance = gestionPresupuesto.calcularBalance();
gestionPresupuestoWeb.mostrarDatoEnId('balance-total',balance);
let listadoGastos = gestionPresupuesto.listarGastos();
for(let gasto of listadoGastos){

gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-completo',gasto);
}
let gastosFiltrados = gestionPresupuesto.filtrarGastos({
    fechaDesde: "2021-09-01",
    fechaHasta: "2021-09-30"
});
for(let gasto of gastosFiltrados){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-1',gasto)
}
let gastosFiltrados2 = gestionPresupuesto.filtrarGastos({
   valorMinimo: 50
});
for(let gasto of gastosFiltrados2){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-2',gasto)
}
let gastosFiltrados3 = gestionPresupuesto.filtrarGastos({
   valorMaximo: 200,
   etiquetasTiene:["seguros"]
});
for(let gasto of gastosFiltrados3){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-3',gasto)
}
let gastosFiltrados4 = gestionPresupuesto.filtrarGastos({
   valorMaximo: 50,
   etiquetasTiene:["comida", "transporte"]
});
for(let gasto of gastosFiltrados4){
    gestionPresupuestoWeb.mostrarGastoWeb('listado-gastos-filtrado-4',gasto)
}
let gastoAgrup = gestionPresupuesto.agruparGastos("dia");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-dia',gastoAgrup,"día");

let gastoAgrup2 = gestionPresupuesto.agruparGastos("mes");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-mes',gastoAgrup2,"mes");

let gastoAgrup3 = gestionPresupuesto.agruparGastos("anyo");
    gestionPresupuestoWeb.mostrarGastosAgrupadosWeb('agrupacion-anyo',gastoAgrup3,"año");

