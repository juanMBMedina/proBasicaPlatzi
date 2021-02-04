//Parametos Default
var colorLine = "";
// Objetos
var numLineas = document.getElementById("txtIn");
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
// Eventos.
numLineas.addEventListener("input", dibujarFigura);
color1.addEventListener("mouseover", onColor1);
color2.addEventListener("mouseover", onColor2);
color3.addEventListener("mouseover", onColor3);
color4.addEventListener("mouseover", onColor4);
color5.addEventListener("mouseover", onColor5);
color6.addEventListener("mouseover", onColor6);
color7.addEventListener("mouseover", onColor7);

function drawLine(lienzo, initPoint, endPoint, color) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.moveTo(initPoint[0], initPoint[1]);
    lienzo.lineTo(endPoint[0], endPoint[1]);
    lienzo.stroke();
    lienzo.closePath();
}

function figura(xMax, yMax, lineas, color) {
    var delta = xMax / lineas;
    for (var l = 0; l < lineas; l += 1) {
        drawLine(lienzo, [0, delta * l], [delta * (l + 1), yMax], color);
        drawLine(lienzo, [delta * l, yMax], [xMax, yMax - delta * (l + 1)], color);
        drawLine(lienzo, [xMax, yMax - delta * (l + 1)], [xMax - delta * (l + 1), 0], color);
        drawLine(lienzo, [xMax - delta * l, 0], [0, delta * (l + 1)], color);
    }
}

function verficaValor() {
    if (!isNaN(numLineas.value) && numLineas.value != "" && !/\s/g.test(numLineas.value)) {
        numLineas.setAttribute("style", "color:#FFFFFF");
        numLineas.value = parseInt(numLineas.value);
        mostrarMsj(false, "");
        return true;
    }
    mostrarMsj(true, "No valido.");
    numLineas.setAttribute("style", "color:#FF5F5F");
    return false;
}

function dibujarFigura() {
    if (verficaValor() && parseInt(numLineas.value) >= 0) {
        dibCanvas.width = dibCanvas.width;
        if (colorLine == "") {
            mostrarMsj(true, "Pasar el mouse por algún color para dibujar");
        } else {
            mostrarMsj(false, "");
            figura(dibCanvas.width, dibCanvas.height, parseInt(numLineas.value), colorLine);
        }
    }
}

function onColor1() {
    colorLine = "#FFFFFF";
    changeColor7();
    dibujarFigura();
}

function onColor2() {
    colorLine = "#FDFB63";
    changeColor7();
    dibujarFigura();
}

function onColor3() {
    colorLine = "#55C1FF";
    changeColor7();
    dibujarFigura();
}

function onColor4() {
    colorLine = "#C7FAB0";
    changeColor7();
    dibujarFigura();
}

function onColor5() {
    colorLine = "#DD6CFF";
    changeColor7();
    dibujarFigura();
}

function onColor6() {
    colorLine = "#FF5F5F";
    changeColor7();
    dibujarFigura();
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