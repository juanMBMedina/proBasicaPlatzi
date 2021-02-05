function punto(_x, _y, _color, _isInicial, _grosorLin) {
    this.X = _x;
    this.Y = _y;
    this.color = _color;
    this.isInicial = _isInicial;
    this.grosorLin = _grosorLin;
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
var tamPaso = 2;
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
dibCanvas.addEventListener("mousemove", dibujarCursor);
dibCanvas.addEventListener("mousedown", prueba1);
dibCanvas.addEventListener("mouseup", prueba2);
// Funciones Prueba.
var puntoCursor1 = new punto(100, 100, "#FFF", false, 5);
var puntoCursor2 = new punto(150, 150, "#FFF", false, 5);
dibujarLinea(lienzo, puntoCursor1, puntoCursor2);

function dibujarLineaPrueba(mapaDibujo, puntoIni, puntoFin) {
    console.log(puntoIni, puntoFin);
    mapaDibujo.lineWidth = puntoFin.grosorLin;
    mapaDibujo.beginPath();
    mapaDibujo.strokeStyle = puntoFin.color;
    mapaDibujo.moveTo(puntoIni.X, puntoIni.Y);
    mapaDibujo.lineTo(puntoFin.X, puntoFin.Y);
    mapaDibujo.stroke();
    mapaDibujo.closePath();
}
//
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

function dibujarLinea(mapaDibujo, puntoIni, puntoFin) {
    console.log(puntoIni, puntoFin);
    mapaDibujo.lineWidth = puntoFin.grosorLin;
    mapaDibujo.beginPath();
    mapaDibujo.strokeStyle = puntoFin.color;
    mapaDibujo.moveTo(puntoIni.X, puntoIni.Y);
    mapaDibujo.lineTo(puntoFin.X, puntoFin.Y);
    mapaDibujo.stroke();
    mapaDibujo.closePath();
}

function dibujarMundo() {
    dibCanvas.width = dibCanvas.width;
    dibujarPunto(lienzo, puntoCursor);
    if (listaPuntos.length > 1) {
        for (var i = 0; i < listaPuntos.length; i++) {
            if (listaPuntos[i].isInicial) i += 1;
            if (i < listaPuntos.length) {
                dibujarLinea(lienzo, listaPuntos[i - 1], listaPuntos[i], listaPuntos[i].color, grosorLinea);
            }
        }
    }
}

function verficaValor(ptoAct, max) {
    if (ptoAct >= 0 && ptoAct <= max) return true;
    return false;
}

function dibujaTeclado(event) {
    var tamLista = listaPuntos["length"];
    if (tamLista > 0) {
        var puntoActual = listaPuntos[tamLista - 1];
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
        if (colorLine == "") {
            mostrarMsj(true, "Seleccione color.");
        } else if (condicion) {
            addPunto(new punto(xFinal, yFinal, colorLine, false));
            mostrarMsj(false, "");
            dibujarMundo();
            dibujarPunto(lienzo, listaPuntos[tamLista - 1]);
        } else {
            mostrarMsj(true, "Se sale del mapa.");
        }
    } else {
        mostrarMsj(true, "Seleccione un punto.")
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
    if (colorLine != "") puntoCursor.color = colorLine;
    dibujarMundo();
    if (dibujoMouse) {
        dibujarLinea(lienzo, listaPuntos[listaPuntos["length"] - 1],
            puntoCursor, puntoCursor.color, grosorLinea);
    }
}

function prueba1() {
    if (colorLine != "") {
        dibujoMouse = true;
        addPunto(new punto(puntoCursor.X, puntoCursor.Y, puntoCursor.color, true));
        dibujarMundo();
        dibujarPunto(lienzo, listaPuntos[listaPuntos["length"] - 1]);
    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}

function prueba2() {
    if (colorLine != "") {
        dibujoMouse = false;
        addPunto(new punto(puntoCursor.X, puntoCursor.Y, puntoCursor.color, false));
        dibujarMundo();
    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}