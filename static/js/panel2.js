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
var grosorLinea = 2;
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
var puntoInicial = {
    X: null,
    Y: null
};
var puntoActual = {
    X: null,
    Y: null
};
var tamPaso = 1;
var dibujoMouse = false;
// Eventos.
document.addEventListener("keydown", dibujaTeclado);
color1.addEventListener("mouseover", onColor1);
color2.addEventListener("mouseover", onColor2);
color3.addEventListener("mouseover", onColor3);
color4.addEventListener("mouseover", onColor4);
color5.addEventListener("mouseover", onColor5);
color6.addEventListener("mouseover", onColor6);
color7.addEventListener("mouseover", onColor7);
// Prueba
dibCanvas.addEventListener("click", selPuntoIni);
dibCanvas.addEventListener("mousemove", puntoMouse);


function dibujarPunto(mapaDibujo, puntoDibujo, color) {
    drawLine(mapaDibujo, puntoDibujo, { X: puntoDibujo.X - 5, Y: puntoDibujo.Y }, color, 5);
    drawLine(mapaDibujo, puntoDibujo, { X: puntoDibujo.X + 5, Y: puntoDibujo.Y }, color, 5);
    drawLine(mapaDibujo, puntoDibujo, { X: puntoDibujo.X, Y: puntoDibujo.Y - 5 }, color, 5);
    drawLine(mapaDibujo, puntoDibujo, { X: puntoDibujo.X, Y: puntoDibujo.Y + 5 }, color, 5);
}

function drawLine(mapaDibujo, initPoint, endPoint, color, anchoLinea) {
    mapaDibujo.lineWidth = anchoLinea;
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

function dibujaTeclado(evento) {
    var xFinal = puntoInicial.X,
        yFinal = puntoInicial.Y;
    if (evento.keyCode == teclas.UP) {
        yFinal = puntoInicial.Y - tamPaso;
    } else if (evento.keyCode == teclas.DOWN) {
        yFinal = puntoInicial.Y + tamPaso;
    } else if (evento.keyCode == teclas.LEFT) {
        xFinal = puntoInicial.X - tamPaso;
    } else if (evento.keyCode == teclas.RIGHT) {
        xFinal = puntoInicial.X + tamPaso;
    }
    var condicion = verficaValor(xFinal, dibCanvas.width) &&
        verficaValor(yFinal, dibCanvas.height) && colorLine != "";
    if (puntoInicial.X == null && puntoInicial.Y == null) {
        mostrarMsj(true, "Elija punto inicial.");
    } else if (colorLine == "") {
        mostrarMsj(true, "Seleccione un color.");
    } else if (condicion) {
        console.log(puntoInicial);
        puntoActual.X = xFinal;
        puntoActual.Y = yFinal;
        drawLine(lienzo, puntoInicial, puntoActual, colorLine, grosorLinea);
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

function puntoMouse(event) {
    puntoInicial.X = event.offsetX;
    puntoInicial.Y = event.offsetY;
    dibCanvas.width = dibCanvas.width;
    dibujarPunto(lienzo, puntoInicial, "#FFF");
}

function selPuntoIni(event) {
    console.log(event);
    puntoInicial.X = event.offsetX;
    puntoInicial.Y = event.offsetY;
    console.log(puntoInicial);
}