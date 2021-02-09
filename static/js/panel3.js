var vp = document.getElementById("dibujo");
var papel = vp.getContext("2d");
// Parámetros Iniciales.
var tamPaso = 5;
var cantVacas = aleatorio(1, 6);
var cantPollos = aleatorio(1, 4);
var posVacas = [];
var posPollos = [];
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};
for (var i = 0; i < cantVacas; i++)
    posVacas.push({
        X: 80 * aleatorio(0, 5),
        Y: 80 * aleatorio(0, 5)
    });
for (var i = 0; i < cantPollos; i++)
    posPollos.push({
        X: 80 * aleatorio(0, 5),
        Y: 80 * aleatorio(0, 5)
    });

var fondo = {
    url: "../static/images/tile.png",
    cargaOk: false,
}

var vaca = {
    url: "../static/images/vaca.png",
    cargaOk: false,
    X: 0,
    Y: 0,
}
var pollo = {
    url: "../static/images/pollo.png",
    cargaOk: false,
    X: 0,
    Y: 0
}

var cerdo = {
    url: "../static/images/cerdo.png",
    cargaOk: false,
    X: 0,
    Y: 0
}
fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
//  Eventos.
fondo.imagen.addEventListener("load", cargarFondo);
vaca.imagen.addEventListener("load", cargarVaca);
pollo.imagen.addEventListener("load", cargarPollo);
cerdo.imagen.addEventListener("load", cargarCerdo);
document.addEventListener("keydown", cambiarPosCerdo);
setInterval(dibujar, 20);

function verficaValor(ptoAct, max) {
    if (ptoAct >= 0 && ptoAct <= max) return true;
    return false;
}

function cambiarPosCerdo(event) {
    var xFinal = cerdo.X,
        yFinal = cerdo.Y;
    if (event.keyCode == teclas.UP) {
        yFinal -= tamPaso;
    } else if (event.keyCode == teclas.DOWN) {
        yFinal += tamPaso;
    } else if (event.keyCode == teclas.LEFT) {
        xFinal -= tamPaso;
    } else if (event.keyCode == teclas.RIGHT) {
        xFinal += tamPaso;
    }
    var condicion = verficaValor(xFinal, vp.width - 80) &&
        verficaValor(yFinal, vp.height - 80);
    if (condicion) {
        cerdo.X = xFinal;
        cerdo.Y = yFinal;
    }
}

function cargarFondo() {
    fondo.cargaOk = true;
    dibujar();
}

function cargarVaca() {
    vaca.cargaOk = true;
    dibujar();
}

function cargarPollo() {
    pollo.cargaOk = true;
    dibujar();
}

function cargarCerdo() {
    cerdo.cargaOk = true;
    dibujar();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function dibujar() {
    if (fondo.cargaOk) papel.drawImage(fondo.imagen, 0, 0);
    if (vaca.cargaOk) {
        for (var i = 0; i < cantVacas; i++) {
            vaca.X = posVacas[i].X;
            vaca.Y = posVacas[i].Y;
            papel.drawImage(vaca.imagen, vaca.X, vaca.Y);
        }
    }
    if (pollo.cargaOk) {
        for (var i = 0; i < cantPollos; i++) {
            pollo.X = posPollos[i].X;
            pollo.Y = posPollos[i].Y;
            papel.drawImage(pollo.imagen, pollo.X, pollo.Y);
        }

    };
    if (cerdo.cargaOk) papel.drawImage(cerdo.imagen, cerdo.X, cerdo.Y);
}