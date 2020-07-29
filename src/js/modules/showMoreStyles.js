import { getResource } from '../services/requests';

export const showMoreStyles = (trigger, wrapperSelector) => {
  // const cards = document.querySelectorAll(styles);
  const btn = document.querySelector(trigger);
  const wrapper = document.querySelector(wrapperSelector);
  // cards.forEach((card) => card.classList.add('animated', 'fadeInUp'));

  // btn.addEventListener('click', () => {
  //   console.log('wok');
  //   cards.forEach((card) => card.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs'));
  //   cards.forEach((card) => card.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1'));
  //   btn.style.display = 'none';
  // });

  btn.addEventListener('click', (e) => {
    getResource('assets/db.json')
      .then((res) => createCards(res.styles))
      .catch((err) => {
        if (document.querySelector('.error-message')) {
          document.querySelector('.error-message').remove();
          return false;
        }

        const errMessage = document.createElement('div');
        errMessage.classList.add('error-message');
        errMessage.style.textAlign = 'center';
        errMessage.textContent = err;
        wrapper.append(errMessage);
      });

    e.target.style.display = 'none';
  });

  const createCards = (response) => {
    response.forEach(({ src, title, link }) => {
      const card = document.createElement('div');
      card.classList.add('animated', 'fadeInUp', 'col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
      card.innerHTML = `
      <div class=styles-block>
        <img src="${src}" alt="style">
        <h4>${title}</h4>
        <a href="${link}">Подробнее</a>
      </div>
      `;
      wrapper.append(card);
    });
  };
};
