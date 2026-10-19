'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto  = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(value) {
    if(typeof value === 'number' && value >= 0){
        presupuesto = value;

        return presupuesto
    }else{
        console.log(`Error al intriducir el valor: "${value}" `)
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`
}

function CrearGasto(descripcion,valor,fecha,...etiquetas) {

    if(typeof valor !== "number" || valor < 0){
        valor = 0;
    }

    if(typeof fecha === 'string'  && !isNaN(Date.parse(fecha))){
        fecha = Date.parse(fecha); 
    }else{
        fecha = Date.now();
    }

    this.descripcion = descripcion;
    this.valor = valor;
    this.fecha = fecha;
    this.etiquetas = etiquetas;


    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    }

    this.mostrarGastoCompleto = function() {

        let textoEtiquetas  = "";

        for (let etiqueta of this.etiquetas) {
            textoEtiquetas  += `- ${etiqueta}\n`;
        }

        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n` +
            `Fecha: ${new Date(this.fecha).toLocaleString()}\n` +
            `Etiquetas:\n` +
            textoEtiquetas;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion
    };

    this.actualizarValor = function(nuevoValor) {
        if(typeof nuevoValor !== "number" ||  nuevoValor < 0 ){
            nuevoValor = this.valor;
        }

        this.valor = nuevoValor;
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas){

        for(let etiqueta of nuevasEtiquetas){

            if(!this.etiquetas.includes(etiqueta)){
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.actualizarFecha = function(fecha){
        if(typeof fecha === 'string'  && !isNaN(Date.parse(fecha))){
            this.fecha = Date.parse(fecha); 
        }
    }

   this.borrarEtiquetas = function(...deleteEtiqueta){
    for(let i = 0; i < deleteEtiqueta.length; i++){

        for(let j = 0; j < this.etiquetas.length; j++){

            if(this.etiquetas[j] == deleteEtiqueta[i]){
                this.etiquetas.splice(j, 1);
                j--;
                }
            }
        }
    }

    this.obtenerPeriodoAgrupacion = function(periodo){

        let texto;

        if(typeof periodo === 'string'){
            texto = periodo.toLocaleLowerCase();
        }

        let fecha = new Date(this.fecha);


        let dia = String(fecha.getDate()).padStart(2, '0');
        let mes = String(fecha.getMonth() + 1).padStart(2, '0');
        let anyo = fecha.getFullYear();

        if(texto === 'dia'){
            return anyo + '-' + mes + '-' + dia;
        } else if(texto === 'mes'){
            return anyo + '-' + mes;
        } else if(texto === 'anyo'){
            return String(anyo);
        }
    }
}


function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(gastoId){

    for (let i = 0; i < gastos.length; i++) {
        if (gastos[i].id == gastoId) {
            gastos.splice(i,1);
            return;
        }
    }
}

function calcularTotalGastos(){

    let result = 0;

    for(let gasto of gastos){
        result += gasto.valor;
    }

    return result;
}

function calcularBalance(){

    return presupuesto - calcularTotalGastos();
}

function filtrarGastos({fechaDesde,fechaHasta,valorMinimo,valorMaximo,descripcionContiene,etiquetasTiene}){

    let result = gastos;

    if(typeof fechaDesde === 'string' && !isNaN(Date.parse(fechaDesde))){
        fechaDesde = Date.parse(fechaDesde);
        result = result.filter(gasto => gasto.fecha >= fechaDesde)
    }
    
    if(typeof fechaHasta === 'string' && !isNaN(Date.parse(fechaHasta))){
        fechaHasta = Date.parse(fechaHasta);
        result = result.filter(gasto => gasto.fecha <= fechaHasta)
    }

    if(typeof valorMinimo === 'number'){

        result = result.filter(gasto => gasto.valor >= valorMinimo)
    }

    if(typeof valorMaximo === 'number'){

        result = result.filter(gasto => gasto.valor <= valorMaximo)
    }

    if(typeof descripcionContiene === 'string'){
        result = result.filter(gasto => gasto.descripcion.toLocaleLowerCase().includes(descripcionContiene))
    }

    if(Array.isArray(etiquetasTiene) && etiquetasTiene.length > 0){

        let etq = etiquetasTiene.map(etiqueta => etiqueta.toLowerCase());

        result = result.filter(gasto => gasto.etiquetas.some(etiqueta => etq.includes(etiqueta.toLowerCase())));
    }

    return result;
}

function agruparGastos(periodo = 'mes', etiquetasTiene = [],fechaDesde,fechaHasta = Date()){

    let gastosFiltrados = filtrarGastos({fechaDesde,fechaHasta,etiquetasTiene});

    let result = gastosFiltrados.reduce((acumulador,gasto) => {

        let fecha = gasto.obtenerPeriodoAgrupacion(periodo);

        if(!acumulador[fecha]){
            acumulador[fecha] = 0;
        }

        acumulador[fecha] += gasto.valor;
        return acumulador;
    },{})

    return result;
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
