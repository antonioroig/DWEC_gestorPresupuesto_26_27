import * as gp from './gestionPresupuesto.js'
import * as gpw from './gestionPresupuestoWeb.js'

gp.actualizarPresupuesto(1500)

gpw.mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto())

let gasto1 = new gp.CrearGasto("Compra carne", 23.44, "2021-10-06", "casa", "comida")
let gasto2 = new gp.CrearGasto("Compra fruta y verdura", 14.25, "2021-09-06", "supermercado", "comida")
let gasto3 = new gp.CrearGasto("Bonobús", 18.60, "2020-05-26", "transporte")
let gasto4 = new gp.CrearGasto("Gasolina", 60.42, "2021-10-08", "transporte", "gasolina")
let gasto5 = new gp.CrearGasto("Seguro hogar", 206.45, "2021-09-26", "casa", "seguros")
let gasto6 = new gp.CrearGasto("Seguro coche", 195.78, "2021-10-06", "transporte", "seguros")

gp.anyadirGasto(gasto1)
gp.anyadirGasto(gasto2)
gp.anyadirGasto(gasto3)
gp.anyadirGasto(gasto4)
gp.anyadirGasto(gasto5)
gp.anyadirGasto(gasto6)

gpw.mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2))
gpw.mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2))

for(let gasto of gp.listarGastos()){
    gpw.mostrarGastoWeb('listado-gastos-completo', gasto)
}

for(let gasto of gp.filtrarGastos({fechaDesde: "2021-09-01", fechaHasta: "2021-09-30"})){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-1', gasto)
}

for(let gasto of gp.filtrarGastos({valorMinimo: 50.00})){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-2', gasto)
}

for(let gasto of gp.filtrarGastos({valorMinimo: 200.00, etiqueta: "seguros"})){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-3', gasto)
}

for(let gasto of gp.filtrarGastos({valorMaximo: 50.00, etiqueta: "comida" || "transporte"})){
    gpw.mostrarGastoWeb('listado-gastos-filtrado-4', gasto)
}

let gastosAgrup = gp.agruparGastos('dia')
gpw.mostrarGastosAgrupadosWeb('agrupacion-dia', gastosAgrup, 'día')

let gastosAgrupMes = gp.agruparGastos('mes')
gpw.mostrarGastosAgrupadosWeb('agrupacion-mes', gastosAgrupMes, 'mes')

let gastosAgrupAnyo = gp.agruparGastos('anyo')
gpw.mostrarGastosAgrupadosWeb('agrupacion-anyo', gastosAgrupAnyo, 'año')