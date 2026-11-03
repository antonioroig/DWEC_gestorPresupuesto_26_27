// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict';
let presupuesto = 0;
let gastos = [];
let idGasto = 0;
// TODO: Variable global


function actualizarPresupuesto(nuevoPresupuesto) {

    if (!isNaN(nuevoPresupuesto) && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } 
    else 
        {
        console.log("Error: el valor introducido no es válido.");
        return -1;
    }
    // TODO, hecho.
}

function mostrarPresupuesto() {

    return `Tu presupuesto actual es de ${presupuesto} €`;
    // TODO, hecho.
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (!isNaN(valor) && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    this.etiquetas = [];

    if (fecha !== undefined && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    // Metodos practica 1
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (!isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    // Metodos practica 2
    this.actualizarFecha = function (nuevaFecha) {
        let timestamp = Date.parse(nuevaFecha);
        if (!isNaN(timestamp)) {
            this.fecha = timestamp;
        }
    };

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(function (etiqueta) {
            return !etiquetasABorrar.includes(etiqueta);
        });
    };

    this.mostrarGastoCompleto = function () {
        let fechaObj = new Date(this.fecha);
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\nFecha: ${fechaObj.toLocaleString()}\nEtiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }

        return texto;
    };

        //Metodo 3ra practica
    this.obtenerPeriodoAgrupacion = function (periodo) {
        let d = new Date(this.fecha);
        let anio = d.getFullYear();
        let mes = String(d.getMonth() + 1).padStart(2, '0');
        let dia = String(d.getDate()).padStart(2, '0');

        if (periodo === 'dia') {
            return `${anio}-${mes}-${dia}`;
        } else if (periodo === 'mes') {
            return `${anio}-${mes}`;
        } else if (periodo === 'anyo') {
            return `${anio}`;
        }
        return '';
    };

    // Añadir etiquetas iniciales si existen
    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }
}
//TODO, hecho.

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    gastos = gastos.filter(function (gasto) {
        return gasto.id !== id;
    });
}

function calcularTotalGastos() {
    return gastos.reduce(function (total, gasto) {
        return total + gasto.valor;
    }, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(criterios = {}) {
    return gastos.filter(function (gasto) {

            //Filtro fechadesde
        if (criterios.fechaDesde !== undefined) {
            let tiempoDesde = Date.parse(criterios.fechaDesde);
            if (!isNaN(tiempoDesde) && gasto.fecha < tiempoDesde) {
                return false;
            }
        }

        // Filtro fechaHasta
        if (criterios.fechaHasta !== undefined) {
            let tiempoHasta = Date.parse(criterios.fechaHasta);
            if (!isNaN(tiempoHasta) && gasto.fecha > tiempoHasta) {
                return false;
            }
        }

        // Filtro valorMinimo
        if (criterios.valorMinimo !== undefined) {
            if (gasto.valor < criterios.valorMinimo) {
                return false;
            }
        }

        // Filtro valorMaximo
        if (criterios.valorMaximo !== undefined) {
            if (gasto.valor > criterios.valorMaximo) {
                return false;
            }
        }

        // Filtro descripcionContiene
        if (criterios.descripcionContiene !== undefined) {
            let descGasto = gasto.descripcion.toLowerCase();
            let subcadena = criterios.descripcionContiene.toLowerCase();
            if (!descGasto.includes(subcadena)) {
                return false;
            }
        }

        // Filtro etiquetasTiene
        if (criterios.etiquetasTiene !== undefined && Array.isArray(criterios.etiquetasTiene) && criterios.etiquetasTiene.length > 0) {
            let etiquetasFiltro = criterios.etiquetasTiene.map(e => e.toLowerCase());
            let etiquetasGasto = gasto.etiquetas.map(e => e.toLowerCase());

            let tieneAlguna = etiquetasFiltro.some(e => etiquetasGasto.includes(e));
            if (!tieneAlguna) {
                return false;
            }
        }

        return true;
    });
}

function agruparGastos(periodo = 'mes', etiquetas, fechaDesde, fechaHasta) {
    let criterios = {};

    if (etiquetas !== undefined && Array.isArray(etiquetas) && etiquetas.length > 0) {
        criterios.etiquetasTiene = etiquetas;
    }

    if (fechaDesde !== undefined) {
        criterios.fechaDesde = fechaDesde;
    }

    if (fechaHasta !== undefined) {
        criterios.fechaHasta = fechaHasta;
    } else {
        criterios.fechaHasta = new Date().toISOString();
    }

    let gastosFiltrados = filtrarGastos(criterios);

    return gastosFiltrados.reduce(function (acc, gasto) {
        let clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);

        if (!acc[clavePeriodo]) {
            acc[clavePeriodo] = 0;
        }
        acc[clavePeriodo] += gasto.valor;

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
