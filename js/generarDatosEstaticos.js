import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";

gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

const gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

gpw.mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
gpw.mostrarDatoEnId("balance-total", gp.calcularBalance());

let listaGastos = gp.listarGastos();

for(let gasto of listaGastos){
    gpw.mostrarGastoWeb("listado-gastos-completo", gasto);
}

let listaFiltradaGastos = gp.filtrarGastos(1-9-2021, 30-9-2021);
for(let gasto of listaFiltradaGastos){
    gpw.mostrarGastosWeb("listado-gastos-filtrado-1", gasto);
}

