class Billete {
    constructor(valor, cantidad, url) {
        this.valor = valor;
        this.cantidad = cantidad;
        this.url = url;
    }
}

function recibirDinero() {
    if (dineroTxt.valueAsNumber) {
        dinero = dineroTxt.valueAsNumber;
        mostrarMsj("", false);
    } else {
        mostrarMsj(true, "Valor invalido");
    }
}

function entregarDinero() {
    var div = 0;
    for (const billete of caja) {
        if (dinero > 0) {
            div = Math.floor(dinero / billete.valor);
            if (div > billete.cantidad) div = billete.cantidad;
            entregado.push(new Billete(billete.valor, div, billete.url));
            dinero = dinero - div * billete.valor;
        }
    }
    if (dinero > 0) mostrarMsj(true, "Dinero insuficiente.");
    else actulizarCaja();
    entregado = [];
}

function mostrarMsj(estadoMsj, msj) {
    msjAlerta.textContent = msj;
    style = "";
    dineroEntregado.innerHTML = "";
    if (estadoMsj) style = "display: block";
    else style = "display: none";
    msjAlerta.setAttribute("style", style);
}

function actulizarCaja() {
    dineroEntregado.innerHTML = "";
    for (var i = 0; i < entregado.length; i++) {
        for (var j = 0; j < entregado[i].cantidad; j++) {
            var ima = new Image();
            ima.src = entregado[i].url;
            dineroEntregado.appendChild(ima);
        }
        caja[i].cantidad -= entregado[i].cantidad;
        dineroEntregado.innerHTML += "<br>";
    }
    var estaVacio = true;
    for (const billete of caja) {
        estaVacio *= billete.cantidad == 0;
    }
    if (estaVacio) mostrarMsj(true, "Se acabó el dinero.");
}

var caja = [];
var imagenes = [];
imagenes.push("./static/images/billete100.png");
imagenes.push("./static/images/billete50.png");
imagenes.push("./static/images/billete20.png");
imagenes.push("./static/images/billete10.png");
caja.push(new Billete(100, 3, imagenes[0]));
caja.push(new Billete(50, 3, imagenes[1]));
caja.push(new Billete(20, 2, imagenes[2]));
caja.push(new Billete(10, 2, imagenes[3]));
var entregado = [];
var dinero = 0;
var dineroTxt = document.getElementById("dinero");
var boton = document.getElementById("extraer");
var dineroEntregado = document.getElementById("dineroEntregado");
dineroTxt.addEventListener("input", recibirDinero);
boton.addEventListener("click", entregarDinero);