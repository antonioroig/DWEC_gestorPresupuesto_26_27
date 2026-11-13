import * as gp from './gestionPresupuesto.js';
import * as gpw from './gestionPresupuestoWeb.js';

// 1. Actualizar presupuesto y mostrarlo
gp.actualizarPresupuesto(1500);
gpw.mostrarDatoEnId("presupuesto", gp.mostrarPresupuesto());

// 2. Crear los gastos requeridos
const g1 = gp.crearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
const g2 = gp.crearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
const g3 = gp.crearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
const g4 = gp.crearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
const g5 = gp.crearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
const g6 = gp.crearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");

// 3. Añadir los gastos al sistema
gp.anyadirGasto(g1);
gp.anyadirGasto(g2);
gp.anyadirGasto(g3);
gp.anyadirGasto(g4);
gp.anyadirGasto(g5);
gp.anyadirGasto(g6);

// 4. Mostrar totales y balance
gpw.mostrarDatoEnId("gastos-totales", gp.calcularTotalGastos());
gpw.mostrarDatoEnId("balance-total", gp.calcularBalance());

// 5. Listados completos y filtrados
const listarYMostrar = (idElemento, filtro) => {
    const gastos = filtro ? gp.filtrarGastos(filtro) : gp.listarGastos();
    for (const gasto of gastos) {
        gpw.mostrarGastoWeb(idElemento, gasto);
    }
};

listarYMostrar("listado-gastos-completo");
listarYMostrar("listado-gastos-filtrado-1", { fechaInicio: "2021-09-01", fechaFin: "2021-09-30" });
listarYMostrar("listado-gastos-filtrado-2", { valorMinimo: 50 });
listarYMostrar("listado-gastos-filtrado-3", { valorMinimo: 200, etiqueta: "seguros" });
listarYMostrar("listado-gastos-filtrado-4", { valorMaximo: 50, etiquetas: ["comida", "transporte"] });

// 6. Agrupaciones temporales
gpw.mostrarGastosAgrupadosWeb("agrupacion-dia", gp.agruparGastos("dia"), "dia");
gpw.mostrarGastosAgrupadosWeb("agrupacion-mes", gp.agruparGastos("mes"), "mes");
gpw.mostrarGastosAgrupadosWeb("agrupacion-anyo", gp.agruparGastos("anyo"), "anyo");