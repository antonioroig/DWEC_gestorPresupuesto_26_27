import * as gp from './gestionPresupuesto.js';

function mostrarDatoEnId(idElemento, valor){
    document.getElementById(idElemento).textContent = valor
}

function mostrarGastoWeb(idElemento, gasto){
    const nodoPadre = document.createElement("div")
    nodoPadre.className = "gasto"
    
    const nodoHijo1 = document.createElement("div")
    nodoHijo1.className = "gasto-descripcion"
    nodoHijo1.textContent = gasto.descripcion
    nodoPadre.append(nodoHijo1)

    const nodoHijo2 = document.createElement("div")
    nodoHijo2.className = "gasto-fecha"
    let date = new Date(gasto.fecha)
    nodoHijo2.textContent = date.toLocaleDateString('es')
    nodoPadre.append(nodoHijo2)

    const nodoHijo3 = document.createElement("div")
    nodoHijo3.className = "gasto-valor"
    nodoHijo3.textContent = gasto.valor
    nodoPadre.append(nodoHijo3)

    const nodoHijo4 = document.createElement("div")
    nodoHijo4.className = "gasto-etiquetas"
    nodoPadre.append(nodoHijo4)

    for(let etiqueta of gasto.etiquetas){
        const nodoHijo4_1 = document.createElement("span")
        nodoHijo4_1.className = "gasto-etiquetas-etiqueta"
        nodoHijo4_1.textContent = etiqueta

        let etiquetaBorrada = new BorrarEtiquetasHandle()
        etiquetaBorrada.gasto = gasto
        etiquetaBorrada.etiquetas = etiqueta
        nodoHijo4_1.addEventListener("click", etiquetaBorrada)
        
        nodoHijo4.append(nodoHijo4_1)
    }

    const nodoHijo5 = document.createElement("button")
    nodoHijo5.className = "gasto-editar"
    nodoHijo5.textContent = "Editar"

    let miEdicion = new EditarHandle()
    miEdicion.gastoEditar = gasto
    nodoHijo5.addEventListener("click", miEdicion)

    nodoPadre.append(nodoHijo5)
    

    const nodoHijo6 = document.createElement("button")
    nodoHijo6.className = "gasto-borrar"
    nodoHijo6.textContent = "Borrar"

    let miBorrado = new BorrarHandle()
    miBorrado.gastoBorrar = gasto
    nodoHijo6.addEventListener("click", miBorrado) 

    nodoPadre.append(nodoHijo6)

    const contenedor = document.getElementById(idElemento)
    if(contenedor){
        contenedor.append(nodoPadre)
    }
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    const nodoPadre = document.createElement("div")
    nodoPadre.className = "agrupacion"

    const nodoHijo1 = document.createElement("h1")
    nodoHijo1.textContent = `Gastos agrupados por ${periodo}`
    nodoPadre.append(nodoHijo1)

    for(let [nombre, valor] of Object.entries(agrup)){
        const nodoHijo2 = document.createElement("div")
        nodoHijo2.className = "agrupacion-dato"

        const nodoHijo2_1 = document.createElement("span")
        nodoHijo2_1.className = "agrupacion-dato-clave"
        nodoHijo2_1.textContent = nombre
        nodoHijo2.append(nodoHijo2_1)
        
        const nodoHijo2_2 = document.createElement("span")
        nodoHijo2_2.className = "agrupacion-dato-valor"
        nodoHijo2_2.textContent = `: ${valor.toFixed(2)}`
        nodoHijo2.append(nodoHijo2_2)

        nodoPadre.append(nodoHijo2)
    }

    const contenedor = document.getElementById(idElemento)
    if(contenedor){
        contenedor.append(nodoPadre)
    }
}

function repintar(){
    mostrarDatoEnId('presupuesto', gp.mostrarPresupuesto())
    mostrarDatoEnId('gastos-totales', gp.calcularTotalGastos().toFixed(2))
    mostrarDatoEnId('balance-total', gp.calcularBalance().toFixed(2))
    document.getElementById('listado-gastos-completo').innerHTML = ""

    for(let gasto of gp.listarGastos()){
        mostrarGastoWeb('listado-gastos-completo', gasto)
    }
}

function actualizarPresupuestoWeb(){
    let presupuestoString = prompt('Introduce presupuesto: ', 1500)
    let presupuesto = Number(presupuestoString)

    gp.actualizarPresupuesto(presupuesto)
    repintar()
}

let botonActualizarPresupuesto = document.getElementById('actualizarpresupuesto')
botonActualizarPresupuesto.addEventListener("click", actualizarPresupuestoWeb)

function nuevoGastoWeb(){
    let descripcion = prompt('Introduce descripcion: ', 'Descripcion por defecto')
    let valorString = prompt('Introduce valor: ', '50')
    let fecha = prompt('Introduce fecha: ', '2020-05-22')
    let etiquetas = prompt('Introduce etiquetas: ', 'etiqueta1,etiqueta2,etiqueta3')
    let valor = Number(valorString)

    let arrayEtiquetas = etiquetas.split(',')
    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...arrayEtiquetas)
    gp.anyadirGasto(gasto)
    repintar()
}
let botonAnyadirGasto = document.getElementById('anyadirgasto')
botonAnyadirGasto.addEventListener("click", nuevoGastoWeb)

function EditarHandle(){
    this.handleEvent = function(evento){
        let descripcion = prompt('Introduce descripcion: ', 'Descripcion por defecto')
        let valorString = prompt('Introduce valor: ', '50')
        let fecha = prompt('Introduce fecha: ', '2020-05-22')
        let etiquetas = prompt('Introduce etiquetas: ', 'etiqueta1,etiqueta2,etiqueta3')
        let valor = Number(valorString)

        let arrayEtiquetas = etiquetas.split(',')
        this.gastoEditar.actualizarValor(valor)
        this.gastoEditar.actualizarDescripcion(descripcion)
        this.gastoEditar.actualizarFecha(fecha)
        this.gastoEditar.anyadirEtiquetas(...arrayEtiquetas)
        repintar()
    }
}

function BorrarHandle(){
    this.handleEvent = function(evento){
        gp.borrarGasto(this.gastoBorrar.id)
        repintar()
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(evento){
        this.gasto.borrarEtiquetas(this.etiquetas)
        repintar()
    }
}




export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb,
    repintar,
    actualizarPresupuestoWeb,
    nuevoGastoWeb,
    EditarHandle,
    BorrarHandle,
    BorrarEtiquetasHandle
}