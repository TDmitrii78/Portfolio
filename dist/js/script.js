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

function back() {
    const back = document.querySelector('#back');
    window.onscroll = () => {
        let currentY = window.pageYOffset;
        if (currentY > 1000) {
            back.classList.add('back-btn_active');
        } else {
            back.classList.remove('back-btn_active');
        }
    } 
}
back();

function raiting() {
    const skillsRating = document.querySelectorAll('.skills__rating-item-value');
    skillsRating.forEach((el) => {
        el.nextElementSibling.firstElementChild.style.width = el.textContent;;
    })
}
raiting();
 

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

