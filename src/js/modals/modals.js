export const modals = () => {
  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelecor, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelecor);
    const windows = document.querySelectorAll('[data-modal]');
    const scroll = calcScroll();

    trigger.forEach((item) =>
      item.addEventListener('click', (e) => {
        if (e.target) e.preventDefault();

        if (destroy) item.remove();

        btnPressed = true;

        closeWindows(windows);
        modal.style.display = 'block';
        modal.classList.add('animated', 'fadeIn');
        bodyStyle('hidden', scroll);
      })
    );

    close.addEventListener('click', (e) => {
      closeWindows(windows);
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `${0}px`;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeWindows(windows);
        modal.style.display = 'none';
        bodyStyle('');
      }
    });
  }

  function closeWindows(windows) {
    windows.forEach((item) => {
      item.style.display = 'none';
    });
  }

  function bodyStyle(overflow, scrollValue = 0) {
    document.body.style.overflow = overflow;
    document.body.style.marginRight = `${scrollValue}px`;
  }

  function showModalByTime(selector, time) {
    setTimeout(() => {
      let display = false;

      document.querySelectorAll('[data-modal]').forEach((item) => {
        if (getComputedStyle(item).display !== 'none') {
          display = true;
        }
      });

      if (!display) {
        document.querySelector(selector).style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
    }, time);
  }

  function calcScroll() {
    const div = document.createElement('div');
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.append(div);

    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  function openByScroll(selector) {
    window.addEventListener('scroll', () => {
      let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

      if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight >= scrollHeight) {
        document.querySelector(selector).click();
      }
    });
  }

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
  bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
  openByScroll('.fixed-gift');
  // showModalByTime('.popup-consultation', 60000);
};
