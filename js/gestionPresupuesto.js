// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global

"use strict";

let gastos= [];
let idGasto = 0;

let presupuesto = 0;

function actualizarPresupuesto(valor)
 {
   let cantidad = Number(valor);

   if(isNaN(cantidad) || cantidad < 0)
   {
    console.error("error, el presupuesto introducido no es válido");
    return -1
   }
    presupuesto = cantidad;
    return presupuesto
}

function mostrarPresupuesto() {
    return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas)
{
    this.descripcion = descripcion;
    valor = Number(valor);

    //valor
    if(valor <= 0 || isNaN(valor))
    {
        this.valor = 0;
    }
    else
    {
        this.valor= valor;
    }
    
    //fecha
    let tiempo = Date.parse(fecha)
    if(isNaN(tiempo))
    {
        this.fecha = Date.now();
    }
    else
    {
        this.fecha = tiempo;
    }

    //etiquetas
    this.etiquetas = [];

    this.mostrarGasto = function()
    {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €"
    }

    this.actualizarDescripcion = function(nuevaDescripcion)
    {
        this.descripcion = nuevaDescripcion;
        return this.descripcion;
    };

    this.actualizarValor = function(nuevoValor)
    {
        let numero = Number(nuevoValor);
        
        if(isNaN(numero) || numero < 0)
        {
            return this.valor;
        }

        this.valor = numero;
        return this.valor;
        
    };

    this.actualizarFecha = function(nuevaFecha)
    {
        let tiempoNuevo = Date.parse(nuevaFecha)
        if(!isNaN(tiempoNuevo))
        {
            this.fecha = tiempoNuevo;
        }
    }
    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let i = 0; i < nuevasEtiquetas.length; i++) {
            {
                if (!this.etiquetas.includes(nuevasEtiquetas[i]))
                {
                    this.etiquetas.push(nuevasEtiquetas[i]);
                }
            }
        }
    };

    this.borrarEtiquetas = function(...etiquetasABorrar) 
    {
        for (let i = 0; i < etiquetasABorrar.length; i++)
         {
            let posicion = this.etiquetas.indexOf(etiquetasABorrar[i]);
            if (posicion !== -1)
            {
                this.etiquetas.splice(posicion, 1);
            }
        }
    };

    this.mostrarGastoCompleto = function()
    {
        let fecha = new Date(this.fecha).toLocaleString();

        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n"
        texto += "Fecha: " + fecha + "\n";
        texto += "Etiquetas:\n"

        for(let i = 0 ; i < this.etiquetas.length; i++)
        {
            texto += "- " + this.etiquetas[i] + "\n";
        }
        return texto;
    }

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

   this.obtenerPeriodoAgrupacion = function(periodo)
   {
    let fechaTexto = new Date(this.fecha).toISOString();

    if(periodo === "anyo")
    {
        return fechaTexto.slice(0,4)
    }
    else if(periodo === "mes")
    {
        return fechaTexto.slice(0,7)
    }
    else if (periodo === "dia")
    {
        return fechaTexto.slice(0,10)
    }
   }

}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto)
{
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto)

}

function borrarGasto(id)
{
    for(let i = 0; i < gastos.length; i++)
    {
        if(gastos[i].id === id)
        {
            gastos.splice(i,1);
            break;
        }
    }
}

function calcularTotalGastos()
{
    let total = 0;
    for(let i = 0; i < gastos.length; i++)
    {
        total+= gastos[i].valor;
    }
    return total;
}

function calcularBalance()
{
    return presupuesto - calcularTotalGastos();
}


function filtrarGastos(variables)
{
    let gastosFiltrados = gastos.filter(gasto =>
    {
        if(variables.fechaDesde !== undefined)
        {
            if(gasto.fecha < Date.parse(variables.fechaDesde))
            {
                return false;
            }
        }
        if(variables.fechaHasta !== undefined)
        {
            
            if(gasto.fecha > Date.parse(variables.fechaHasta))
            {
                return false;
            }
        }
        if(variables.valorMinimo !== undefined)
        {
            if(gasto.valor < variables.valorMinimo) 
            {
                return false;
            }
        }
        if(variables.valorMaximo !== undefined)
        {
            if(gasto.valor > variables.valorMaximo)
            {
                return false;
            }
        }
        if(variables.descripcionContiene !== undefined)
        {
            let textoGasto = gasto.descripcion.toLowerCase();
            let textoVariable = variables.descripcionContiene.toLowerCase();

            if(textoGasto.includes(textoVariable) === false)
            {
                return false;
            }
        }
        if(variables.etiquetasTiene !== undefined)
        {
            if (variables.etiquetasTiene.length > 0)
             {
                let arrayEtiquetas = gasto.etiquetas.map(etiqueta => etiqueta.toLowerCase());

                let contieneEtiqueta = variables.etiquetasTiene.some(etiquetaBuscada =>
                {
                    let buscadaMinusculas = etiquetaBuscada.toLowerCase();
                    return arrayEtiquetas.includes(buscadaMinusculas);
                });

                if(contieneEtiqueta === false)
                {
                    return false;
                }
            }
        }
        
        return true; 
    }); 
    
    return gastosFiltrados;
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta)
{
    let fechaMax = fechaHasta;
    if(fechaHasta === undefined)
        {
            fechaMax = new Date().toISOString();
        }

    let reglas = {
        fechaDesde: fechaDesde,
        fechaHasta: fechaMax,
        etiquetasTiene: etiquetas
    }

    let gastosFiltrados = filtrarGastos(reglas);

    let gastosAgrupados = gastosFiltrados.reduce((acumulador, gasto) => {
        
        let nombrePagina = gasto.obtenerPeriodoAgrupacion(periodo);
       
    if(acumulador[nombrePagina] === undefined)
    {
        acumulador[nombrePagina] = 0;
    }
    acumulador[nombrePagina] = acumulador[nombrePagina] + gasto.valor;

    return acumulador;

},{});
return gastosAgrupados
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    listarGastos,
    CrearGasto,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos
}
