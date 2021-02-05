var butTema = document.getElementById("cambioTema");
var etiquetaLink = document.getElementById("temaLink");
var esClaro = true;
butTema.addEventListener("click", cambiarTema);
cambiarTema();
//Inicial para el tema.
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