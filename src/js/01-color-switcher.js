//генератор случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

//получаем ссылки на кнопки
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

//слушатели событий
startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

//переменная для хранения Id функции setInterval
let timerId = null;

//изначально блокируем нажание кнопки stop
stopBtn.disabled = true;

//обработчик события нажатия на кнопку start
function onStartBtnClick() {
  timerId = setInterval(changeBackgroundColor, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

//обработчик события нажатия на кнопку stop
function onStopBtnClick() {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

//функция изменения цвета бэкграунда
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
