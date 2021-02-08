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
    cambiarColor(newColor) {
        this.color = newColor;
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
    dibPuntos(mapa, puntoIni, puntoFin) {
        mapa.beginPath();
        mapa.lineWidth = puntoIni.grosorLin;
        mapa.strokeStyle = puntoIni.color;
        mapa.moveTo(puntoIni.X, puntoIni.Y);
        mapa.lineTo(puntoFin.X, puntoFin.Y);
        mapa.stroke();
        mapa.closePath();
    };
    dibLinea(mapa) {
        for (var indPun = 1; indPun < this.length; indPun++) {
            this.dibPuntos(mapa, this.puntos[indPun - 1], this.puntos[indPun]);
        }
    };
    concat(newLinea) {
        this.puntos = this.puntos.concat(newLinea.puntos);
        this.length = this.puntos.length;
    };
    divLinea(color) {
        // Divide la linea por un color definido,
        var newLista = [];
        var nuevaLin = new Linea();
        for (var i = 0; i < this.length - 1; i++) {
            if (this.puntos[i].color == color && this.puntos[i + 1].color != color) {
                nuevaLin = new Linea();
            } else if (this.puntos[i].color != color && this.puntos[i + 1].color == color) {
                nuevaLin.push(this.puntos[i]);
                newLista.push(nuevaLin);
            } else if (this.puntos[i].color != color && this.puntos[i + 1].color != color) {
                if (i == 0) {
                    nuevaLin = new Linea();
                }
                nuevaLin.push(this.puntos[i]);
                if (i == this.length - 2) {
                    if (this.puntos[i + 1].color != color) nuevaLin.push(this.puntos[i + 1]);
                    newLista.push(nuevaLin);
                }
            }
        }
        return newLista;
    };
    verObj() {
        console.log(this);
    };
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
    dibLinea(mapa, xIni, yIni, xFin, yFin, grosor, color) {
        mapa.beginPath();
        mapa.lineWidth = grosor;
        mapa.strokeStyle = color;
        mapa.moveTo(xIni, yIni);
        mapa.lineTo(xFin, yFin);
        mapa.stroke();
        mapa.closePath();
    };
    dibPunt(mapa) {
        mapa.clearRect(0, 0, mapa.canvas.width, mapa.canvas.height);
        this.dibLinea(mapa, this.X, this.Y, this.X + this.grosorLin, this.Y, this.grosorLin, this.color);
        this.dibLinea(mapa, this.X, this.Y, this.X - this.grosorLin, this.Y, this.grosorLin, this.color);
        this.dibLinea(mapa, this.X, this.Y, this.X, this.Y + this.grosorLin, this.grosorLin, this.color);
        this.dibLinea(mapa, this.X, this.Y, this.X, this.Y - this.grosorLin, this.grosorLin, this.color);
    };
    verObj() {
        console.log(this);
    };
    isEnArea(coorX, coorY) {
        var isEnX = coorX > (this.X - this.grosorLin) && coorX < (this.X + this.grosorLin);
        var isEnY = coorY > (this.Y - this.grosorLin) && coorY < (this.Y + this.grosorLin);
        return isEnX && isEnY;
    };
}
class Borrador {
    constructor(_estBorrar) {
        this.estBor = _estBorrar;
        this.tipoBorrado = false; // Modos de borrado, false: normal true: choque.
    }
    ActModoDesc() {
        this.estBor = false;
        this.tipoBorrado = false;
    };
    ActModoNormal() {
        this.estBor = true;
        this.tipoBorrado = false;
    };
    ActModoChoque() {
        this.estBor = true;
        this.tipoBorrado = true;
    };
    verObj() {
        console.log(this);
    }

}
//DatoControlador.
var accionAct = false;
//Arreglos de los datos.
var listaLineas = new Array();
var nuevaLinea = new Linea();
// Botones: Borrar
var botonBorrarNormal = document.getElementById("botonBorrarNormal");
var botonBorrarChoque = document.getElementById("botonBorrarChoque");
//Botones: Dibujar
var botonDibujoLibre = document.getElementById("botonDibujoLibre");
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
var tamPaso = 1;
// Modos Mouse
var puntero = new Mouse(false, false, true, true);
var borrador = new Borrador(false);
// Eventos.
botonBorrarNormal.addEventListener("click", borrarNormal);
botonBorrarChoque.addEventListener("click", borrarChoque);
botonDibujoLibre.addEventListener("click", dibujarLibre);
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
setInterval(dibujarMundo, 10, true);
setInterval(borrarLin, 10);
// Pruebas.
dibCanvas.addEventListener("mouseleave", capturarPuntoFin);

