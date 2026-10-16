'use strict';
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0
let gastos = [];
let idGasto = 0;

// Función para actualizar el presupuesto
function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0) 
    {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } 
    else 
    {
        console.error("Error: El valor introducido no es un número válido o es negativo.");
        return -1;
    }


}

// Función para mostrar el presupuesto actual
function mostrarPresupuesto() 
{
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
    
}

 // Función constructora para crear un gasto
function CrearGasto(descripcion, valor, fecha, ...etiquetas) 
{
    {

        this.descripcion = descripcion;

        this.valor = 0;
        if (esNumeroNoNegativo(valor)) 
        {
            this.valor = valor;
        }
    
        this.mostrarGasto = function () 
        {
            return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
        };

        this.mostrarGastoCompleto = function () 
        {
            let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
            texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
            texto += "Etiquetas:\n";
            for (const etiqueta of this.etiquetas) 
            {
                texto += `- ${etiqueta}\n`;
            }
            return texto;
        };
    
        this.actualizarDescripcion = function (nuevaDescripcion) 
        {
            this.descripcion = nuevaDescripcion;
        };
    
        this.actualizarValor = function (nuevoValor) 
        {
            if (esNumeroNoNegativo(nuevoValor)) 
            {
                this.valor = nuevoValor;
            }
        };
        this.actualizarFecha = function (nuevaFecha) 
        {
            if (esFechaValida(nuevaFecha)) 
            {
                this.fecha = Date.parse(nuevaFecha);
            }
        };
 
        this.anyadirEtiquetas = function (...nuevasEtiquetas) 
        {
            for (const etiqueta of nuevasEtiquetas) 
            {
                if (!this.etiquetas.includes(etiqueta)) 
                {
                    this.etiquetas.push(etiqueta);
                }
            }
        };

        this.borrarEtiquetas = function (...etiquetasABorrar) 
        {
            this.etiquetas = this.etiquetas.filter
            (
                (etiqueta) => !etiquetasABorrar.includes(etiqueta)
            );
        };

        this.obtenerPeriodoAgrupacion = function (periodo) 
        {
            const fecha = new Date(this.fecha);
            const anyo = fecha.getFullYear();
            const mes = String(fecha.getMonth() + 1).padStart(2, "0");
            const dia = String(fecha.getDate()).padStart(2, "0");

            switch (periodo) 
            {
                case "dia":
                    return `${anyo}-${mes}-${dia}`;
                case "mes":
                    return `${anyo}-${mes}`;
                case "anyo":
                    return `${anyo}`;
                default:
                    return `${anyo}-${mes}`;
            }
        };
    
        // Inicialización de fecha y etiquetas
        this.fecha = Date.now();
        if (esFechaValida(fecha)) 
        {
            this.fecha = Date.parse(fecha);
        }
    
        this.etiquetas = [];
        this.anyadirEtiquetas(...etiquetas);

    }

}

// Función para listar los gastos almacenados en el array de gastos
function listarGastos() 
{
    return gastos;
}

//función para añadir un gasto al array de gastos, asignándole un id único y devolviendo dicho id
function anyadirGasto(gasto) 
{
    if (gasto instanceof CrearGasto) {
        gasto.id = idGasto++;
        gastos.push(gasto);
        return gasto.id;
    }
}

// Función para borrar un gasto del array de gastos dado su id
function borrarGasto(id) 
{
    const index = gastos.findIndex((gasto) => gasto.id === id);
    if (index !== -1) 
    {
        gastos.splice(index, 1);
        return true;
    }
    return false;
}

function calcularTotalGastos() 
{
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);

}

function calcularBalance() 
{
    return presupuesto - calcularTotalGastos();
}

// Comprueba que el valor sea un número válido y no negativo
function esNumeroNoNegativo(valor) 
{
    return typeof valor === "number" && !isNaN(valor) && valor >= 0;
}
// Comprueba que la fecha sea una cadena de texto válida que pueda ser parseada a un objeto Date
function esFechaValida(fecha) 
{
    return typeof fecha === "string" && !isNaN(Date.parse(fecha));
}

// Función para filtrar los gastos según los criterios especificados en el objeto filtros
function filtrarGastos(filtros = {}) 
{
    return gastos.filter((gasto) => 
    {
        const filtrosNormalizados = filtros ?? {};

        if (filtrosNormalizados.fechaDesde && Date.parse(filtrosNormalizados.fechaDesde) > gasto.fecha) 
        {
            return false;
        }

        if (filtrosNormalizados.fechaHasta && Date.parse(filtrosNormalizados.fechaHasta) < gasto.fecha) 
        {
            return false;
        }

        if (filtrosNormalizados.valorMinimo !== undefined && gasto.valor < filtrosNormalizados.valorMinimo) 
        {
            return false;
        }

        if (filtrosNormalizados.valorMaximo !== undefined && gasto.valor > filtrosNormalizados.valorMaximo) 
        {
            return false;
        }

        if (filtrosNormalizados.descripcionContiene) 
        {
            const textoBuscado = filtrosNormalizados.descripcionContiene.toLowerCase();
            const descripcion = gasto.descripcion.toLowerCase();
            if (!descripcion.includes(textoBuscado)) 
            {
                return false;
            }
        }

        if (Array.isArray(filtrosNormalizados.etiquetasTiene) && filtrosNormalizados.etiquetasTiene.length > 0) 
        {
            const etiquetasDeseadas = filtrosNormalizados.etiquetasTiene.map((etiqueta) => etiqueta.toLowerCase());
            const etiquetasGasto = gasto.etiquetas.map((etiqueta) => etiqueta.toLowerCase());

            const tieneEtiqueta = etiquetasDeseadas.some((etiqueta) => etiquetasGasto.includes(etiqueta));
            if (!tieneEtiqueta) 
            {
                return false;
            }
        }

        return true;
    });
}

//En primer lugar se llamará a filtrarGastos para obtener el subconjunto de gastos creados 
// entre las fechas indicadas y que tengan alguna de las etiquetas proporcionadas en el 
// parámetro correspondiente.

//Ejecutar reduce sobre el conjunto de gastos filtrados. El valor inicial del acumulador 
// de reduce será un objeto vacío. Dentro del cuerpo de la función de reduce, para cada gasto 
// se obtendrá su período de agrupación (a través del método obtenerPeriodoAgrupacion del gasto 
// y el parámetro periodo), que se utilizará para identificar la propiedad del acumulador sobre
//  la que se sumará su valor. Así, si periodo = mes, un gasto con fecha 2021-11-01 tendrá un 
// período de agrupación 2021-11, por lo que su valor se sumará a acc["2021-11"] (siempre que 
// la variable del acumulador haya recibido el nombre acc en la llamada a reduce). Tienes una 
// pista sobre cómo proceder en la siguiente pregunta de Stack Overflow.

//El resultado de reduce será el valor de vuelta de la función agruparGastos.
//1) Realiza una agrupación de gastos por períodos temporales
function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) 
{
    const gastosFiltrados = filtrarGastos({ etiquetasTiene: etiquetas, fechaDesde: fechaDesde, fechaHasta: fechaHasta });
    return gastosFiltrados.reduce((acc, gasto) => 
    {
        const periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
        if (acc[periodoAgrupacion] === undefined) 
        {
            acc[periodoAgrupacion] = 0;
        }

        acc[periodoAgrupacion] += gasto.valor;
        return acc;
    }, {});


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
