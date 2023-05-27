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

// Отправка данных на сервер
// function send(event, php){
//     console.log("Отправка запроса");
//     event.preventDefault ? event.preventDefault() : event.returnValue = false;
//     var req = new XMLHttpRequest();
//     req.open('POST', php, true);
//     req.onload = function() {
//         if (req.status >= 200 && req.status < 400) {
//         json = JSON.parse(this.response); // Ебанный internet explorer 11
//             console.log(json);
            
//             // ЗДЕСЬ УКАЗЫВАЕМ ДЕЙСТВИЯ В СЛУЧАЕ УСПЕХА ИЛИ НЕУДАЧИ
//             if (json.result == "success") {
//                 // Если сообщение отправлено
//                 alert("Сообщение отправлено");
//             } else {
//                 // Если произошла ошибка
//                 alert("Ошибка. Сообщение не отправлено");
//             }
//         // Если не удалось связаться с php файлом
//         } else {alert("Ошибка сервера. Номер: "+req.status);}}; 
    
//     // Если не удалось отправить запрос. Стоит блок на хостинге
//     req.onerror = function() {alert("Ошибка отправки запроса");};
//     req.send(new FormData(event.target));
//     }