import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const { delay, step, amount } = evt.currentTarget;

  let dalayPromise = Number(delay.value);

for (let i = 1; i <= amount.value; i++) {
   createPromise(i, dalayPromise).then(onResolve).catch(onRejected);
dalayPromise += Number(step.value);
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
      if (shouldResolve) {
    resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }
    reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}
function onResolve(result) {
  Notify.success(result);
}

function onRejected(error) {
  Notify.failure(error);
}
