'use strict';

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

document.getElementById('hamburger-icon').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('show');
});

document.getElementById('hamburger-icon-sidebar').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('show');
});
