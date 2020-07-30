export const calc = (size, material, options, promocode, result) => {
  const sizeBlock = document.querySelector(size);
  const materialBlock = document.querySelector(material);
  const optionsBlock = document.querySelector(options);
  const promocodeBlock = document.querySelector(promocode);
  const resultBlock = document.querySelector(result);

  let sum = 0;

  const calcFunc = () => {
    sum = Math.round(+sizeBlock.value * +materialBlock.value + +optionsBlock.value);

    if (sizeBlock.value && materialBlock.value === '') {
      resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
    } else if (promocodeBlock.value === 'IWANTPOPART') {
      resultBlock.textContent = Math.round(sum * 0.7);
    } else {
      resultBlock.textContent = sum;
    }
  };

  const addEventForElem = (elem, event = 'change') => {
    elem.addEventListener(event, calcFunc);
  };

  addEventForElem(sizeBlock);
  addEventForElem(materialBlock);
  addEventForElem(optionsBlock);
  addEventForElem(promocodeBlock, 'input');
};
