"use strict";

function Laskin() {
    this.luku = 0;
    this.kasvata = function() {
        this.luku++;
    };
    this.annaLuku = function() {
        return this.luku;
    };
}

function alusta() {
    var laskin = new Laskin();
    var laskuri = document.getElementById("laskuri");
    var nappi = document.getElementById("nappi");
    nappi.addEventListener("click", function() {
        laskin.kasvata();
        laskuri.innerHTML = laskin.annaLuku();
    }, false);
}



