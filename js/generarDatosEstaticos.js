import * as gpw from './gestionPresupuestoWeb.js'; 
import * as gp from './gestionPresupuesto.js'; 

gp.actualizarPresupuesto(1000);

let gasto1 = new gp.CrearGasto("Compra supermercado", 45, "2026-11-02", "comida");
let gasto2 = new gp.CrearGasto("Gasolina", 60, "2026-11-04", "coche");
let gasto3 = new gp.CrearGasto("Cena", 35, "2026-11-06", "comida", "ocio");

gp.anyadirGasto(gasto1);
gp.anyadirGasto(gasto2);
gp.anyadirGasto(gasto3);

let gastos = gp.listarGastos();


for (let i = 0; i < gastos.length; i++) {
    gpw.mostrarGastoWeb("lista-gastos", gastos[i]);
}

let gastosAgrup = gp.agruparGastos("mes");
gpw.mostrarGastosAgrupadosWeb("gastos-agrupados", gastosAgrup, "mes");