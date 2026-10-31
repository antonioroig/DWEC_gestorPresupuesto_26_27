import * as gp from "./gestionPresupuesto.js";
import * as gpw from "./gestionPresupuestoWeb.js";

/*Actualizar el presupuesto a 1500€ (función `actualizarPresupuesto`)*/
gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

/*Mostrar el presupuesto en el `div#presupuesto` (funciones `mostrarPresupuesto` y `mostrarDatoEnId`)*/
const gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", ["casa", "comida"]);
const gasto2 = new gp.CrearGasto("Compra fruta", 14.60, "2021-10-06", ["supermercado", "comida"]);
const gasto3 = new gp.CrearGasto("Gasolina", 60, "2021-10-02", ["gasolinera", "transporte"]);
const gasto4 = new gp.CrearGasto("Seguro hogar", 236.45, "2021-09-27", ["casa", "seguros"]);
const gasto5 = new gp.CrearGasto("Recibo luz", 153.51, "2021-09-20", ["casa", "facturas"]);
const gasto6 = new gp.CrearGasto("Cena amigos", 30, "2021-09-15", ["ocio", "restaurante"]);

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);
gp.anyadirGasto(gasto4);
gp.anyadirGasto(gasto5);
gp.anyadirGasto(gasto6);

const totalGastos = gp.calcularTotalGastos();
const balance = gp.calcularBalance();

gpw.mostrarDatoEnId("gastos-totales", totalGastos);
gpw.mostrarDatoEnId("balance-total", balance);