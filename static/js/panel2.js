function punto(_x, _y, _color, _isInicial) {
    this.X = _x;
    this.Y = _y;
    this.color = _color;
    this.isInicial = _isInicial;
    this.isNull = function() {
        if (this.X == null || this.Y == null) return true;
        return false;
    }
}
var listaPuntos = new Array();
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
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
var puntoCursor = new punto(null, null, "#FFF", false);
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
dibCanvas.addEventListener("mousemove", dibujarCursor);
dibCanvas.addEventListener("mouseover", dibujarCursor);

function addPunto(newPunto) {
    listaPuntos.push(newPunto);
    //console.log(listaPuntos);
}

function dibujarPunto(mapaDibujo, puntoDibujo) {
    dibujarLinea(mapaDibujo, puntoDibujo, { X: puntoDibujo.X - 5, Y: puntoDibujo.Y }, puntoDibujo.color, 5);
    dibujarLinea(mapaDibujo, puntoDibujo, { X: puntoDibujo.X + 5, Y: puntoDibujo.Y }, puntoDibujo.color, 5);
    dibujarLinea(mapaDibujo, puntoDibujo, { X: puntoDibujo.X, Y: puntoDibujo.Y - 5 }, puntoDibujo.color, 5);
    dibujarLinea(mapaDibujo, puntoDibujo, { X: puntoDibujo.X, Y: puntoDibujo.Y + 5 }, puntoDibujo.color, 5);
}

function dibujarLinea(mapaDibujo, initPoint, endPoint, color, anchoLinea) {
    mapaDibujo.lineWidth = anchoLinea;
    mapaDibujo.beginPath();
    mapaDibujo.strokeStyle = color;
    mapaDibujo.moveTo(initPoint.X, initPoint.Y);
    mapaDibujo.lineTo(endPoint.X, endPoint.Y);
    mapaDibujo.stroke();
    mapaDibujo.closePath();
}

function dibujarMundo() {
    dibCanvas.width = dibCanvas.width;
    dibujarPunto(lienzo, puntoCursor);
    if (listaPuntos.length > 1) {
        for (var i = 0; i < listaPuntos.length; i++) {
            if (listaPuntos[i].isInicial) i++;
            dibujarLinea(lienzo, listaPuntos[i - 1], listaPuntos[i], listaPuntos[i].color, grosorLinea);
        }
    }
}

function verficaValor(ptoAct, max) {
    if (ptoAct >= 0 && ptoAct <= max) return true;
    return false;
}

function dibujaTeclado(event) {
    if (listaPuntos.length == 0) {
        mostrarMsj(true, "Elija punto de inicio.");
    } else {
        var puntoActual = listaPuntos[listaPuntos.length - 1];
        var xFinal = puntoActual.X,
            yFinal = puntoActual.Y;
        if (event.keyCode == teclas.UP) {
            yFinal -= tamPaso;
        } else if (event.keyCode == teclas.DOWN) {
            yFinal += tamPaso;
        } else if (event.keyCode == teclas.LEFT) {
            xFinal -= tamPaso;
        } else if (event.keyCode == teclas.RIGHT) {
            xFinal += tamPaso;
        }
        var condicion = verficaValor(xFinal, dibCanvas.width) &&
            verficaValor(yFinal, dibCanvas.height);
        if (condicion) {
            addPunto(new punto(xFinal, yFinal, puntoActual.color, false));
            mostrarMsj(false, "");
            dibujarMundo();
        } else {
            mostrarMsj(true, "Se sale del mapa.");
        }
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

function dibujarCursor(event) {
    puntoCursor.X = event.offsetX;
    puntoCursor.Y = event.offsetY;
    dibujarMundo();
}

function selPuntoIni(event) {
    puntoCursor.X = event.offsetX;
    puntoCursor.Y = event.offsetY;
    if (colorLine != "") {
        addPunto(new punto(event.offsetX, event.offsetY, colorLine, true));
        dibujarMundo();
    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}