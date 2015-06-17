"use strict";

var chat = {};
chat.Message = function(time, nick, message) {
    this.time = time;
    this.nick = nick;
    this.message = message;
};
chat.net = (function() {
    var nickname;
    var messages = [];
    
    function login() {
        var nickElement = document.getElementById("nick");
        var nickValue = nickElement.value;
        var loginUrl = "http://bad.herokuapp.com/app/auth";
        var loginMessage = { "nickname": nickValue };
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === this.DONE) {
                if (request.status === 200) {
                    loggedIn(nickValue);
                    return true;
                } else {
                    console.log("Status: " + request.status + "; response: " + request.responseText);
                }
            }
            return false;
        };
        request.open("POST", loginUrl);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(loginMessage));
    }
    
    function loggedIn(loginNick) {
        nickname = loginNick;
        console.log("Logged in: " + nickname);
        chat.gui.showChat();
        loadMessages();
    }
    
    function loadMessages() {
        var messagesUrl = "http://bad.herokuapp.com/app/messages";
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === this.DONE) {
                if (request.status === 200) {
                    var entries = JSON.parse(request.responseText);
                    entries.forEach(function (entry) {
                        console.log("Got message: " + entry.message);
                        messages.push(
                            new chat.Message(entry.timestamp, entry.nickname, entry.message));
                        chat.gui.refresh();
                    });
                    return true;
                } else {
                    console.log("Status: " + request.status + "; response: " + request.responseText);
                }
            }
            return false;
        };
        request.open("GET", messagesUrl);
        request.send();
    }
    
    return {
        login: login
    };
})();
chat.gui = (function() {
    var loginView = document.getElementById("loginView");
    var chatView = document.getElementById("chatView");
    
    function showLogin() {
        loginView.className = "";
        chatView.className = "hidden";
    }
    
    function showChat() {
        loginView.className = "hidden";
        chatView.className = "";
    }
    
    function refresh() {
        
    }
    
    return {
        showLogin: showLogin,
        showChat: showChat,
        refresh: refresh
    };
})();

function init() {
    chat.gui.showLogin();
    var loginButton = document.getElementById("login");
    loginButton.addEventListener("click", chat.net.login, false);
}
