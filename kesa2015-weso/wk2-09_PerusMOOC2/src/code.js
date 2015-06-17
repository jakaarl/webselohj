function init() {
    displaySection(0);
    registerOnClickHandlers();
}

function displaySection(index) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (index === i) {
            sections[i].className = '';
        } else {
            sections[i].className = 'hidden';
        }
    }
}

function registerOnClickHandlers() {
    function handleClick(clickEvent) {
        var origin = clickEvent.target;
        displaySection(Number(origin.id));
        clickEvent.preventDefault();
    };
    var sectionLinks = document.querySelectorAll("nav ul li a");
    for (var i = sectionLinks.length - 1; -1 < i; i--) {
        var link = sectionLinks[i];
        link.id = i;
        link.addEventListener("click", handleClick, false);
    };
}