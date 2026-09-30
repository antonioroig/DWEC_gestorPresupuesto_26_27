let presupuesto = 0;

function actualizarPresupuesto(nuevoPresupuesto)
{
    if(nuevoPresupuesto >= 0 && typeof nuevoPresupuesto === "number") 
    {
        presupuesto = nuevoPresupuesto;
        return presupuesto;
    }
    else{
        console.error("Error: El presupuesto debe ser un número positivo.");
        return -1;
    }
}

function mostrarPresupuesto() {
    return `Tu presupuesto actual es de ${presupuesto} €`;
}

function CrearGasto() {
    
}