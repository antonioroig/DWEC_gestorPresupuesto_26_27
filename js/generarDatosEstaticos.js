import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";

/*Actualizar el presupuesto a 1500€ (función `actualizarPresupuesto`)*/
gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

/*Mostrar el presupuesto en el `div#presupuesto` (funciones `mostrarPresupuesto` y `mostrarDatoEnId`)*/
const gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06");
gasto1.anyadirEtiquetas("casa", "comida");
const gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-10-06");
gasto2.anyadirEtiquetas("supermercado", "comida");
const gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26");
gasto3.anyadirEtiquetas("transporte");
const gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08");
gasto4.anyadirEtiquetas("transporte", "gasolina");
const gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26");
gasto5.anyadirEtiquetas("casa", "seguros");
const gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06");
gasto6.anyadirEtiquetas("transporte", "seguros");

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

const totalGastos = gp.calcularTotalGastos();
gpw.mostrarDatoEnId("gastos-totales", totalGastos);

const balance = gp.calcularBalance();
gpw.mostrarDatoEnId("balance-total", balance);

const listaGastos = gp.listarGastos();
console.log("Gastos:", listaGastos);
for(let gasto of listaGastos) {
    gpw.mostrarGastoWeb("listado-gastos-completo", gasto);
}

/*const gastosSeptiembre = gp.filtrarGastos();     TODO: Revisar cómo pasar el periodo a filtrar*/ 
