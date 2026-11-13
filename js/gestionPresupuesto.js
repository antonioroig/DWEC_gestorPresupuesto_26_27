// Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.log("Error: el valor introducido no es un número válido");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

// Constructor corregido para almacenar la fecha como timestamp (número)
function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;
    this.valor = (typeof valor === "number" && valor >= 0) ? valor : 0;
    
    // Parsear la fecha a timestamp o usar la fecha actual si no es válida/no se proporciona
    let parsedFecha = fecha ? Date.parse(fecha) : NaN;
    this.fecha = !isNaN(parsedFecha) ? parsedFecha : Date.now();

    this.etiquetas = [];

    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    if (etiquetas.length > 0) {
        this.anyadirEtiquetas(...etiquetas);
    }

    this.mostrarGasto = function () {
        return "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €";
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === "number" && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.mostrarGastoCompleto = function () {
        let fechaFormateada = typeof this.fecha === 'number' ? new Date(this.fecha).toLocaleString() : this.fecha;
        let texto = "Gasto correspondiente a " + this.descripcion + " con valor " + this.valor + " €.";
        texto += "\n" + "Fecha: " + fechaFormateada;
        texto += "\n" + "Etiquetas:";
        for (let etiqueta of this.etiquetas) {
            texto += "\n" + "- " + etiqueta;
        }
        texto += "\n";
        return texto;
    };

    this.actualizarFecha = function (nuevaFecha) {
        let parsed = Date.parse(nuevaFecha);
        if (!isNaN(parsed)) {
            this.fecha = parsed;
        }
    };

    this.borrarEtiquetas = function (...etiquetasBorrar) {
        this.etiquetas = this.etiquetas.filter(etiqueta => !etiquetasBorrar.includes(etiqueta));
    };

    this.obtenerPeriodoAgrupacion = function (periodo) {
        let fechaStr = typeof this.fecha === 'number' ? new Date(this.fecha).toISOString().split('T')[0] : this.fecha;
        if (!fechaStr) return "";
        
        if (periodo === "dia") {
            return fechaStr;
        }
        else if (periodo === "mes") {
            return fechaStr.substring(0, 7);
        }
        else if (periodo === "anyo") {
            return fechaStr.substring(0, 4);
        }
    };
}

// Función auxiliar en minúscula que llama al constructor
function crearGasto(descripcion, valor, fecha, ...etiquetas) {
    return new CrearGasto(descripcion, valor, fecha, ...etiquetas);
}

function listarGastos() {
    return gastos;
}

function anyadirGasto(gasto) {
    gasto.id = idGasto;
    idGasto++;
    gastos.push(gasto);
}

function borrarGasto(id) {
    let indice = gastos.findIndex(gasto => gasto.id === id);
    if (indice !== -1) {
        gastos.splice(indice, 1);
    }
}

function calcularTotalGastos() {
    return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(filtro = {}) {
    return gastos.filter(function (gasto) {
        let fDesde = filtro.fechaDesde || filtro.fechaInicio;
        let fHasta = filtro.fechaHasta || filtro.fechaFin;
        let vMin = filtro.valorMinimo;
        let vMax = filtro.valorMaximo;
        let desc = filtro.descripcionContiene;
        let etqs = filtro.etiquetas || filtro.etiquetasTiene;
        let etqUnica = filtro.etiqueta;

        // Convertir la fecha del gasto a formato YYYY-MM-DD para comparar de forma segura con los filtros
        let gastoFechaStr = typeof gasto.fecha === 'number' ? new Date(gasto.fecha).toISOString().split('T')[0] : gasto.fecha;

        if (fDesde !== undefined && gastoFechaStr < fDesde) {
            return false;
        }
        if (fHasta !== undefined && gastoFechaStr > fHasta) {
            return false;
        }
        if (vMin !== undefined && gasto.valor < vMin) {
            return false;
        }
        if (vMax !== undefined && gasto.valor > vMax) {
            return false;
        }
        if (desc !== undefined && !gasto.descripcion.toLowerCase().includes(desc.toLowerCase())) {
            return false;
        }
        if (etqUnica !== undefined) {
            if (!gasto.etiquetas || !gasto.etiquetas.includes(etqUnica)) {
                return false;
            }
        }
        if (etqs !== undefined) {
            let tieneAlguna = etqs.some(function (etiquetaBuscada) {
                return gasto.etiquetas.some(function (etiquetaGasto) {
                    return etiquetaGasto.toLowerCase() === etiquetaBuscada.toLowerCase();
                });
            });
            if (!tieneAlguna) {
                return false;
            }
        }
        return true;
    });
}

function agruparGastos(periodo = "mes", etiquetas, fechaDesde, fechaHasta) {
    let filtro = {};
    if (fechaDesde !== undefined) {
        filtro.fechaDesde = fechaDesde;
    }
    if (fechaHasta !== undefined) {
        filtro.fechaHasta = fechaHasta;
    }
    if (etiquetas !== undefined && etiquetas.length > 0) {
        filtro.etiquetasTiene = etiquetas;
    }

    let gastosFiltrados = filtrarGastos(filtro);

    return gastosFiltrados.reduce(function (acc, gasto) {
        let clave = gasto.obtenerPeriodoAgrupacion(periodo);
        if (acc[clave] === undefined) {
            acc[clave] = 0;
        }
        acc[clave] += gasto.valor;
        return acc;
    }, {});
}

export {
    actualizarPresupuesto,
    mostrarPresupuesto,
    CrearGasto,
    crearGasto,
    agruparGastos,
    filtrarGastos,
    calcularBalance,
    calcularTotalGastos,
    borrarGasto,
    anyadirGasto,
    listarGastos
};