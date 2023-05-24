const menu = document.querySelector('.menu');
const hamburger = document.querySelector('.hamburger');
hamburger.onclick = () => {
    menu.classList.add('menu_active');
}

const exit = document.querySelector('.menu__exit');
exit.onclick = () => {
    menu.classList.remove('menu_active');
}

const back = document.querySelector('#back');
window.onscroll = () => {
    let currentY = window.pageYOffset;
    if (currentY > 1000) {
        back.classList.add('back-btn_active');
    } else {
        back.classList.remove('back-btn_active');
    }
} 

const body = document.querySelector('body');
const date = new Date();
const time = date.getHours();
if ((time > 22) || (time < 6)) {
    body.classList.add('night');
} else {
    body.classList.remove('night');
}


$('form').submit(function(e) {
    e.preventDefault();
    // if (!$(this).valid()) {
    //     return;
    // }
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('form').trigger('reset');
    });
    return false;
});