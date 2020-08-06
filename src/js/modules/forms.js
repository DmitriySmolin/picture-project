import { postData } from '../services/requests';
import { message, statusMessage, statusImg, textMessage } from '../modules/statusMessage';
import { sendRequestInput } from './sendRequestInput';

export const forms = (state) => {
  const form = document.querySelectorAll('form');
  // const inputs = document.querySelectorAll('input');
  // const textarea = document.querySelectorAll('textarea');
  const upload = document.querySelectorAll('input[name="upload"]');

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

      if (item.closest('.file_upload.main__file_upload')) {
        sendRequestInput(item);
      }
    });
  });

  form.forEach((item) => {
    item.addEventListener('submit', (e) => {
      e.preventDefault();

      item.classList.add('animated', 'fadeOutUp');
      setTimeout(() => {
        item.style.display = 'none';
      }, 400);

      item.parentNode.append(statusMessage);

      const formData = new FormData(item);

      if (state.length !== 0) {
        for (let key in state) {
          formData.append(key, state[key]);
        }
        formData.append('result', document.querySelector('.calc-price').textContent);
      }

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
