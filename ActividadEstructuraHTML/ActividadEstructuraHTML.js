let tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    document.body.append(tarjeta)

let tarjetaTitulo = document.createElement("div");
    tarjetaTitulo.className = "tarjeta-titulo";
    tarjeta.append(tarjetaTitulo)

let titulo = document.createElement("h2");
    titulo.textContent = "Datos de contacto";
    tarjetaTitulo.append(titulo);

let tarjetaCuerpo = document.createElement("div");
    tarjetaCuerpo.className = "tarjeta-cuerpo";
    tarjeta.append(tarjetaCuerpo)

let p1 = document.createElement("p");
    p1.className = "tarjeta-nombre";
    tarjetaCuerpo.append(p1);

let span = document.createElement("span");
    span.className = "negrita";
    p1.append(span);
    span.textContent = "Nombre:";

    p1.append(" Laura Pérez");

let p2 = document.createElement("p")
    p2.className = "tarjeta-email";
    tarjetaCuerpo.append(p2);

let span2 = document.createElement("span")
    p2.append(span2)
    span2.textContent = "Email: "

    p2.append("laura@noexiste.com")


let p3 = document.createElement("p")
    p3.className = "tarjeta-telefono";
    tarjetaCuerpo.append(p3);

let span3 = document.createElement("span")
    p3.append(span3)
    span3.textContent = "Teléfono: "

    p3.append("612123123")



