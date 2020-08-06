export const message = {
  loading: 'Загрузка...',
  succes: 'Спасибо! Скоро мы с вами свяжемся',
  failure: 'Что-то пошло не так',
  spinner: 'assets/img/spinner.gif',
  ok: 'assets/img/ok.png',
  fail: 'assets/img/fail.png',
};

export let statusMessage = document.createElement('div');
statusMessage.classList.add('status');

export let statusImg = document.createElement('img');
statusImg.setAttribute('src', message.spinner);
statusImg.classList.add('animated', 'fadeInUp');
statusMessage.append(statusImg);

export let textMessage = document.createElement('div');
textMessage.textContent = message.loading;
statusMessage.append(textMessage);
