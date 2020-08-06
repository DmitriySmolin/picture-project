import { statusImg, statusMessage, textMessage, message } from './statusMessage';
import { postData } from '../services/requests';

export const sendRequestInput = (input) => {
  input.classList.add('animated', 'fadeOutUp');
  setTimeout(() => {
    input.style.display = 'none';
    document.querySelector('.file_upload.main__file_upload button').style.display = 'none';
  }, 400);

  statusImg.style.width = '35px';

  input.parentNode.append(statusMessage);

  const objData = {
    name: input.files[0].name,
    size: input.files[0].size,
    type: input.files[0].type,
  };

  const formData = new FormData();

  for (let key in objData) {
    formData.append(key, objData[key]);
  }

  postData('assets/server.php', formData)
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
      input.previousElementSibling.textContent = 'Файл не выбран';
      input.classList.remove('animated', 'fadeOutUp');
      setTimeout(() => {
        statusMessage.remove();
        input.style.display = 'block';
        document.querySelector('.file_upload.main__file_upload button').style.display = 'block';
      }, 5000);
    });
};
