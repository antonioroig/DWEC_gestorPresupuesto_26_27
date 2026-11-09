'use strict';

let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function listarGastos() {
  return gastos;
}

function anyadirGasto(gasto) {
  gasto.id = idGasto;
  idGasto++;
  gastos.push(gasto);
}

function borrarGasto(id) {
  for (let i = 0; i < gastos.length; i++) {
    if (gastos[i].id === id) {
      gastos.splice(i, 1);
      break;
    }
  }
}


function agruparGastos(periodo = "mes", etiquetas = [], fechaDesde, fechaHasta) {

  if (fechaHasta === undefined) {
    fechaHasta = new Date().toISOString();
  }

  let filtros = {
    fechaHasta: fechaHasta
  };

  if (etiquetas.length > 0) {
    filtros.etiquetasTiene = etiquetas;
  }

  if (fechaDesde !== undefined) {
    filtros.fechaDesde = fechaDesde;
  }

  let gastosFiltrados = filtrarGastos(filtros);

  return gastosFiltrados.reduce(function(acc, gasto) {

    let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);

    if (acc[periodoGasto] === undefined) {

      acc[periodoGasto] = 0;
      
    }

    acc[periodoGasto] += gasto.valor;

    return acc;

  }, {});
}



function filtrarGastos(filtros) {
  return gastos.filter(function(gasto) {

    if (filtros.fechaDesde !== undefined &&
        gasto.fecha < Date.parse(filtros.fechaDesde)) {
      return false;
    }

    if (filtros.fechaHasta !== undefined &&
        gasto.fecha > Date.parse(filtros.fechaHasta)) {
      return false;
    }

    if (filtros.valorMinimo !== undefined &&
        gasto.valor < filtros.valorMinimo) {
      return false;
    }

    if (filtros.valorMaximo !== undefined &&
        gasto.valor > filtros.valorMaximo) {
      return false;
    }

    if (filtros.descripcionContiene !== undefined &&
        !gasto.descripcion.toLowerCase().includes(
          filtros.descripcionContiene.toLowerCase()
        )) {
      return false;
    }

    if (filtros.etiquetasTiene !== undefined &&
        filtros.etiquetasTiene.length > 0) {

      let tieneEtiqueta = false;

      for (let etiqueta of filtros.etiquetasTiene) {
        for (let etiquetaGasto of gasto.etiquetas) {
          if (etiqueta.toLowerCase() === etiquetaGasto.toLowerCase()) {
            tieneEtiqueta = true;
          }
        }
      }

      if (!tieneEtiqueta) {
        return false;
      }
    }

    return true;
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


function actualizarPresupuesto(valor) {
    if (typeof valor === "number" && valor >= 0) {
      presupuesto = valor;
      return presupuesto;
    } else {
      console.error("El presupuesto debe ser un número no negativo");
      return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    this.descripcion = descripcion;

    if (typeof fecha === "string" && !isNaN(Date.parse(fecha)))
    {
      this.fecha = Date.parse(fecha);
    } else {
      this.fecha = Date.now();
    }

    if (typeof valor === "number" && valor >= 0) {
      this.valor = valor;
    } else {
      this.valor = 0;
    }

    this.etiquetas = [];
    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
      for (let etiqueta of nuevasEtiquetas) {
        if (!this.etiquetas.includes(etiqueta))
        {
          this.etiquetas.push(etiqueta);
        }
      }
    }

    this.anyadirEtiquetas(...etiquetas);

    this.borrarEtiquetas = function (...etiquetasABorrar) {
      for (let etiqueta of etiquetasABorrar) {
        let posicion = this.etiquetas.indexOf(etiqueta);

        if (posicion !== -1) {
          this.etiquetas.splice(posicion, 1);
        }
      }
    };

    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += `Etiquetas:\n`;

        for (let etiqueta of this.etiquetas) {
          texto += `- ${etiqueta}\n`;
        }

        return texto;
    };

    this.actualizarFecha = function (nuevaFecha) {
      if (typeof nuevaFecha === "string" && !isNaN(Date.parse(nuevaFecha))) {
        this.fecha = Date.parse(nuevaFecha);
      }
    };
    
    this.mostrarGasto = function () {
      return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };

    this.actualizarDescripcion = function (nuevaDescripcion) {
      this.descripcion = nuevaDescripcion;
    };

    this.actualizarValor = function (nuevoValor) {
      if (typeof nuevoValor === "number" && nuevoValor >= 0) {
        this.valor = nuevoValor;
      }
    };

    this.obtenerPeriodoAgrupacion = function (periodo) {
      let fecha = new Date(this.fecha);

      let anyo = fecha.getFullYear().toString();
      let mes = (fecha.getMonth() + 1).toString();
      let dia = fecha.getDate().toString();

      if (mes.length === 1) {
        mes = "0" + mes;
      }
      if (dia.length === 1) {
        dia = "0" + dia;
      }

      if (periodo === "dia")
      {
        return anyo + "-" + mes + "-" + dia;
      } else if (periodo === "mes") {
        return anyo + "-" + mes;
      } else if (periodo === "anyo" || periodo === "año") {
        return anyo;
      } else {
        return `No se pudo obtener el periodo, el formato a introducir es dia, mes o anyo`;
      }
    };
  };


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
    agruparGastos,
    filtrarGastos
}
