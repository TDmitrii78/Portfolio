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

export default animationElement;