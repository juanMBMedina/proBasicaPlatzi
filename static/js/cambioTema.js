var elemCambioTema = document.getElementById("cambioTema");
var etiquetaLink = document.getElementById("temaLink");
var esClaro = true;
elemCambioTema.addEventListener("click", cambiarTema);
//Inicial para el tema.
cambiarTema()

function cambiarTema() {
    if (esClaro) {
        ponerClaro();
    } else {
        ponerOscuro();
    }
    esClaro = !esClaro;
}

function ponerClaro() {
    etiquetaLink.setAttribute("href", "../static/css/lightstyle.css");
}

function ponerOscuro() {
    etiquetaLink.setAttribute("href", "../static/css/darkstyle.css");
}