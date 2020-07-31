export const filter = () => {
  const portfolioMenu = document.querySelector('.portfolio-menu');
  const items = portfolioMenu.querySelectorAll('li');
  const btnAll = portfolioMenu.querySelector('.all');
  const btnLovers = portfolioMenu.querySelector('.lovers');
  const btnChef = portfolioMenu.querySelector('.chef');
  const btnGirl = portfolioMenu.querySelector('.girl');
  const btnGuy = portfolioMenu.querySelector('.guy');
  const btnGrandMother = portfolioMenu.querySelector('.grandmother');
  const btnGrandDad = portfolioMenu.querySelector('.granddad');

  const portfolioWrapper = document.querySelector('.portfolio-wrapper');
  const markAll = portfolioWrapper.querySelectorAll('.all');
  const markGirl = portfolioWrapper.querySelectorAll('.girl');
  const markLovers = portfolioWrapper.querySelectorAll('.lovers');
  const markGuy = portfolioWrapper.querySelectorAll('.guy');
  const markChef = portfolioWrapper.querySelectorAll('.chef');
  const no = document.querySelector('.portfolio-no');

  const typeFilter = (markType) => {
    markAll.forEach((mark) => {
      mark.style.display = 'none';
      mark.classList.remove('animated', 'fadeIn');
    });

    no.style.display = 'none';
    no.classList.remove('animated', 'fadeIn');

    if (markType) {
      markType.forEach((mark) => {
        mark.style.display = 'block';
        mark.classList.add('animated', 'fadeIn');
      });
    } else {
      no.style.display = 'block';
      no.classList.add('animated', 'fadeIn');
    }
  };

  const bindAction = (btn, markType) => {
    btn.addEventListener('click', () => {
      typeFilter(markType);
    });
  };

  bindAction(btnAll, markAll);
  bindAction(btnLovers, markLovers);
  bindAction(btnChef, markChef);
  bindAction(btnGirl, markGirl);
  bindAction(btnGuy, markGuy);
  bindAction(btnGrandMother);
  bindAction(btnGrandDad);

  portfolioMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'LI') {
      items.forEach((item) => {
        item.classList.remove('active');
        target.classList.add('active');
      });
    }
  });
};
