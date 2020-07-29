import { postData } from '../services/requests';

export const forms = () => {
  const form = document.querySelectorAll('form');
  // const inputs = document.querySelectorAll('input');
  // const textarea = document.querySelectorAll('textarea');
  const upload = document.querySelectorAll('input[name="upload"]');

  const message = {
    loading: 'Загрузка...',
    succes: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так',
    spinner: 'assets/img/spinner.gif',
    ok: 'assets/img/ok.png',
    fail: 'assets/img/fail.png',
  };

  const path = {
    designer: 'assets/server.php',
    question: 'assets/question.php',
  };

  const clearInputs = (selector) => {
    const items = document.querySelectorAll(selector);

    items.forEach((item) => {
      item.value = '';
      if (item.type === 'file') item.previousElementSibling.textContent = 'Файл не выбран';
    });
  };

  upload.forEach((item) => {
    item.addEventListener('input', () => {
      const arr = item.files[0].name.split('.');

      let dots;
      arr[0].length > 6 ? (dots = '...') : (dots = '.');

      let name = arr[0].substr(0, 6);
      let format = arr[1];

      item.previousElementSibling.textContent = name + dots + format;
    });
  });

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      item.parentNode.append(statusMessage);

      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);

      let statusImg = document.createElement('img');
      statusImg.setAttribute('src', message.spinner);
      statusImg.classList.add('animated', 'fadeInUp');
      statusMessage.append(statusImg);

      let textMessage = document.createElement('div');
      textMessage.textContent = message.loading;
      statusMessage.append(textMessage);

      const formData = new FormData(item);
      let api;
      item.closest('.popup-design') || item.classList.contains('calc_form') ? (api = path.designer) : (api = path.question);
      console.log(api);

      postData(api, formData)
        .then((res) => {
          console.log(res);
          statusImg.setAttribute('src', message.ok);
          textMessage.textContent = message.succes;
        })
        .catch(() => {
          statusImg.setAttribute('src', message.fail);
          textMessage.textContent = message.failure;
        })
        .finally(() => {
          clearInputs('input');
          clearInputs('textarea');
          clearInputs('input[name="upload"]');
          setTimeout(() => {
            statusMessage.remove();
            item.style.display = 'block';
            item.classList.remove('fadeOutUp');
            item.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};
