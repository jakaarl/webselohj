var chuckles = {};

chuckles.gui = (function () {
    function show() {
        var chucklesElement = document.getElementById("chuckles");

        clear(chucklesElement);
        populate(chucklesElement);
    }

    function clear(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function populate(element) {
        var chucks = chuckles.data.list();
        for (var i = 0; i < chucks.length; i++) {
            addChuckle(element, chucks[i]);
        }
    }

    function addChuckle(element, chuckle) {
        var chuckleElement = document.createElement("p");
        var chuckleText = document.createTextNode(chuckle);
        chuckleElement.appendChild(chuckleText);
        element.appendChild(chuckleElement);
    }

    return {
        show: show
    };

})();

chuckles.data = (function (displayHook) {
    var jokes = [];

    function load(url) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === this.DONE && request.status === 200) {
                var response = JSON.parse(request.responseText);
                jokes = response.value.map(function(entry) {
                   return entry.joke; 
                });
                displayHook();
                return true;
            } else {
                return false;
            }
        };
        request.open("GET", url);
        request.send();
    }

    function list() {
        return jokes;
    }

    return {
        load: load,
        list: list
    };


})(chuckles.gui.show);

function init() {
    var url = "http://api.icndb.com/jokes/random/3";
    chuckles.data.load(url);
}