// Funciones

function dibujarMundo(conPunto) {
    if (conPunto) puntero.dibPunt(lienzo);
    lienzo.clearRect(0, 0, dibCanvas.width, dibCanvas.heigth);
    listaLineas.forEach(linea => {
        linea.dibLinea(lienzo);
    });
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

function capturarPuntoIni() {
    if (puntero.estDesc && !borrador.estBor) {
        mostrarMsj(true, "Seleccione una Acción");
    } else if (puntero.estDib) {
        if (colorLine != "") {
            accionAct = true;
            nuevaLinea = new Linea();
            listaLineas.push(nuevaLinea);
            nuevaLinea.push(
                new Punto(
                    puntero.X,
                    puntero.Y,
                    puntero.color,
                    grosorLinea)
            );
        } else {
            mostrarMsj(true, "Seleccione un color.");
        }
    } else if (borrador.estBor) {
        accionAct = true;
        puntero.ActModoBor();
        mostrarMsj(false, "");
    }
}

function movCursor(event) {
    puntero.X = event.offsetX;
    puntero.Y = event.offsetY;
    if (colorLine != "") puntero.color = colorLine;
    if (puntero.estDib && accionAct) {
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
        console.log("Estoy Dibujando.");
    }
    if (puntero.estBor && accionAct) {
        console.log("Estoy borrando.");
    }
    if (puntero.estDesc) {
        console.log("No estoy haciendo nada.");
    }
}

function capturarPuntoFin() {
    if (colorLine == "" && puntero.estDib) {
        mostrarMsj(true, "No ha seleccionado un color?");
    } else if (colorLine != "" && puntero.estDib) {
        puntero.ActModoDib();
        mostrarMsj(false, "");
        accionAct = false;
    } else if (borrador.estBor) {
        if (!borrador.tipoBorrado) {
            // Color... pero no me cuadra...
            var colorBack = getStyle(dibCanvas, 'background-color');
            var nLista = new Array();
            listaLineas.forEach(linea => {
                var subLineas = linea.divLinea(colorBack);
                subLineas.forEach(subLinea => {
                    nLista.push(subLinea);
                });
            });
            listaLineas = nLista;
        }
        accionAct = false;
    }
}

function borrarChoque() {
    borrador.ActModoChoque();
    puntero.ActModoDesc();
    mostrarMsj(false, "");
}

function borrarNormal() {
    borrador.ActModoNormal();
    puntero.ActModoDesc();
    mostrarMsj(false, "");
}

function dibujarLibre() {
    puntero.ActModoDib();
    borrador.ActModoDesc();
    mostrarMsj(false, "");
}

function borrarLin() {
    if (accionAct && borrador.estBor) {
        var tamLista = listaLineas.length;
        if (borrador.tipoBorrado) {
            for (var indLin = 0; indLin < tamLista; indLin++) {
                listaLineas[indLin].puntos.forEach(punto => {
                    if (puntero.isEnArea(punto.X, punto.Y)) {
                        listaLineas.splice(indLin, 1);
                        indLin = tamLista; // Forzar Ruptura,
                    }
                });
            }
        } else if (!borrador.tipoBorrado) {
            // Color... pero no me cuadra...
            var colorBack = getStyle(dibCanvas, 'background-color');
            listaLineas.forEach(linea => {
                linea.puntos.forEach(punto => {
                    if (puntero.isEnArea(punto.X, punto.Y)) {
                        punto.cambiarColor(colorBack);
                    }
                });
            });
        }
    }
}

function getStyle(objeto, propiedad) {
    let estilo = window.getComputedStyle(objeto);
    return estilo[propiedad];
}