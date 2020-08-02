export const accordion = (triggersSelector, itemsSelector) => {
  const btns = document.querySelectorAll(triggersSelector);

  const blocks = document.querySelectorAll(itemsSelector);

  // blocks.forEach((block) => block.classList.add('animated', 'fadeInDown'));

  // btns.forEach((btn) => {
  //   btn.addEventListener('click', function () {
  //     blocks.forEach((block) => block.classList.remove('active'));

  //     if (!this.classList.contains('active', 'active-style')) {
  //       btns.forEach((btn) => btn.classList.remove('active', 'active-style'));
  //       this.classList.add('active', 'active-style');
  //     }

  //   this.nextElementSibling.classList.add('active');
  //   });
  // });

  btns.forEach((btn) =>
    btn.addEventListener('click', function () {
      this.classList.toggle('active-style');
      this.nextElementSibling.classList.toggle('active-content');

      if (this.classList.contains('active-style')) {
        btns.forEach((btn) => btn.classList.remove('active-style'));
        blocks.forEach((block) => block.classList.remove('active-content'));

        this.classList.add('active-style');
        this.nextElementSibling.classList.add('active-content');
        this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + 'px';
      } else {
        this.nextElementSibling.style.maxHeight = '0px';
      }
    })
  );
};
