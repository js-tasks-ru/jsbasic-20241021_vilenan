function initCarousel() {
      const arrowLeftEl = document.querySelector('.carousel__arrow_left'),
        arrowRightEl = document.querySelector('.carousel__arrow_right'),
        carouselInner = document.querySelector('.carousel__inner'),
        carouselSlides = document.querySelectorAll('.carousel__slide');
      const slideWidth =carouselSlides[0].offsetWidth;

      const carouselInnerWidth = carouselInner.offsetWidth;
      let currentSlide = 0;
      arrowLeftEl.style.display = 'none';

      function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        (currentSlide === 0)? arrowLeftEl.style.display = 'none' : arrowLeftEl.style.display = '';
        (currentSlide === (carouselSlides.length - 1))? arrowRightEl.style.display = 'none' : arrowRightEl.style.display = '';
      }


      arrowRightEl.addEventListener('click', () => {
        if(currentSlide < carouselSlides.length - 1)
        currentSlide ++;
        updateCarousel();
      })

      arrowLeftEl.addEventListener('click', () => {
        if(currentSlide > 0)
        currentSlide --;
        updateCarousel();
      })

  }
