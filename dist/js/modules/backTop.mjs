const backTop = function() { 
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

export default backTop;