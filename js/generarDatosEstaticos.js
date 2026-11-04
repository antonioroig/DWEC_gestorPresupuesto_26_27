// Imports \\
import * as gestionPresupuesto from "./gestionPresupuesto.js";
import * as gestionPresupuestoWeb from "./gestionPresupuestoWeb.js";

// Presupuesto \\
gestionPresupuesto.actualizarPresupuesto(1500);

gestionPresupuestoWeb.mostrarDatoEnId(
    "presupuesto",
    gestionPresupuesto.mostrarPresupuesto()
);





