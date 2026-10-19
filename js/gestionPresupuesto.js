// TODO: Crear las funciones, objetos y variables indicadas en el enunciado


// TODO: Variable global

let presupuesto = 0;
let gastos = [];
let idGasto = 0;
function actualizarPresupuesto(valor) {
    if (typeof valor === 'number' && valor >= 0) {
        presupuesto = valor;
        return presupuesto;
    } else {
        console.error("El valor del presupuesto debe ser un número no negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
  return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
  this.descripcion = descripcion;
  this.valor = (typeof valor === 'number' && valor >= 0) ? valor : 0;

  if (fecha && !isNaN(Date.parse(fecha))) {
    this.fecha = Date.parse(fecha);
  } else {
    this.fecha = Date.now();
  }

  this.etiquetas = [];
  this.obtenerPeriodoAgrupacion = function(periodo) {
  let fecha = new Date(this.fecha).toISOString();

  if (periodo === "dia") {
    return fecha.slice(0, 10);
  }

  if (periodo === "anyo") {
    return fecha.slice(0, 4);
  }

  return fecha.slice(0, 7);
  };
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

  this.actualizarFecha = function(nuevaFecha) {
    if (nuevaFecha && !isNaN(Date.parse(nuevaFecha))) {
      this.fecha = Date.parse(nuevaFecha);
    }
  };

  this.anyadirEtiquetas = function(...nuevasEtiquetas) {
    for (const tag of nuevasEtiquetas) {
      if (typeof tag === 'string' && !this.etiquetas.includes(tag)) {
        this.etiquetas.push(tag);
      }
    }
  };

  this.borrarEtiquetas = function(...etiquetasABorrar) {
    this.etiquetas = this.etiquetas.filter(
      (tag) => !etiquetasABorrar.includes(tag)
    );
  };

this.mostrarGastoCompleto = function() {
    let salida = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
    salida += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
    salida += `Etiquetas:\n`;
    for (const tag of this.etiquetas) {
      salida += `- ${tag}\n`;
    }
    return salida;
  };
  
  if (etiquetas.length > 0) {
    this.anyadirEtiquetas(...etiquetas);
  }
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
  const index = gastos.findIndex((g) => g.id === id);
  if (index !== -1) {
    gastos.splice(index, 1);
  }
}
function calcularTotalGastos() {
  return gastos.reduce((total, gasto) => total + gasto.valor, 0);
}

function calcularBalance() {
  return presupuesto - calcularTotalGastos();
}
function filtrarGastos(filtros) {
  return gastos.filter(function(gasto) {
    // Fechas
    if (filtros.fechaDesde !== undefined &&
        gasto.fecha < Date.parse(filtros.fechaDesde)) {
      return false;
    }

    if (filtros.fechaHasta !== undefined &&
        gasto.fecha > Date.parse(filtros.fechaHasta)) {
      return false;
    }

    // Valores
    if (filtros.valorMinimo !== undefined &&
        gasto.valor < filtros.valorMinimo) {
      return false;
    }

    if (filtros.valorMaximo !== undefined &&
        gasto.valor > filtros.valorMaximo) {
      return false;
    }

    // Descripción
    if (filtros.descripcionContiene !== undefined) {
      let descripcion = gasto.descripcion.toLowerCase();
      let texto = filtros.descripcionContiene.toLowerCase();

      if (!descripcion.includes(texto)) {
        return false;
      }
    }

    // Etiquetas
    if (filtros.etiquetasTiene &&
        filtros.etiquetasTiene.length > 0) {
      let coincide = false;

      gasto.etiquetas.forEach(function(etiqueta) {
        filtros.etiquetasTiene.forEach(function(filtro) {
          if (etiqueta.toLowerCase() === filtro.toLowerCase()) {
            coincide = true;
          }
        });
      });

      if (!coincide) {
        return false;
      }
    }

    return true;
  });
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export {
  presupuesto,
  gastos,
  idGasto,
  actualizarPresupuesto,
  mostrarPresupuesto,
  CrearGasto,
  listarGastos,
  anyadirGasto,
  borrarGasto,
  calcularTotalGastos,
  calcularBalance,
  filtrarGastos,
};
