"use strict";

function displaySection(index) {
    var sections = document.getElementsByTagName("section");

    for(var i = 0; i < sections.length; i++) {
        if (index === i) {
            sections[i].className='';
        } else {
            sections[i].className='hidden';
        }
    }
}


