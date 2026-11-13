'use strict';// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;


function actualizarPresupuesto(dinero) {
    if (dinero < 0 || isNaN(dinero))
    {
        console.error("El valor introducido debe ser un número no negativo.");
        return -1;
    }
        
    presupuesto = dinero;
    presupuesto = Number(presupuesto.toFixed(2));
    return presupuesto; 
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor = 0, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    
    if (valor < 0 || isNaN(valor)) {
        this.valor = 0;
    } else {
        this.valor = valor;
    }

    let parsedDate = new Date(fecha);
    if (typeof fecha === 'string' && !isNaN(parsedDate)) {
        this.fecha = parsedDate;
        
    } else {
        this.fecha = new Date();
    }

    this.etiquetas = [];

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let i = 0; i < nuevasEtiquetas.length; i++) {
            let et = nuevasEtiquetas[i];
            if (Array.isArray(et)) {
                for (let j = 0; j < et.length; j++) {
                    if (typeof et[j] === 'string' && !this.etiquetas.includes(et[j])) {
                        this.etiquetas.push(et[j]);
                    }
                }
            } else if (typeof et === 'string' && !this.etiquetas.includes(et)) {
                this.etiquetas.push(et);
            }
        }
    };

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        for (let i = 0; i < etiquetasABorrar.length; i++) {
            let et = etiquetasABorrar[i];
            if (Array.isArray(et)) {
                for (let j = 0; j < et.length; j++) {
                    let index = this.etiquetas.indexOf(et[j]);
                    if (index !== -1) {
                        this.etiquetas.splice(index, 1);
                    }
                }
            } else {
                let index = this.etiquetas.indexOf(et);
                if (index !== -1) {
                    this.etiquetas.splice(index, 1);
                }
            }
        }
    };

    this.actualizarFecha = function(nuevaFecha) {
        let parsedDate = new Date(nuevaFecha);
        if (typeof nuevaFecha === 'string' && !isNaN(parsedDate)) {
            this.fecha = parsedDate;
        }
    };

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.mostrarGastoCompleto = function() {
        let fechaObj = new Date(this.fecha);
        let fechaTexto = fechaObj.toLocaleString('es-ES');
        
        let textoEtiquetas = "";
        for (let i = 0; i < this.etiquetas.length; i++) {
            textoEtiquetas = textoEtiquetas + "- " + this.etiquetas[i] + "\n";
        }

        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.\n" +
            "Fecha: " + fechaTexto + "\n" +
            "Etiquetas:\n" + 
            textoEtiquetas;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (isNaN(nuevoValor) || nuevoValor < 0) {
            console.error("Has introducido un número negativo o no has introducido un número");
        } else {
            this.valor = nuevoValor;
        }
    };

    this.obtenerPeriodoAgrupacion  = function(periodo)
    {
        let anyo = this.fecha.getFullYear();
        let mes = String(this.fecha.getMonth() + 1).padStart(2, '0');
        let dia = String(this.fecha.getDate()).padStart(2, '0');

        if(periodo === "anyo")
        {
            return `${anyo}`; 
        }
        else if(periodo === "mes")
        {
            return `${anyo}-${mes}`;
        }
        else if(periodo === "dia")
        {
            return `${anyo}-${mes}-${dia}`;
        }
    }
}

function listarGastos()
{
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    for (var i = 0; i < gastos.length; i++) {
        if (gastos[i].id === id) {
            gastos.splice(i, 1);
            break;
        }
    }
}

function calcularTotalGastos() {
    let total = 0;
    for (let i = 0; i < gastos.length; i++) {
        total += gastos[i].valor;
    }
    return Number(total.toFixed(2));
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro) {
    if (!filtro) {
        filtro = {};
    }

    return gastos.filter(function(gasto) {
        
        if (filtro.fechaDesde !== undefined) {
            let fechaDesdeTimestamp = Date.parse(filtro.fechaDesde);
            let gastoTimestamp = new Date(gasto.fecha).getTime();

            if (!isNaN(fechaDesdeTimestamp) && gastoTimestamp < fechaDesdeTimestamp) {
                return false;
            }
        }

        if (filtro.fechaHasta !== undefined) {
            let fechaHastaTimestamp = Date.parse(filtro.fechaHasta);
            let gastoTimestamp = new Date(gasto.fecha).getTime();

            if (!isNaN(fechaHastaTimestamp) && gastoTimestamp > fechaHastaTimestamp) {
                return false;
            }
        }

        if (filtro.valorMinimo !== undefined) {
            if (gasto.valor < filtro.valorMinimo) {
                return false;
            }
        }

        if (filtro.valorMaximo !== undefined) {
            if (gasto.valor > filtro.valorMaximo) {
                return false;
            }
        }

        if (filtro.descripcionContiene !== undefined) {
            let descGasto = gasto.descripcion.toLowerCase();
            let descFiltro = filtro.descripcionContiene.toLowerCase();
            
            if (!descGasto.includes(descFiltro)) {
                return false;
            }
        }

        if (filtro.etiquetasTiene !== undefined) {
            let tieneAlgunaEtiqueta = false;
            
            for (let i = 0; i < filtro.etiquetasTiene.length; i++) {
                let etiquetaFiltro = filtro.etiquetasTiene[i].toLowerCase();
                
                for (let j = 0; j < gasto.etiquetas.length; j++) {
                    if (gasto.etiquetas[j].toLowerCase() === etiquetaFiltro) {
                        tieneAlgunaEtiqueta = true;
                        break;
                    }
                }
            }

            if (!tieneAlgunaEtiqueta) {
                return false;
            }
        }

        return true;
    });
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    if (fechaHasta === undefined) {
        let hoy = new Date();
        let anio = hoy.getFullYear();
        let mes = String(hoy.getMonth() + 1).padStart(2, '0');
        let dia = String(hoy.getDate()).padStart(2, '0');
        fechaHasta = `${anio}-${mes}-${dia}`;
    }

    let filtro = {};
    
    if (fechaDesde !== undefined) {
        filtro.fechaDesde = fechaDesde;
    }
    
    if (fechaHasta !== undefined) {
        filtro.fechaHasta = fechaHasta;
    }
    
    if (etiquetas !== undefined && Array.isArray(etiquetas) && etiquetas.length > 0) {
        filtro.etiquetasTiene = etiquetas;
    }

    let gastosFiltrados = filtrarGastos(filtro);

    return gastosFiltrados.reduce(function(acc, gasto) {
        let periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[periodoAgrupacion] === undefined) {
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
