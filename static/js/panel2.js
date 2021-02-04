// Paletas de colores
var color1 = document.getElementById("color1");
var color2 = document.getElementById("color2");
var color3 = document.getElementById("color3");
var color4 = document.getElementById("color4");
var color5 = document.getElementById("color5");
var color6 = document.getElementById("color6");
var color7 = document.getElementById("color7");
// Mensaje de alerta.
var msjAlerta = document.getElementById("msjAlerta");
// Canvas Dibujo.
var dibCanvas = document.getElementById("dibujo");
var lienzo = dibCanvas.getContext("2d");
//Parametos Default
var colorLine = "";
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
var puntoInicial = {
    X: dibCanvas.width / 2,
    Y: dibCanvas.height / 2
};
//Algo no cuadra.
//console.log(dibCanvas);
console.log(puntoInicial);
var paso = 15;
// Eventos.
document.addEventListener("keyup", dibujarFigura);
color1.addEventListener("mouseover", onColor1);
color2.addEventListener("mouseover", onColor2);
color3.addEventListener("mouseover", onColor3);
color4.addEventListener("mouseover", onColor4);
color5.addEventListener("mouseover", onColor5);
color6.addEventListener("mouseover", onColor6);
color7.addEventListener("mouseover", onColor7);

function drawLine(mapaDibujo, initPoint, endPoint, color) {
    mapaDibujo.beginPath();
    mapaDibujo.strokeStyle = color;
    mapaDibujo.moveTo(initPoint.X, initPoint.Y);
    mapaDibujo.lineTo(endPoint.X, endPoint.Y);
    mapaDibujo.stroke();
    mapaDibujo.closePath();
}

function verficaValor(ptoAct, max) {
    if (ptoAct >= 0 && ptoAct <= max) return true;
    return false;
}

function dibujarFigura(evento) {
    var xFinal = puntoInicial.X,
        yFinal = puntoInicial.Y;
    if (evento.keyCode == teclas.UP) {
        yFinal = puntoInicial.Y - paso;
    } else if (evento.keyCode == teclas.DOWN) {
        yFinal = puntoInicial.Y + paso;
    } else if (evento.keyCode == teclas.LEFT) {
        xFinal = puntoInicial.X - paso;
    } else if (evento.keyCode == teclas.RIGHT) {
        xFinal = puntoInicial.X + paso;
    }
    var condicion = verficaValor(xFinal, dibCanvas.width) &&
        verficaValor(yFinal, dibCanvas.height) && colorLine != "";

    if (colorLine == "") {
        mostrarMsj(true, "Seleccione un color.");
    } else if (condicion) {
        drawLine(lienzo, puntoInicial, { X: xFinal, Y: yFinal }, colorLine);
        puntoInicial.X = xFinal;
        puntoInicial.Y = yFinal;
        mostrarMsj(false, "");
    } else {
        mostrarMsj(true, "Se sale del mapa.");
    }
}

function onColor1() {
    colorLine = "#FFFFFF";
    changeColor7();
}

function onColor2() {
    colorLine = "#FDFB63";
    changeColor7();
}

function onColor3() {
    colorLine = "#55C1FF";
    changeColor7();
}

function onColor4() {
    colorLine = "#C7FAB0";
    changeColor7();
}

function onColor5() {
    colorLine = "#DD6CFF";
    changeColor7();
}

function onColor6() {
    colorLine = "#FF5F5F";
    changeColor7();
}

function onColor7() {
    colorLine = "";
    color7.setAttribute("style", "background-color: #ffffff00");
}

function changeColor7() {
    color7.setAttribute("style", "background-color: " + colorLine);
}

function mostrarMsj(estadoMsj, msj) {
    msjAlerta.textContent = msj;
    style = "";
    if (estadoMsj) style = "display: block";
    else style = "display: none";
    msjAlerta.setAttribute("style", style);
}