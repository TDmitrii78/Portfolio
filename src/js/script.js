'use strict';
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
    return function start() {
        let currentY = window.pageYOffset;
        if (currentY > 1000) {
            back.classList.add('back-btn_active');
        } else {
            back.classList.remove('back-btn_active');
        }
    } 
}
const backTop = back();

function raiting() {
    const skillsRating = document.querySelectorAll('.skills__rating-item-value');
    skillsRating.forEach((el) => {
        el.nextElementSibling.firstElementChild.style.width = el.textContent;;
    })
}
raiting();
 

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

function animationElement(settingArrey) {
    class Element {
        constructor(track, animateElement, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation) {
            this.track = track,
            this.animateElement = animateElement,
            this.activClass = activClass,
            this.disableClass = disableClass,
            this.enableClass = enableClass,
            this.startDelay = startDelay,
            this.delayBetweenElement = delayBetweenElement,
            this.ratio = ratio,
            this.cycleAnimation = cycleAnimation,
            this.sensivityOffset = sensivityOffset,
            this.visibleAnimate = false,
            this.done = false
        }
        detector() {
            const track = (this.track) ? this.track: this.animateElement;
            if ((track.offsetTop - window.innerHeight + this.sensivityOffset <= window.pageYOffset * this.ratio)) {
                this.visibleAnimate = true;
            }
            if ((track.offsetTop - window.innerHeight - this.sensivityOffset > window.pageYOffset * this.ratio)) {
                this.visibleAnimate = false;
            }
        }
    }
    
    function createElement(trackElement, animateElements, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation) {
        const track = (trackElement) ? document.querySelector(`${(trackElement)}`) : false; 
        const allAnimateElement = document.querySelectorAll(`${animateElements}`);
        const arr = [];
        for (let el of allAnimateElement) {
            arr.push(new Element(track, el, activClass, disableClass, enableClass, startDelay, delayBetweenElement, ratio, sensivityOffset, cycleAnimation));
        }
        startupEnableClass(arr, enableClass);
        startupDisableClass(arr, disableClass);
        return arr;
    }

    const arrObjElement = [];

    for (let item of settingArrey) {
        arrObjElement.push(createElement(...item));
    }

    function  startupDisableClass(arrObjElement, disableClass) {
        if (disableClass) {
            removeClass(arrObjElement, disableClass);
        }
    }

    function removeClass(arrObjElement, disableClass) {
        for (item of disableClass.split(' ')) {
            arrObjElement.forEach(el => {
                if (el.animateElement.classList.contains(item)) {
                    el.animateElement.classList.remove(item);
                }
            })
        }  
    }

    function  startupEnableClass(arrObjElement, enableClass) {
        if (enableClass) {
            addClass(arrObjElement, enableClass);
        }
    }

    function addClass(arrObjElement, enableClass) {
        for (item of enableClass.split(' ')) {
            arrObjElement.forEach(el => { 
                if (!el.animateElement.classList.contains(item)) {
                    el.animateElement.classList.add(item);
                }
            })
        } 
    }
   
    function baseLogic(arrObjElement) {
        arrObjElement.forEach((item, index, arr) => {
            item.detector();
            if (item.visibleAnimate) {
                if (!item.animateElement.classList.contains(item.activClass) & !item.done) {
                    item.done = true;
                    setTimeout(() => {
                        item.animateElement.classList.add(`${item.activClass}`);
                    }, item.startDelay + delay);
                    delay += item.delayBetweenElement;
                    if (arr.length <= index + 1) {
                        delay = 0;
                    }
                }
            }
            if (!item.visibleAnimate & item.cycleAnimation) {
                if (item.animateElement.classList.contains(item.activClass)) {
                    item.done = false;
                    delay = 0;
                    item.animateElement.classList.remove(`${item.activClass}`);
                }
            }
        })
    }
    let delay = 0;
    
    return function start() {
        for (let item of arrObjElement) {
            baseLogic(item);
        }
    }
}

const animation = animationElement([ 
    [false, ".about__skill", "about__skill_animation", '', '', 0, 0, 1, 0, true], 
    [false, ".skills__item", "skills__item_animation", '', '', 0, 100, 1, 0, true], 
    [false, ".skills__rating-item", "skills__rating-item_animation", '', '', 0, 100, 1, 0, true], 
    [false, ".portfolio__item", "portfolio__item_animation", '', '', 0, 0, 1, 0, true],
    [false, ".contacts__column", "animation", '', '', 0, 0, 1, 0, true]   
]);

window.onscroll = () => {
    animation();
    backTop();
}