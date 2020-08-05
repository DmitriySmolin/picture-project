export const scrolling = (upSelector) => {
  const up = document.querySelector(upSelector);

  window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop > 1650) {
      up.classList.add('animated', 'fadeIn');
      up.classList.remove('fadeOut');
    } else {
      up.classList.add('animated', 'fadeOut');
      up.classList.remove('fadeIn');
    }
  });

  //Scrolling with Request Animation Frame

  const links = document.querySelectorAll('[href^="#"]');
  const speed = 0.3;

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      let widthTop = Math.round(document.body.scrollTop || document.documentElement.scrollTop);
      const hash = this.hash;
      const toBlock = document.querySelector(hash).getBoundingClientRect().top;
      let start = null;

      requestAnimationFrame(step);

      function step(time) {
        if (start === null) {
          start = time;
        }

        const progress = time - start;
        let r =
          toBlock < 0
            ? Math.max(widthTop - progress / speed, widthTop + toBlock)
            : Math.min(widthTop + progress / speed, widthTop + toBlock);

        document.documentElement.scrollTo(0, r);

        if (r !== widthTop + toBlock) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    });
  });

  //Pure js scrolling
  // const calcScroll = () => {
  //   up.addEventListener('click', function (e) {
  //     let scrollTop = Math.round(document.body.scrollTop || document.documentElement.scrollTop);
  //     console.log(this.hash);
  //     if (this.hash !== '') {
  //       e.preventDefault();
  //       let hashElement = document.querySelector(this.hash); //хэш элемент

  //       let hashElementTop = 0; //сколько нужно пролистать пикселей до родителя этого хэш элемента

  //       // hashElement.offsetParent - элемент относительно которого будет позиционироваться hashElement
  //       while (hashElement.offsetParent) {
  //         hashElementTop += hashElement.offsetTop; // hashElement.offsetTop сколько пикселей осталось до верхней границы род. элемента от хэш элем.
  //         hashElement = hashElement.offsetParent;
  //       }
  //       hashElementTop = Math.round(hashElementTop);
  //       smoothScroll(scrollTop, hashElementTop, this.hash);
  //     }
  //   });
  //   const smoothScroll = (from, to, hash) => {
  //     let timeInterval = 1;
  //     let prevScroll;
  //     let speed;

  //     to > from ? (speed = 30) : (speed = -30);

  //     let move = setInterval(() => {
  //       let scrollTop = Math.round(document.body.scrollTop || document.documentElement.scrollTop);
  //       if (prevScroll === scrollTop || (to > from && scrollTop > to) || (to < from && scrollTop < to)) {
  //         clearInterval(move);
  //         history.replaceState(history.state, document.title, location.href.replace(/#.*$/g, '') + hash);
  //       } else {
  //         document.body.scrollTop += speed;
  //         document.documentElement.scrollTop += speed;
  //         prevScroll = scrollTop;
  //       }
  //     }, timeInterval);
  //   };
  // };
  // calcScroll();
};
