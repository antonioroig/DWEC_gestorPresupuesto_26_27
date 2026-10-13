'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciadonpm audit fix

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(valor) {    
    if (valor >= 0 && typeof valor === "number") {
        presupuesto = valor;
        return valor;
    }
    else {
        console.log('blablabla')
        return -1;
    }
}


function mostrarPresupuesto() {    
    return `Tu presupuesto actual es de ${presupuesto} €`
}


function CrearGasto(descripcion, valor, fecha, ...etiquetas) {    
    if (valor >= 0 && typeof valor === "number") {
        this.descripcion = descripcion;
        this.valor = valor;            
    } else {
        this.descripcion = descripcion;
        this.valor = 0;
    }

    let fechaParam = Date.parse(fecha);
    if (fecha && !isNaN(fechaParam)) {
        this.fecha = fechaParam;
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];
    
    this.anyadirEtiquetas = function(...etiquetasAAnyadir) {
        for (let i = 0; i < etiquetasAAnyadir.length; i++) {
            if (!this.etiquetas.includes(etiquetasAAnyadir[i])) {
                this.etiquetas.push(etiquetasAAnyadir[i])
            }
        }
    }

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        for (let etiqueta of etiquetasABorrar){
            let indice = this.etiquetas.indexOf(etiqueta);
            if (indice !== -1) {
                this.etiquetas.splice(indice, 1);
            }
        }       
    }

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }     
    
    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`
    }

    this.mostrarGastoCompleto = function() {
        let fechaLocal = new Date(this.fecha).toLocaleString();
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${fechaLocal}\n`;
        texto += `Etiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }

        return texto;
    }

    
    this.actualizarDescripcion = function(nuevaDesc) {
        this.descripcion = nuevaDesc;
    }

    // actualizarValor - Función de 1 parámetro que actualizará el valor del objeto. 
    // Se encargará de comprobar que el valor introducido sea un número no negativo; 
    // en caso contrario, dejará el valor como estaba.
    this.actualizarValor = function(valor) {
        if (valor >= 0) {
            this.valor = valor;
        }
    }

    //Función de 1 parámetro que actualizará la  
    // propiedad fecha del objeto. Deberá recibir la fecha en formato string 
    // que sea entendible por la función Date.parse. Si la fecha no es
    // válida, se dejará sin modificar.
    this.actualizarFecha = function(fecha) {
        let fechaParam = Date.parse(fecha);
        if (!isNaN(fechaParam)) {
            this.fecha = fechaParam;
        }
    }

    // obtenerPeriodoAgrupacion - Función de un parámetro que devolverá el período de agrupación correspondiente 
    // al parámetro periodo de la función y a la fecha del gasto. 
    // Si el período a agrupar es dia, el período de agrupación tendrá el formato aaaa-mm-dd; 
    // si es mes, tendrá el formato aaaa-mm; y si es anyo, tendrá el formato aaaa
    this.obtenerPeriodoAgrupacion = function(periodo) {
        let respuestaPeriodo;
        let fechaGasto = new Date(this.fecha);

        let anyo = fechaGasto.getFullYear();
        let mes = String(fechaGasto.getMonth() + 1).padStart(2, 0);
        let dia = String(fechaGasto.getDate()).padStart(2, 0);

        switch (periodo) {
            case "dia":
                respuestaPeriodo = `${anyo}-${mes}-${dia}`;
                break;

            case "mes":
                respuestaPeriodo = `${anyo}-${mes}`;
                break;

            case "anyo":
                respuestaPeriodo = anyo;
                break
            
            default:
                respuestaPeriodo = ""; //No se pide en el enunciado que se tenga en cuenta que no pase ese parámetro mal o vacío
                break;
        }
        return respuestaPeriodo;
    }
}


// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
    function listarGastos() {
        return gastos;    
    }
    
    function anyadirGasto(gasto) {
        gasto.id = idGasto;
        idGasto++;
        gastos.push(gasto);
    }

    //Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto 
    // cuyo id haya sido pasado como parámetro. Si no existe un gasto con el id 
    // proporcionado, no hará nada.
    function borrarGasto(id) {
        let indice = gastos.findIndex(gasto => gasto.id === id) 
        if (indice !== -1) {
            gastos.splice(indice, 1);
        }
    }

    //Función sin parámetros que devuelva la suma de todos los gastos creados en la 
    // variable global gastos. De momento no los agruparemos por período temporal (lo 
    // haremos en sucesivas prácticas).
    function calcularTotalGastos() {
        let total = 0;
        if (gastos.length > 0) {
            for (let gasto of gastos) {
                total += gasto.valor;
            }
        }
        return total;
    }

    //Función sin parámetros que devuelva el balance (presupuesto - gastos totales) 
    // disponible. De momento no lo obtendremos por período temporal (lo haremos en 
    // sucesivas prácticas). Puede utilizar a su vez la función calcularTotalGastos.
    function calcularBalance() {
        let totalGastos = calcularTotalGastos();
        return (presupuesto - totalGastos);        
    }

    // filtrarGastos -> Función de un parámetro que devolverá un subconjunto de los gastos existentes (variable global gastos). 
    // Se deberá utilizar la función filter. El parámetro será un objeto que podrá tener las siguientes propiedades:
    
    // fechaDesde - Fecha mínima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
    
    // fechaHasta - Fecha máxima de creación del gasto. Su valor deberá ser un string con formato válido que pueda entender la función Date.parse.
    
    // valorMinimo - Valor mínimo del gasto.
    
    // valorMaximo - Valor máximo del gasto.
    
    // descripcionContiene - Trozo de texto que deberá aparecer en la descripción. Deberá hacerse la comparación de manera que no se distingan mayúsculas de minúsculas.
    
    // etiquetasTiene - Array de etiquetas: si un gasto contiene alguna de las etiquetas indicadas en este parámetro, se deberá devolver en el resultado. 
    // Deberá hacerse la comparación de manera que no se distingan mayúsculas de minúsculas.
    function filtrarGastos(filtros) {
        return gastos.filter(function(gasto){
            if (filtros.valorMinimo !== undefined && gasto.valor < filtros.valorMinimo) {
                return false;
            }

            if (filtros.valorMaximo !== undefined && gasto.valor > filtros.valorMaximo) {
                return false;
            }

            if (filtros.fechaDesde !== undefined && gasto.fecha < Date.parse(filtros.fechaDesde)) {
                return false;
            }

            if (filtros.fechaHasta !== undefined && gasto.fecha > Date.parse(filtros.fechaHasta)) {
                return false;
            }

            if (filtros.descripcioncontiene !== undefined) {
                let descripcionGasto = gasto.descripcion.toLowerCase();
                let filtroDescripcionContiene = filtros.descripcioncontiene.toLowerCase();

                if (!descripcionGasto.includes(filtroDescripcionContiene)){
                    return false;
                }               
            }

            //TODO falta etiquetasTiene. 
        });
    }

    function agruparGastos() {

    }

export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    CrearGasto
}

