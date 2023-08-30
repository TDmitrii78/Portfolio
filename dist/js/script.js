'use strict';
import menu from "./modules/menu.mjs";
import backTop from "./modules/backTop.mjs";
import animationElement from "./modules/animationElement.mjs";
import ratingCalc from "./modules/ratingCalc.mjs";


menu();
const back = backTop();

const animation = animationElement([ 
    [false, ".about__skill", "about__skill_animation", '', '', 0, 0, 1, 0, true], 
    [false, ".skills__item", "skills__item_animation", '', '', 0, 100, 1, 0, true], 
    [false, ".skills__rating-item", "skills__rating-item_animation", '', '', 0, 100, 1, 0, true], 
    [false, ".portfolio__item", "portfolio__item_animation", '', '', 0, 0, 1, 0, true],
    [false, ".contacts__column", "animation", '', '', 0, 0, 1, 0, true]   
]);

ratingCalc();

$('form').submit(function(e) {
    e.preventDefault();
    if (!$(this).valid()) {
        return;
    }
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

window.onscroll = () => {
    animation();
    back();
}