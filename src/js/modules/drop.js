import { sendRequestInput } from './inputRequest';

export const drop = () => {
  //drag *
  //dragend *
  //dragenter - объект над dropArea
  //dragexit *
  //dragleave - объект за пределами dropArea
  //dragover - объект зависает над dropArea
  //dragstart *
  //drop - объект отправлен в dropArea

  const fileInputs = document.querySelectorAll('[name="upload"]');

  ['dragenter', 'dragleave', 'dragover', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, preventDefaults, false);
    });
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(item) {
    item.closest('.file_upload').style.border = '5px solid yellow';
    item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0,.7)';
  }

  function unhighlight(item) {
    item.closest('.file_upload').style.border = 'none';

    if (item.closest('.calc_form')) item.closest('.file_upload').style.backgroundColor = '#fff';
    else item.closest('.file_upload').style.backgroundColor = '#ededed';

    if (item.closest('.file_upload.main__file_upload')) item.closest('.file_upload.main__file_upload').style.backgroundColor = '#f7e7e6';
  }

  ['dragenter', 'dragover'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => highlight(input), false);
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    fileInputs.forEach((input) => {
      input.addEventListener(eventName, () => unhighlight(input), false);
    });
  });

  fileInputs.forEach((input) => {
    input.addEventListener('drop', (e) => {
      input.files = e.dataTransfer.files;
      const arr = input.files[0].name.split('.');

      let dots;
      arr[0].length > 6 ? (dots = '...') : (dots = '.');

      let name = arr[0].substr(0, 6);
      let format = arr[1];

      input.previousElementSibling.textContent = name + dots + format;

      if (input.closest('.file_upload.main__file_upload')) {
        sendRequestInput(input);
      }
    });
  });
};
