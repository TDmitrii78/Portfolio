const ratingCalc = function() {
    const skillsRating = document.querySelectorAll('.skills__rating-item-value');
    skillsRating.forEach((el) => {
        el.nextElementSibling.firstElementChild.style.width = el.textContent;;
    })
}

export default ratingCalc;