function Tavara(nimi, paino) {
    this.nimi = nimi;
    this.paino = paino;
}

function Matkalaukku(kapasiteetti) {
    this.sisalto = [];
    this.kapasiteetti = kapasiteetti;
    this.paino = function() {
        return this.sisalto.reduce(function(edellinen, nykyinen) {
            return edellinen + nykyinen.paino;
        }, 0);
    };
    this.lisaa = function(tavara) {
        _lisaa(this, tavara, function(paino, tavara) {
            if (tavara instanceof Tavara) {
                var uusiPaino = paino + tavara.paino;
                return uusiPaino <= kapasiteetti;
            }
            return false;
        });
    };
}

function Ruuma(kapasiteetti) {
    this.sisalto = [];
    this.kapasiteetti = kapasiteetti;
    this.paino = function() {
        return this.sisalto.reduce(function(edellinen, nykyinen) {
            return edellinen + nykyinen.paino();
        }, 0);
    };
    this.lisaa = function(laukku) {
        _lisaa(this, laukku, function(paino, laukku) {
            if (laukku instanceof Matkalaukku) {
                var uusiPaino = paino + laukku.paino();
                return uusiPaino <= kapasiteetti;
            }
            return false;
        });
    };
}

function _lisaa(sailio, lisattava, saaLisata) {
    if (saaLisata(sailio.paino(), lisattava)) {
        var loytyy = false;
        sailio.sisalto.forEach(function(sailotty) {
            if (sailotty === lisattava) {
                loytyy = true;
                return;
            }
        });
        if (!loytyy) {
            sailio.sisalto.push(lisattava);
        }
    }
}

// testikoodi:
var kivi = new Tavara("kivi", 3);
var kirja = new Tavara("kirja", 7);
var pumpuli = new Tavara("pumpuli", 0.001);

var laukku = new Matkalaukku(10);
var vuitton = new Matkalaukku(3);

var schenker = new Ruuma(15);


laukku.lisaa(kivi);
console.log("laukun paino, pitäisi olla 3: " + laukku.paino());
laukku.lisaa(kivi); // virhe: "Tavara lisätty jo, ei onnistu!"

laukku.lisaa(kirja);
console.log("laukun paino, pitäisi olla 10: " + laukku.paino());

laukku.lisaa(pumpuli); // virhe: "Liian painava, ei pysty!"

console.log("laukun paino, pitäisi olla 10: " + laukku.paino());


schenker.lisaa(laukku);
schenker.lisaa(pumpuli); // virhe: Vääränlainen esine, ei onnistu!

console.log("Ruuman paino, pitäisi olla 10: " + schenker.paino());

vuitton.lisaa(pumpuli);
schenker.lisaa(vuitton);
console.log("Ruuman paino, pitäisi olla noin 10.001: " + schenker.paino()); 

pumpuli.paino = 300;
console.log("Ruuman paino, pitäisi olla 310: " + schenker.paino()); // hups!
