export const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelecor, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    const close = document.querySelector(closeSelecor);
    const windows = document.querySelectorAll('[data-modal]');
    const scroll = calcScroll();

    trigger.forEach((item) =>
      item.addEventListener('click', (e) => {
        if (e.target) {
          closeWindows(windows);
          e.preventDefault();
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden';
          document.body.style.marginRight = `${scroll}px`;
        }
      })
    );

    close.addEventListener('click', (e) => {
      closeWindows(windows);
      modal.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.marginRight = `${0}px`;
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        closeWindows(windows);
        modal.style.display = 'none';
        document.body.style.overflow = '';
        document.body.style.marginRight = `${0}px`;
      }
    });
  }

  function closeWindows(windows) {
    windows.forEach((item) => (item.style.display = 'none'));
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

  bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
  bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

  showModalByTime('.popup-consultation', 60000);
};
