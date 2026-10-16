`user strict`
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0
let gastos = []
let idGasto = 0

function actualizarPresupuesto(value) {
    if(value <= 0 || typeof value !== 'number'){
        console.log("Ha ocurrido un error")
       return -1
    }
    else{
        presupuesto = value
        return presupuesto
    }

}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.fecha = fecha;
    
    if(!isNaN(Date.parse(fecha)) && typeof fecha === 'string'){
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }
        
    if(typeof valor !== 'number' || valor < 0){
        this.valor = 0;
    } else {
        this.valor = valor;
    }

    this.mostrarGasto = function(){
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(texto){
        this.descripcion = texto;
    };

    this.actualizarValor = function(num){
        if(typeof num === 'number' && num > 0){
            this.valor = num;
        }
    };

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas){
        for(let etiqueta of nuevasEtiquetas){
            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        }
    };

    if(etiquetas.length > 0){
        this.anyadirEtiquetas(...etiquetas);
    }

    this.actualizarFecha = function(nuevaFecha){
        if(typeof nuevaFecha === 'string'){
            let timestamp = Date.parse(nuevaFecha); 
            if(!isNaN(timestamp)){
                this.fecha = timestamp;
            }
        }
    };

    this.mostrarGastoCompleto = function(){
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`; 
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += "Etiquetas:\n";
        for(let etiqueta of this.etiquetas){
            texto += `- ${etiqueta}\n`;
        }
        return texto;
    };

    this.borrarEtiquetas = function(...etiqueta){
        for(let i = this.etiquetas.length - 1; i >= 0; i--){
            if(etiqueta.includes(this.etiquetas[i])){
                this.etiquetas.splice(i, 1);
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){
         let texto = ""
        if(typeof periodo === "string"){
         texto = periodo.toLowerCase();    
        }

        let fecha = new Date(this.fecha);

        let dia = String(fecha.getDate()).padStart(2, '0');
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let anyo = String(fecha.getFullYear());

        if(texto === "dia"){
            return `${anyo}-${mes}-${dia}`;
        }
        else if(texto === "mes"){
            return `${anyo}-${mes}`;
        }
        else if(texto === "anyo" || texto === "año"){
            return `${anyo}`;
        }
        
        return `${anyo}-${mes}`;
    };
}

function listarGastos(){
    return gastos
}
function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++
    gastos.push(gasto)
}
function borrarGasto(id){
    for(let i = gastos.length - 1;i >= 0;i--){
        if(gastos[i].id === id){
            gastos.splice(i,1)
            break
        }
    }
}
function calcularTotalGastos(){
    let suma = 0
    for(let i = 0; i < gastos.length;i++){
        suma += gastos[i].valor
    }
    return suma
}
function calcularBalance(){
    let total = calcularTotalGastos()
    let result = presupuesto - total
    return result
}
function filtrarGastos({fechaDesde,fechaHasta,valorMinimo, valorMaximo,descripcionContiene, etiquetasTiene}){
    let result = gastos.filter(function(gasto){
        if(fechaDesde != undefined && gasto.fecha < Date.parse(fechaDesde)){
            return false
        }
        if(fechaHasta != undefined && gasto.fecha > Date.parse(fechaHasta)){
                return false
        }
        if(valorMinimo != undefined && gasto.valor < valorMinimo){
                return false
        }
        if(valorMaximo != undefined && gasto.valor > valorMaximo){
            return false
        }
        if(descripcionContiene != undefined && !gasto.descripcion.toLowerCase().includes(descripcionContiene.toLowerCase())){     
                return false
        }
        if(etiquetasTiene && etiquetasTiene.length >= 0){
            let coincide = false
            const gastosEtiquetas = gasto.etiquetas.map(etiqueta => etiqueta.toLowerCase())
            for(let etiqueta of etiquetasTiene){
                if(gastosEtiquetas.includes(etiqueta.toLowerCase())){
                    coincide = true
                }
            }
            if(!coincide){
                return false 
            }
        }
        return true
    })
    return result
}
function agruparGastos(){

}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    gastos,
    idGasto,
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
