var imagenes = [];
imagenes["cerdo"] = "../static/images/cerdo.png";
imagenes["fondo"] = "../static/images/fondo.png"
imagenes["pollo"] = "../static/images/pollo.png";
imagenes["vaca"] = "../static/images/vaca.png";

class Pakiman {
    constructor(nombre, vida, ataque, tipo) {
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
        this.tipo = tipo;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.tipo];
    };
    hablar(msj) {
        alert(msj);
    }
    mostrar(elemPadre) {
        var div = document.createElement("div");
        div.style = "display:flex;"
        var colIzq = document.createElement("span");
        var colDer = document.createElement("span");
        var nombre = document.createElement("strong");
        var salto = document.createElement("br");
        var vida = document.createElement("p");
        var ataque = document.createElement("p");
        nombre.textContent = "Nombre: " + this.nombre;
        vida.textContent = "Vida:" + this.vida;
        ataque.textContent = "Ataque:" + this.ataque;
        elemPadre.appendChild(div);
        div.appendChild(colIzq);
        div.appendChild(colDer);
        colIzq.appendChild(nombre);
        colIzq.appendChild(vida);
        colIzq.appendChild(ataque);
        colDer.appendChild(this.imagen);
        elemPadre.appendChild(salto);
    }
}

var coleccion = [];
coleccion.push(new Pakiman("cauchin", 100, 80, "cerdo"));
coleccion.push(new Pakiman("pokacho", 100, 80, "pollo"));
coleccion.push(new Pakiman("tocinauro", 100, 80, "vaca"));

var listaPakimanes = document.getElementById("listaPakiman");
coleccion.forEach(pakiman => {
    pakiman.mostrar(listaPakimanes);
});

/*
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

posVacas = generaPos(cantVacas);
posPollos = generaPos(cantPollos);

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


function generaPos(cantAnimal) {
    var posAnimal = []
    for (var i = 0; i < cantAnimal; i++) {
        var x = 40 * aleatorio(0, 10);
        var y = 40 * aleatorio(0, 10);
        console.log(x, y);
        while ((x > 300 && y > 300) || (x < 80 && y < 80)) {
            x = 80 * aleatorio(0, 5);
            y = 80 * aleatorio(0, 5);
        }
        posAnimal.push({
            X: x,
            Y: y
        });
    }
    return posAnimal;
}

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
*/