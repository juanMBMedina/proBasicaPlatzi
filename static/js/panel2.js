var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};


class Punto {
    constructor(_x, _y, _color, _grosorLin) {
        this.X = _x;
        this.Y = _y;
        this.color = _color;
        this.grosorLin = _grosorLin;
    }
    isNull() {
        if (this.X == null || this.Y == null)
            return true;
        return false;
    };
}

class Linea {
    constructor() {
        this.puntos = [];
        this.length = this.puntos.length;
    }
    push(newPunto) {
        this.puntos.push(newPunto);
        this.length = this.puntos.length;
    };
    cambiarColor(newColor) {
        this.puntos.forEach(punto => {
            punto.color = newColor;
        });
    }
}

class Mouse extends Punto {
    constructor(_estDibujar, _estBorrar, _estDesc, _estPuntero) {
        //estados, dibujar, borrar, descansar, puntoCursor.
        super(null, null, "#FFF", 5);
        this.estDib = _estDibujar;
        this.estBor = _estBorrar;
        this.estDesc = _estDesc;
        this.estPuntero = _estPuntero;
    }
    ActModoDib() {
        this.estDib = true;
        this.estBor = false;
        this.estDesc = false;
    };
    ActModoBor() {
        this.estDib = false;
        this.estBor = true;
        this.estDesc = false;
    };
    ActModoDesc() {
        this.estDib = false;
        this.estBor = false;
        this.estDesc = true;
    };
}


//Arreglos de los datos.
var listaLineas = new Array();
var nuevaLinea = new Linea();
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
setInterval(dibujarMundo, 50, puntero.estPuntero);
setInterval(prueba1, 10);
// Pruebas.
dibCanvas.addEventListener("mouseover", prueba1);
// Funciones

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
    if (conPunto) dibujarPunto(lienzo, puntero);
    for (var indLin = 0; indLin < listaLineas.length; indLin++) {
        var linAct = listaLineas[indLin];
        for (indPun = 1; indPun < linAct.length - 1; indPun++) {
            dibujarLinea(lienzo, linAct.puntos[indPun], linAct.puntos[indPun + 1]);
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
            //Añadir punto a la linea.
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
    puntero.X = event.offsetX;
    puntero.Y = event.offsetY;
    if (colorLine != "") puntero.color = colorLine;
    if (puntero.estDib) {
        // Para dibujar una Linea!!!
        //dibujarLinea(lienzo, listaPuntos[listaPuntos["length"] - 1],
        //    puntero, puntero.color, grosorLinea);
        nuevaLinea.push(
            new Punto(
                puntero.X,
                puntero.Y,
                puntero.color,
                grosorLinea)
        );
    }
    if (puntero.estBor) {
        console.log("Estoy borrando.");
    }
    if (puntero.estDesc) {
        console.log("No estoy haciendo nada.");
    }
}

function capturarPuntoIni() {
    if (colorLine != "") {
        if (puntero.estDesc) {
            puntero.ActModoDib();
            nuevaLinea = new Linea();
            listaLineas.push(nuevaLinea);
            nuevaLinea.push(
                new Punto(
                    puntero.X,
                    puntero.Y,
                    puntero.color,
                    grosorLinea)
            );
        }
    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}

function capturarPuntoFin() {
    if (colorLine != "") {
        if (puntero.estDib) {
            puntero.ActModoDesc();
            nuevaLinea.push(
                new Punto(
                    puntero.X,
                    puntero.Y,
                    puntero.color,
                    grosorLinea)
            );
        }
        if (puntero.estBor) {
            puntero.ActModoDesc();
        }
    } else {
        mostrarMsj(true, "Seleccione un color.");
    }
}

function pruebaBoton() {
    puntero.ActModoBor();
    listaLineas.forEach(linea => {
        linea.cambiarColor("#FF00C9");
    });

}

function prueba1() {
    if (puntero.estBor) {
        listaLineas.forEach(linea => {
            linea.puntos.forEach(punto => {
                if (punto.X == puntero.X && punto.X == puntero.Y) {
                    console.log("Choque");
                }
            });
        });
    }
}