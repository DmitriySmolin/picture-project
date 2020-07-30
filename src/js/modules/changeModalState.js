export const changeModalState = (state) => {
  const selectSize = document.querySelectorAll('#size');
  const selectMaterial = document.querySelectorAll('#material');
  const selectOptions = document.querySelectorAll('#options');
  const inputPromocode = document.querySelectorAll('.promocode');

  function bindActionToElems(elem, event, prop) {
    elem.forEach((item, i) => {
      item.addEventListener(event, function () {
        switch (item.tagName) {
          case 'SELECT':
            if (item.getAttribute('id') === 'size') state[prop] = getBodyOption('#size option');
            if (item.getAttribute('id') === 'material') state[prop] = getBodyOption('#material option');
            if (item.getAttribute('id') === 'options') state[prop] = getBodyOption('#options option');
            break;
          case 'INPUT':
            if (item.getAttribute('class') === 'promocode') state[prop] = item.value;
            break;
        }
        console.log(state);
      });
    });
  }

  bindActionToElems(selectSize, 'change', 'size');
  bindActionToElems(selectMaterial, 'change', 'material');
  bindActionToElems(selectOptions, 'change', 'options');
  bindActionToElems(inputPromocode, 'input', 'promocode');

  function getBodyOption(selector) {
    for (let i = 0; i < document.querySelectorAll(selector).length; i++) {
      if (document.querySelectorAll(selector)[i].selected == true) {
        return document.querySelectorAll(selector)[i].innerHTML;
      }
    }
  }

  // bindActionToElems(calcPrice, 'change', 'result');
};
