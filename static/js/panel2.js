var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

class Mouse {
    constructor(_estDibujar, _estBorrar, _estDesc, _estPuntero) {
        //estados, dibujar, borrar, descansar, puntoCursor.
        this.estDib = _estDibujar;
        this.estBor = _estBorrar;
        this.estDesc = _estDesc;
        this.estPuntero = _estPuntero;
        this.puntoCur = new Punto(null, null, "#FFF", false, 5);
        // Conf. modos
        this.ActModoDib = function() {
            this.estDib = true;
            this.estBor = false;
            this.estDesc = false;
        };
        this.ActModoBor = function() {
            this.estDib = false;
            this.estBor = true;
            this.estDesc = false;
        };
        this.ActModoDesc = function() {
            this.estDib = false;
            this.estBor = false;
            this.estDesc = true;
        };
    }
}

class Punto {
    constructor(_x, _y, _color, _isInicial, _grosorLin) {
        this.X = _x;
        this.Y = _y;
        this.color = _color;
        this.isInicial = _isInicial;
        this.grosorLin = _grosorLin;
        this.isNull = function() {
            if (this.X == null || this.Y == null)
                return true;
            return false;
        };
    }
}

class Linea {
    constructor(_puntos) {
        //Linea Para borrar.
        this.puntos = _puntos;
        this.length = this.puntos.length;
    }
}
//Arregols de los datos.
var listaPuntos = new Array();
var listaLineas = new Array();
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
var puntero = new Mouse(false, false, true, true);
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
setInterval(dibujarMundo, 5, puntero.estPuntero);
// Pruebas.
console.log(dibCanvas)
console.log(lienzo);
// Funciones
function addPunto(newPunto) {
    listaPuntos.push(newPunto);
    //console.log(listaPuntos);
}

function dibujarPunto(mapaDibujo, puntDib) {
    lienzo.clearRect(0, 0, dibCanvas.width, dibCanvas.height);
    dibujarLinea(mapaDibujo, puntDib, { X: puntDib.X + 5, Y: puntDib.Y });
    dibujarLinea(mapaDibujo, puntDib, { X: puntDib.X - 5, Y: puntDib.Y });
    dibujarLinea(mapaDibujo, puntDib, { X: puntDib.X, Y: puntDib.Y + 5 });
    dibujarLinea(mapaDibujo, puntDib, { X: puntDib.X, Y: puntDib.Y - 5 });
}

function dibujarLinea(mapaDibujo, puntoIni, puntoFin) {
    mapaDibujo.lineWidth = puntoIni.grosorLin;
    mapaDibujo.beginPath();
    mapaDibujo.strokeStyle = puntoIni.color;
    mapaDibujo.moveTo(puntoIni.X, puntoIni.Y);
    mapaDibujo.lineTo(puntoFin.X, puntoFin.Y);
    mapaDibujo.stroke();
    mapaDibujo.closePath();
}

function dibujarMundo(conPunto) {
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
    if (puntero.estDib) {
        // Para dibujar una Linea!!!
        //dibujarLinea(lienzo, listaPuntos[listaPuntos["length"] - 1],
        //    puntero.puntoCur, puntero.puntoCur.color, grosorLinea);
        addPunto(new Punto(puntero.puntoCur.X, puntero.puntoCur.Y, puntero.puntoCur.color, false, grosorLinea));
        console.log("Estoy dibujando.");
    }
    if (puntero.estBor) {
        console.log("Estoy borrando.")
    }
    if (puntero.estDesc) {
        console.log("No estoy haciendo nada.")
    }
}

function capturarPuntoIni() {
    if (colorLine != "") {

        if (puntero.estDesc) {
            puntero.ActModoDib();
            addPunto(new Punto(puntero.puntoCur.X, puntero.puntoCur.Y, puntero.puntoCur.color, true, grosorLinea));
        }

    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}

function capturarPuntoFin() {
    if (colorLine != "") {

        if (puntero.estDib) {
            puntero.ActModoDesc();
            addPunto(new Punto(puntero.puntoCur.X, puntero.puntoCur.Y, puntero.puntoCur.color, false, grosorLinea));
        }
        if (puntero.estBor) puntero.ActModoDesc();


    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}


function pruebaBoton() {
    puntero.ActModoBor();
    console.log(listaPuntos);
    var indexIni = 0;
    var indexFin = 0;
    var listaPrueba = [];
    for (var i = 0; i < listaPuntos.length; i++) {
        if (listaPuntos[i].isInicial && i > indexIni) {
            indexFin = i - 1;
            console.log(indexIni, indexFin);
            listaLineas.push(new Linea(listaPrueba));
            listaPrueba = [];
            indexIni = i;
        }
        listaPrueba.push(listaPuntos[i]);
    }
    listaLineas.push(new Linea(listaPrueba));
}