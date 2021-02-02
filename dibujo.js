//Prametos Default
var colorLineDefault = "#C7FAB0";
var colorLine = colorLineDefault;
// Objetos
var numLineas = document.getElementById("txtIn");
var botonDibujar = document.getElementById("butDraw");
var dibCanvas = document.getElementById("dibujito");
var lienzo = dibCanvas.getContext("2d");
//Eventos.
numLineas.addEventListener("input", dibujarFigura);
botonDibujar.addEventListener("click", dibujarFigura);
//Prueba
botonDibujar.addEventListener("mouseover", prueba1);
botonDibujar.addEventListener("mouseout", prueba2);

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

        drawLine(lienzo, [delta * l, delta * l], [xMax, 0], color);
        drawLine(lienzo, [delta * l, delta * l], [0, yMax], color);
        drawLine(lienzo, [delta * l, yMax - delta * l], [xMax, yMax], color);
        drawLine(lienzo, [delta * l, yMax - delta * l], [0, 0], color);

        drawLine(lienzo, [delta * l, yMax / 2], [xMax / 2, 0], color);
        drawLine(lienzo, [delta * l, yMax / 2], [xMax / 2, yMax], color);
        drawLine(lienzo, [xMax / 2, delta * l], [xMax, yMax / 2], color);
        drawLine(lienzo, [xMax / 2, delta * l], [0, yMax / 2], color);
    }
}

function verficaValor() {
    if (!isNaN(numLineas.value) && numLineas.value != "" && !/\s/g.test(numLineas.value)) {
        numLineas.style = "color:aliceblue";
        numLineas.value = parseInt(numLineas.value);
        return true;
    } else if (numLineas.value == "") {
        numLineas.style = "color:aliceblue";
        dibCanvas.width = dibCanvas.width;
        return false;
    }
    numLineas.value = "No valido.";
    numLineas.style = "color: rgb(255, 138, 138);";
    return false;
}

function dibujarFigura() {
    if (verficaValor() && parseInt(numLineas.value) > 0) {
        dibCanvas.width = dibCanvas.width;
        if (colorLine != colorLineDefault) {
            figura(dibCanvas.width, dibCanvas.height, parseInt(numLineas.value), colorLine);
        } else {
            figura(dibCanvas.width, dibCanvas.height, parseInt(numLineas.value), colorLineDefault);
        }

    }
}

function prueba1() {
    colorLine = "#FFFFFF";
    dibujarFigura();
}

function prueba2() {
    colorLine = colorLineDefault;
    dibujarFigura();
}