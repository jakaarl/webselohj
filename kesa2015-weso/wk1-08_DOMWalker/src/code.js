function init() {
    var dom = document.getElementById("dom");
    var elements = document.querySelectorAll("body *");
    for (i = 0; i < elements.length; i++) {
        var current = elements.item(i);
        if (current.id === "dom") {
            continue;
        }
        var paragraph = document.createElement("p");
        var text = document.createTextNode(current.nodeName);
        paragraph.appendChild(text);
        dom.appendChild(paragraph);
    }
}