// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
'use strict';
// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO
    if (typeof nuevoPresupuesto === 'number' && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.log("Error: El presupuesto debe ser un número positivo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (typeof valor === 'number' && valor >= 0) {
        this.valor = valor;
    } else {
        this.valor = 0;
    }

    if (typeof fecha === 'string' && !isNaN(Date.parse(fecha))) {
        this.fecha = Date.parse(fecha);
    } else {
        this.fecha = Date.now();
    }

    this.etiquetas = [];

    this.mostrarGasto = function() {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function(nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function(nuevoValor) {
        if (typeof nuevoValor === 'number' && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };

    this.mostrarGastoCompleto = function() {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;
        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }
        return texto;
    };


    this.actualizarFecha = function(nuevaFecha) {
        let timestamp = Date.parse(nuevaFecha);
        if (!isNaN(timestamp)) {
            this.fecha = timestamp;
        }
    };

    this.anyadirEtiquetas = function(...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };

    this.borrarEtiquetas = function(...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(
            etiqueta => !etiquetasABorrar.includes(etiqueta)
        );
    };

    this.anyadirEtiquetas(...etiquetas);

    this.obtenerPeriodoAgrupacion = function(periodo) {
        let d = new Date(this.fecha);
        let anyo = d.getFullYear();
        let mes = String(d.getMonth() + 1).padStart(2, '0');
        let dia = String(d.getDate()).padStart(2, '0');

        if (periodo === "mes") {
            return `${anyo}-${mes}`;
        } else if (periodo === "anyo") {
            return `${anyo}`;
        } else if (periodo === "dia") {
            return `${anyo}-${mes}-${dia}`;
        }
    };
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
    return gastos.reduce((acumulador, gasto) => acumulador + gasto.valor, 0);
}


function calcularBalance() {
    return presupuesto - calcularTotalGastos();
}

function filtrarGastos(opciones = {}) {
     return gastos.filter(gasto => {
        // 1. Filtrado por fechaDesde
        if (opciones.fechaDesde) {
            let fechaDesdeTs = Date.parse(opciones.fechaDesde);
            if (!isNaN(fechaDesdeTs) && gasto.fecha < fechaDesdeTs) {
                return false;
            }
        }

        // 2. Filtrado por fechaHasta
        if (opciones.fechaHasta) {
            let fechaHastaTs = Date.parse(opciones.fechaHasta);
            if (!isNaN(fechaHastaTs) && gasto.fecha > fechaHastaTs) {
                return false;
            }
        }

        // 3. Filtrado por valorMinimo
        if (typeof opciones.valorMinimo === 'number' && gasto.valor < opciones.valorMinimo) {
            return false;
        }

        // 4. Filtrado por valorMaximo
        if (typeof opciones.valorMaximo === 'number' && gasto.valor > opciones.valorMaximo) {
            return false;
        }

        // 5. Filtrado por descripcionContiene
        if (opciones.descripcionContiene) {
            let descripcionGasto = gasto.descripcion.toLowerCase();
            let textoBuscar = opciones.descripcionContiene.toLowerCase();
            if (!descripcionGasto.includes(textoBuscar)) {
                return false;
            }
        }

        // 6. Filtrado por etiquetasTiene 
        if (Array.isArray(opciones.etiquetasTiene) && opciones.etiquetasTiene.length > 0) {
            let etiquetasBuscadas = opciones.etiquetasTiene.map(e => String(e).toLowerCase());
            let etiquetasGasto = gasto.etiquetas.map(e => String(e).toLowerCase());

            let tieneAlguna = etiquetasBuscadas.some(e => etiquetasGasto.includes(e));
            if (!tieneAlguna) {
                return false;
            }
        }

        return true;
    });
}

function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) { 
    let opcionesFiltro = {
        etiquetasTiene: etiquetas,
        fechaDesde: fechaDesde,
        fechaHasta: fechaHasta || new Date().toISOString()
    };

    let gastosFiltrados = filtrarGastos(opcionesFiltro);

    return gastosFiltrados.reduce((acc, gasto) => {
        let clavePeriodo = gasto.obtenerPeriodoAgrupacion(periodo);

        if (acc[clavePeriodo]) {
            acc[clavePeriodo] += gasto.valor;
        } else {
            acc[clavePeriodo] = gasto.valor;
        }

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
