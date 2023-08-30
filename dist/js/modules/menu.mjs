const menu = function() {
    function openMenu() {
        const menu = document.querySelector('.menu');
        const hamburger = document.querySelector('.hamburger');
        hamburger.onclick = () => {
            menu.classList.add('menu_active');
        }
    }
    openMenu();

    function exit() {
        const menu = document.querySelector('.menu');
        const exit = document.querySelector('.menu__exit');
        exit.onclick = () => {
            menu.classList.remove('menu_active');
        }
    }
    exit();
}

export default menu;