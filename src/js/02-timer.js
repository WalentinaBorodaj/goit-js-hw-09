import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';

//ссылки на элементы html
const refs = {
  inputArea: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  daysField: document.querySelector('span[data-days]'),
  hoursField: document.querySelector('span[data-hours]'),
  minutesField: document.querySelector('span[data-minutes]'),
  secondsField: document.querySelector('span[data-seconds]'),
};

refs.startBtn.disabled = true;
let isCorrectDate = false;
let difference = null;

//объект опций для конструктора flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    difference = selectedDates[0] - options.defaultDate;
    if (difference > 0) {
      refs.startBtn.disabled = false;
      isCorrectDate = true;
    } else {
      notifyFailure('Please choose a date in the future');
    }
  },
};

//инициализация flatpickr
flatpickr(refs.inputArea, options);

//слушатель нажатий на кнопку start
refs.startBtn.addEventListener('click', onStartBtnClick);

//функция при нажатии на кнопку start
function onStartBtnClick() {
  console.log('Start timer');
  startTimer();
  refs.startBtn.disabled = true;
}

//функция оповещения о выборе неправильной даты
function notifyFailure(msg) {
  Notify.failure(msg, {
    position: 'center-center',
    timeout: 1000,
    pauseOnHover: false,
  });
}

//функция оповещения что таймер завершил работу!)
function successMsg(msg) {
  Report.success('Success', msg, 'Okay');
}

//функция стартует timer
function startTimer() {
  const intervalID = setInterval(() => {
    difference -= 1000;
    if (difference < 0) {
      stopTimer(intervalID);
      successMsg('Timer stopped successfully !!!))). Please reload the page.');
      return;
    }
    showTimer(convertMs(difference));
  }, 1000);
}

//функция останавливает timer
function stopTimer(id) {
  clearInterval(id);
  console.log('Stop timer');
}

//отрисовка значений таймера на странице
function showTimer({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = days;
  refs.hoursField.textContent = hours;
  refs.minutesField.textContent = minutes;
  refs.secondsField.textContent = seconds;
}

//добавление "0" перед значениями от 1...9
function pad(value) {
  return String(value).padStart(2, '0');
}

/*Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.*/
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}