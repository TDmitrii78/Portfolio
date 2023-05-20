const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.hamburger');

hamburger.onclick = () => {
    menu.classList.add('menu_active');
}

const exit = document.querySelector('.menu__exit');

exit.onclick = () => {
    menu.classList.remove('menu_active');
}