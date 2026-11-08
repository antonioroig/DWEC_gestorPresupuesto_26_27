import * as logica from "./gestionPresupuesto.js";
import * as web from "./gestionPresupuestoWeb.js";

logica.actualizarPresupuesto(1500);

let textoPresupuesto = logica.mostrarPresupuesto();
web.mostrarDatoEnId("presupuesto", textoPresupuesto);

let gasto1 = new logica.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida");
logica.anyadirGasto(gasto1);

let gasto2 = new logica.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida");
logica.anyadirGasto(gasto2);

let gasto3 = new logica.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte");
logica.anyadirGasto(gasto3);

let gasto4 = new logica.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina");
logica.anyadirGasto(gasto4);

let gasto5 = new logica.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros");
logica.anyadirGasto(gasto5);

let gasto6 = new logica.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros");
logica.anyadirGasto(gasto6);

let total = logica.calcularTotalGastos();
web.mostrarDatoEnId("gastos-totales", total)

let balance = logica.calcularBalance();
web.mostrarDatoEnId("balance-total", balance);

let gastosListados = logica.listarGastos();
for(let i = 0; i < gastosListados.length; i++)
{
    web.mostrarGastoWeb("listado-gastos-completo", gastosListados[i]);
}

let gastosSept = logica.filtrarGastos(
    {
        fechaDesde: "2021-09-01",
        fechaHasta: "2021-09-30"
    })

    for (let i = 0; i < gastosSept.length; i++)
    {
        web.mostrarGastoWeb("listado-gastos-filtrado-1", gastosSept[i]);
    }


let gastosMasDe50 = filtrarGastos({
    valorMinimo:50
});

for (let i = 0; i < gastosMasDe50.length; i++)
{
    web.mostrarGastoWeb("listado-gastos-filtrado-2", gastosMasDe50[i]);
}

let gastosMasDe200ConSeguros = logica.filtrarGastos({
    valorMinimo: 200,
    etiquetasTiene: ["seguros"]
})

for(let i = 0; i < gastosMasDe200ConSeguros.length; i++)
{
    web.mostrarGastoWeb("listado-gastos-filtrado-3",gastosMasDe200ConSeguros[i])
}

let gastosEtiquetaOComidaMenos50 = logica.filtrarGastos({
    valorMaximo:50,
    etiquetasTiene:["comida", "transporte"]
})

for(let i = 0; i < gastosEtiquetaOComidaMenos50.length; i++)
{
    web.mostrarGastoWeb("listado-gastos-filtrado-4", gastosEtiquetaOComidaMenos50[i]);
}

let agrupadosDia = logica.agruparGastos("dia");
web.mostrarGastosAgrupadosWeb("agrupacion-dia",agrupadosDia,"dia");

let agrupadosMes = logica.agruparGastos("mes");
web.mostrarGastosAgrupadosWeb("agrupacion-mes",agrupadosMes,"mes");

let agrupadosAnyo = logica.agruparGastos("anyo");
web.mostrarGastosAgrupadosWeb("agrupacion-anyo",agrupadosAnyo,"anyo");