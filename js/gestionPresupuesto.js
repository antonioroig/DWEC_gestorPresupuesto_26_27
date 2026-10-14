// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
let presupuesto = 0
let gastos = []
let idGasto = 0
// TODO: Variable global

function actualizarPresupuesto(nuevoPresupuesto) {
    // TODO Función de 1 parámetro que se encargará de actualizar la variable global presupuesto. Esta función comprobará que el valor introducido es un número no negativo: en caso de que sea un dato válido, actualizará la variable presupuesto y devolverá el valor del mismo; en caso contrario, mostrará un error por pantalla y devolverá el valor -1.

    if (typeof nuevoPresupuesto === "number" && nuevoPresupuesto >= 0) {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    } else {
        console.error("El valor introducido es un número negativo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    // TODO Función sin parámetros que se encargará de devolver el texto siguiente: Tu presupuesto actual es de X €.
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto(descripcion, valor, fecha = new Date().toISOString(), ...etiquetas) {
    this.descripcion = descripcion;
 
    this.valor = 0;
    if (typeof valor === "number" && !isNaN(valor) && valor >= 0) {
        this.valor = valor;
    }
 
    this.fecha = Date.now();
    if (typeof fecha === "string") {
        let timestamp = Date.parse(fecha);
        if (!isNaN(timestamp)) {
            this.fecha = timestamp;
        }
    }
 
    this.etiquetas = [];
 //mostrarGasto - Función sin parámetros que devolverá el texto: Gasto correspondiente a DESCRIPCION con valor VALOR €, siendo VALOR y DESCRIPCION las propiedades del objeto correspondientes.
    this.mostrarGasto = function () {
        return `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`;
    };
 //mostrarGastoCompleto - Función sin parámetros que devuelva el texto multilínea siguiente (ejemplo para un gasto con tres etiquetas)
    this.mostrarGastoCompleto = function () {
        let texto = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.\n`;
        texto += `Fecha: ${new Date(this.fecha).toLocaleString()}\n`;
        texto += "Etiquetas:\n";
        for (let etiqueta of this.etiquetas) {
            texto += `- ${etiqueta}\n`;
        }
        return texto;
    };
 //actualizarDescripcion - Función de 1 parámetro que actualizará la descripción del objeto.
    this.actualizarDescripcion = function (nuevaDescripcion) {
        this.descripcion = nuevaDescripcion;
    };
 //actualizarValor - Función de 1 parámetro que actualizará el valor del objeto. Se encargará de comprobar que el valor introducido sea un número no negativo; en caso contrario, dejará el valor como estaba.
    this.actualizarValor = function (nuevoValor) {
        if (typeof nuevoValor === "number" && !isNaN(nuevoValor) && nuevoValor >= 0) {
            this.valor = nuevoValor;
        }
    };
 //actualizarFecha - Función de 1 parámetro que actualizará la propiedad fecha del objeto. Deberá recibir la fecha en formato string que sea entendible por la función Date.parse. Si la fecha no es válida, se dejará sin modificar.//
    this.actualizarFecha = function (nuevaFecha) {
        if (typeof nuevaFecha === "string") {
            let ts = Date.parse(nuevaFecha);
            if (!isNaN(ts)) {
                this.fecha = ts;
            }
        }
    };
 //anyadirEtiquetas - Función de un número indeterminado de parámetros que añadirá las etiquetas pasadas como parámetro a la propiedad etiquetas del objeto. Deberá comprobar que no se creen duplicados.
    this.anyadirEtiquetas = function (...nuevasEtiquetas) {
        for (let etiqueta of nuevasEtiquetas) {
            if (!this.etiquetas.includes(etiqueta)) {
                this.etiquetas.push(etiqueta);
            }
        }
    };
 //borrarEtiquetas - Función de un número indeterminado de parámetros que recibirá uno o varios nombres de etiquetas y procederá a eliminarlas (si existen) de la propiedad etiquetas del objeto.
    this.borrarEtiquetas = function (...etiquetasABorrar) {
        this.etiquetas = this.etiquetas.filter(e => !etiquetasABorrar.includes(e));
    };
 // Añade las etiquetas recibidas en el constructor
    this.anyadirEtiquetas(...etiquetas);

    this.obtenerPeriodoAgrupacion = function (periodo) {
        if (periodo === "dia") {
            return new Date(this.fecha).toISOString().slice(0, 10);
        } else if (periodo === "mes") {
            return new Date(this.fecha).toISOString().slice(0, 7);
        } else if (periodo === "anyo") {
            return new Date(this.fecha).toISOString().slice(0, 4);
        }
    };
}
//Función listarGastos: Función sin parámetros que devolverá la variable global gastos.
    function listarGastos() {
        return gastos;
    }
/*Función anyadirGasto

Función de 1 parámetro que realizará tres tareas:

Añadir al objeto gasto pasado como parámetro una propiedad id cuyo valor será el valor actual de la variable global idGasto.
Incrementar el valor de la variable global idGasto.
Añadir el objeto gasto pasado como parámetro a la variable global gastos. El gasto se debe añadir al final del array.*/

    function anyadirGasto(gasto){
        gasto.id = idGasto;
        idGasto++;
        gastos.push(gasto);
    }
/*Función borrarGasto

Función de 1 parámetro que eliminará de la variable global gastos el objeto gasto cuyo id haya sido pasado como parámetro. Si no existe un gasto con el id proporcionado, no hará nada.*/
    function borrarGasto(id) {
        gastos = gastos.filter(gasto => gasto.id !== id);
    }
/*Función calcularTotalGastos

Función sin parámetros que devuelva la suma de todos los gastos creados en la variable global gastos. De momento no los agruparemos por período temporal (lo haremos en sucesivas prácticas).*/
    function calcularTotalGastos() {
        return gastos.reduce((total, gasto) => total + gasto.valor, 0);
    }
/*Función calcularBalance

Función sin parámetros que devuelva el balance (presupuesto - gastos totales) disponible. De momento no lo obtendremos por período temporal (lo haremos en sucesivas prácticas). Puede utilizar a su vez la función calcularTotalGastos.*/
    function calcularBalance() {
        return presupuesto - calcularTotalGastos();
    }
    function filtrarGastos(filtros) {
        return gastos.filter(gasto => {
            if (filtros.fechaDesde) {
                const fechaDesde = new Date(filtros.fechaDesde);
                if (new Date(gasto.fecha) < fechaDesde) {
                    return false;
                }
            }
            if (filtros.fechaHasta) {
                const fechaHasta = new Date(filtros.fechaHasta);
                if (new Date(gasto.fecha) > fechaHasta) {
                    return false;
                }
            }
            if (filtros.valorMinimo){
                const valorMinimo = filtros.valorMinimo;
                if (gasto.valor < valorMinimo) {
                    return false;
                }
            }
            if (filtros.valorMaximo){
                const valorMaximo = filtros.valorMaximo;
                if (gasto.valor > valorMaximo) {
                    return false;
                }
            }
            if (filtros.descripcionContiene){
                if (!gasto.descripcion.toLowerCase().includes(filtros.descripcionContiene.toLowerCase())) {
                    return false;
                }
            }
            if (filtros.etiquetasTiene){
                const etiquetasFiltro = filtros.etiquetasTiene.map(e => e.toLowerCase());
                const etiquetasGasto = gasto.etiquetas.map(e => e.toLowerCase());
                if (!etiquetasGasto.some(e => etiquetasFiltro.includes(e))) {
                    return false;
                }
            }
            return true;
        });
    }
    function agruparGastos(periodo, etiquetas = [], fechaDesde, fechaHasta) {
        if (periodo !== "dia" && periodo !== "mes" && periodo !== "anyo") {
            periodo = "mes";
        }
        const gastosFiltrados = filtrarGastos({ fechaDesde, fechaHasta, etiquetasTiene: etiquetas });
        return gastosFiltrados.reduce((acc, gasto) => {
            const periodoAgrupacion = gasto.obtenerPeriodoAgrupacion(periodo);
            acc[periodoAgrupacion] = (acc[periodoAgrupacion] || 0) + gasto.valor;
            return acc;
        }, {});
    }



// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo.
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
