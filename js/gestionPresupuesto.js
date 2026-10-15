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
};
