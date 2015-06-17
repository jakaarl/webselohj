function haeNumero(tunnus) {
    return parseInt(document.getElementById(tunnus).value);
}

function asetaTulos(tulos) {
    document.getElementById("tulos").innerHTML = tulos;
}

function plus() {
    asetaTulos(haeNumero("eka") + haeNumero("toka"));
}

function miinus() {
    asetaTulos(haeNumero("eka") - haeNumero("toka"));
}

function kerto() {
    asetaTulos(haeNumero("eka") * haeNumero("toka"));
}

function jako() {
    asetaTulos(haeNumero("eka") / haeNumero("toka"));
}

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame    ||
           window.oRequestAnimationFrame      ||
           window.msRequestAnimationFrame     ||
           function(/* kutsuttava funktio */ callback, /* elementti */ element){
               window.setTimeout(callback, 1000 / 60);
           };
    })();


function ajasta() {
    piirra();
    requestAnimFrame( ajasta );
}

function piirra() {
    var piirturi = document.getElementById("alusta").getContext("2d");
    var nopeus = parseInt(document.getElementById("tulos").innerHTML);
    if(!nopeus) {
        nopeus = 2;
    }

    if(nopeus < 0) {
        nopeus = 1 / (nopeus * -1);
    }

    var aika = new Date().getTime() * 0.001 * nopeus;
    var x = Math.sin( aika ) * 100 + 125;

    //  piirretään ensin valkoinen tausta
    piirturi.fillStyle = "rgb(255, 255, 255)";
    piirturi.fillRect( 0, 0, 300, 200 );

    // ja sitten neliö
    piirturi.fillStyle = "rgb(255,0,0)";
    piirturi.fillRect(x, 50, 50, 50);
}

ajasta();