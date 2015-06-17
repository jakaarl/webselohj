var submission = {};

submission.gui = (function() {
    
    function buttonPressed() {
        var name = document.getElementById("name").value;
        var details = document.getElementById("details").value;
        var data = {
            name: name,
            details: details
        };
        
        submission.io.send(data);
    }
    
    return {
        buttonPressed: buttonPressed
    };
    
})();

submission.io = (function() {
    var url = "http://bad.herokuapp.com/app/in";
    function sendObject(object) {
        var data = JSON.stringify(object);
        var request = new XMLHttpRequest();
        request.open("POST", url);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(data);
    }
    
    return {
        send: sendObject
    };
})();

function init() {    
    var button = document.getElementById("submit");
    button.addEventListener("click", submission.gui.buttonPressed, false);
}

