var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("start-game-btn")[0];

span.onclick = function () {
    modal.style.display = "none";
}

// Когда пользователь кликает в любое место за пределами модального окна, закрыть его
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Показать модальное окно при загрузке страницы
window.onload = function () {
    modal.style.display = "block";
}

// Когда пользователь кликает на Enter, закрыть окно приветствия 
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        var modal = document.getElementById('myModal');
        if (modal.style.display === 'block') { // Проверьте, что модальное окно открыто
            modal.style.display = 'none'; // Закрыть модальное окно
        }
    }
});
