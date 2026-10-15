'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(value) {
    if(value >= 0 && typeof(value) === 'number'){
        presupuesto = value;
        return presupuesto
    }
    else{
        console.log('Ha ocurrido un error')
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if(!isNaN(Date.parse(fecha)) && fecha){
        this.fecha = Date.parse(fecha)
    }
    else{
        this.fecha = Date.now();
    }

    if(valor >= 0 && typeof(valor) === 'number'){
        this.valor = valor
    }
    else{
        this.valor = 0;
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion
    }

    this.actualizarValor = function(valor){
        if(valor >= 0 && typeof(valor) === 'number'){
            this.valor = valor;
        }
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        for(let etiqueta of nuevasEtiquetas){
            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta)
            }
        }
    }
    
    this.anyadirEtiquetas(...etiquetas)

    this.mostrarGastoCompleto = function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;

        for(let etiqueta of this.etiquetas){
            texto += `- ${etiqueta}\n`;
        }
        return texto;
    }

    this.actualizarFecha = function(fechaNueva){
        if(fechaNueva && !isNaN(Date.parse(fechaNueva))){
            this.fecha = Date.parse(fechaNueva)
        }
    }

    this.borrarEtiquetas = function(...etiquetas){
        for(let i = this.etiquetas.length - 1; i >= 0; i--){
            if(etiquetas.includes(this.etiquetas[i])){
                this.etiquetas.splice(i, 1)
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
        const periodoMinus = periodo.toLowerCase()
        const fechaObj = new Date(this.fecha)

        let anyo = fechaObj.getFullYear();
        let mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        let dia = String(fechaObj.getDate()).padStart(2, '0');
        
        if(periodoMinus === "anyo")
            return String(anyo)
        else if(periodoMinus === "mes")
            return `${anyo}-${mes}`
        else if(periodoMinus === "dia")
            return `${anyo}-${mes}-${dia}`
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto) 
}

function borrarGasto(idBuscar){
    let posicion = gastos.findIndex(item => item.id == idBuscar)
    if(posicion != -1){
        gastos.splice(posicion, 1)
    }
}

function calcularTotalGastos(){
    let suma = 0;
    for(let gasto of gastos){
        suma += gasto.valor;
    }
    return suma;
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos()
}

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){
    return gastos.filter(gasto =>{
        if(fechaDesde != undefined && Date.parse(fechaDesde) > gasto.fecha){
            return false;
        }
        if(fechaHasta != undefined && Date.parse(fechaHasta) < gasto.fecha){
            return false;
        }
        if(valorMinimo != undefined && valorMinimo > gasto.valor){
            return false;
        }
        if(valorMaximo != undefined && valorMaximo < gasto.valor){
            return false;
        }
        if(descripcionContiene != undefined && !gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())){
            return false;
        }
        if(etiquetasTiene && etiquetasTiene.length != 0){
            let coincide = false;
            const gastoEtiquetas = gasto.etiquetas.map(e => e.toLowerCase())
            for(let etiqueta of etiquetasTiene){
                if(gastoEtiquetas.includes(etiqueta.toLowerCase())){
                    coincide = true;
                }
            }
            if(!coincide){
                return false;
            }
        }
        return true;
    })
}

function agruparGastos(){

}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
