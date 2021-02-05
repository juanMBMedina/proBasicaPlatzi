function Punto(_x, _y, _color, _isInicial, _grosorLin) {
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

function Mouse(_estDibujar, _estBorrar, _estDesc) {
    //estados, dibujar, borrar, descansar, puntoCursor.
    this.estDib = _estDibujar;
    this.estBor = _estBorrar;
    this.estDesc = _estDesc;
    this.puntoCur = new Punto(null, null, "#FFF", false, 5)
}
// Boton Borrar
var botonBorrar = document.getElementById("botonBorrar");
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
var grosorLinea = 3;
var grosorPunto = 5;
var tamPaso = 1;
// Modos Mouse
var puntero = new Mouse(false, false, true);
var dibConMouse = false;
var borConMouse = false;
var noUsoMouse = true;
// Eventos.
botonBorrar.addEventListener("click", pruebaBoton);
color1.addEventListener("mouseover", onColor1);
color2.addEventListener("mouseover", onColor2);
color3.addEventListener("mouseover", onColor3);
color4.addEventListener("mouseover", onColor4);
color5.addEventListener("mouseover", onColor5);
color6.addEventListener("mouseover", onColor6);
color7.addEventListener("mouseover", onColor7);
dibCanvas.addEventListener("mousemove", movCursor);
dibCanvas.addEventListener("mousedown", capturarPuntoIni);
dibCanvas.addEventListener("mouseup", capturarPuntoFin);
document.addEventListener("keydown", dibujaTeclado);

function addPunto(newPunto) {
    listaPuntos.push(newPunto);
    //console.log(listaPuntos);
}

function dibujarPunto(mapaDibujo, puntDib) {
    dibujarLinea(mapaDibujo, puntDib, new Punto(puntDib.X + 5, puntDib.Y, puntDib.color, puntDib.isInicial, grosorPunto));
    dibujarLinea(mapaDibujo, puntDib, new Punto(puntDib.X - 5, puntDib.Y, puntDib.color, puntDib.isInicial, grosorPunto));
    dibujarLinea(mapaDibujo, puntDib, new Punto(puntDib.X, puntDib.Y + 5, puntDib.color, puntDib.isInicial, grosorPunto));
    dibujarLinea(mapaDibujo, puntDib, new Punto(puntDib.X, puntDib.Y - 5, puntDib.color, puntDib.isInicial, grosorPunto));
}

function dibujarLinea(mapaDibujo, puntoIni, puntoFin) {
    mapaDibujo.lineWidth = puntoFin.grosorLin;
    mapaDibujo.beginPath();
    mapaDibujo.strokeStyle = puntoFin.color;
    mapaDibujo.moveTo(puntoIni.X, puntoIni.Y);
    mapaDibujo.lineTo(puntoFin.X, puntoFin.Y);
    mapaDibujo.stroke();
    mapaDibujo.closePath();
}

function dibujarMundo(conPunto) {
    dibCanvas.width = dibCanvas.width;
    if (conPunto) dibujarPunto(lienzo, puntero.puntoCur);
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
            addPunto(new Punto(xFinal, yFinal, colorLine, false, grosorLinea));
            mostrarMsj(false, "");
            dibujarMundo(true);
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

function movCursor(event) {
    puntero.puntoCur.X = event.offsetX;
    puntero.puntoCur.Y = event.offsetY;
    if (colorLine != "") puntero.puntoCur.color = colorLine;
    dibujarMundo(!dibConMouse);
    if (dibConMouse) {
        // Para dibujar una Linea!!!
        //dibujarLinea(lienzo, listaPuntos[listaPuntos["length"] - 1],
        //    puntero.puntoCur, puntero.puntoCur.color, grosorLinea);
        addPunto(new Punto(puntero.puntoCur.X, puntero.puntoCur.Y, puntero.puntoCur.color, false, grosorLinea));
        console.log("Estoy dibujando.");
    }
    if (borConMouse) {
        console.log("Estoy borrando.")
    }
    if (noUsoMouse) {
        console.log("No estoy haciendo nada.")
    }
}

function capturarPuntoIni() {
    if (colorLine != "") {
        modoMouseDibujar();
        console.log("Hola voy a dibujar con Mouse");
        addPunto(new Punto(puntero.puntoCur.X, puntero.puntoCur.Y, puntero.puntoCur.color, true, grosorLinea));
        dibujarMundo(true);
        dibujarPunto(lienzo, listaPuntos[listaPuntos["length"] - 1]);
    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}

function capturarPuntoFin() {
    if (colorLine != "") {
        modoNoUsoMouse();
        console.log("Hola voy dejar de usar Mouse");
        addPunto(new Punto(puntero.puntoCur.X, puntero.puntoCur.Y, puntero.puntoCur.color, false, grosorLinea));
        dibujarMundo(true);
    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}

function modoMouseDibujar() {
    dibConMouse = true;
    borConMouse = false;
    noUsoMouse = false;
}

function modoMouseBorrar() {
    dibConMouse = false;
    borConMouse = true;
    noUsoMouse = false;
}

function modoNoUsoMouse() {
    dibConMouse = false;
    borConMouse = false;
    noUsoMouse = true;
}

function pruebaBoton(event) {
    console.log("Hola voy a borrar.");
    modoMouseBorrar();
}