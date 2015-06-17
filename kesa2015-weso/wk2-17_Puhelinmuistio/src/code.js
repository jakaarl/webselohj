// apufunktio
Array.prototype.contains = function (value) {
    for (index in this) {
        if (this[index] === value) {
            return true;
        }
    }

    return false;
}


// toteuta puhelinmuistio tähän



// voit testata koodiasi seuraavilla esimerkeillä

muistio = new Puhelinmuistio();
muistio.lisaaNumero("mikke", "044-33669933");
muistio.lisaaNumero("mikke", "044-33669933");
console.log(muistio.annaNumerot("mikke")); // numero 044-33669933 vain kerran

muistio.lisaaNumero("mikke", "231");
console.log(muistio.annaNumerot("mikke")); // numerot 044-33669933 ja 231

console.log(muistio.annaNumerot("matti")); // tyhjä lista
muistio.lisaaNumero("matti", "1111");
console.log(muistio.annaNumerot("matti")); // numero 1111

console.log(muistio.annaNumerot("mikke")); // numerot 044-33669933 ja 231
