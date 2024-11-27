import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  elem = null;

  constructor(slides) {
    this.slides = slides;
    this.elem = this.#renderSlides();
    this.currentSlide = 0;

    this.corouselInner = this.elem.querySelector('.carousel__inner');

    this.arrowLeftEl = this.elem.querySelector('.carousel__arrow_left');
    this.arrowRightEl = this.elem.querySelector('.carousel__arrow_right');
    this.arrowLeftEl.style.display = 'none';
    this.carouselSlides = this.elem.querySelectorAll('.carousel__slide');

    this.currentSlide = 0;
    this.arrowRightEl.addEventListener('click', () => {
      if(this.currentSlide < this.carouselSlides.length - 1)
        this.currentSlide ++;
      this.updateCarousel();
    })
    this.arrowLeftEl.addEventListener('click', () => {
      if(this.currentSlide > 0)
        this.currentSlide --;
      this.updateCarousel();
    })
  }

  #template(){
    return `<div class="carousel__slide" data-id="penang-shrimp">
      <img src="" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€<!--значение slide.price--></span>
          <div class="carousel__title"><!--значение slide.name--></div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
    </div>`
  }

  #templateRoot(){
    return `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>

      <div class="carousel__inner">
      </div>
    </div>
    `}

  #renderSlide({name, price, image, id}){
    const slideEl = createElement(this.#template());
    slideEl.querySelector('.carousel__title').textContent = name;
    slideEl.querySelector('.carousel__price').textContent = `€${price.toFixed(2)}`;
    slideEl.querySelector('.carousel__img').src = `/assets/images/carousel/${image}`;
    slideEl.dataset.id = id;
    const button = slideEl.querySelector('.carousel__button');
    button.addEventListener('click', () => {
      let event = new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      });
      this.elem.dispatchEvent(event);
    });
    return slideEl;
  }

  #renderSlides(){
    const rootEl = createElement(this.#templateRoot());
    const innerEl = rootEl.querySelector('.carousel__inner');

    this.slides.forEach(slide => {
      const slideEl = this.#renderSlide(slide);
      innerEl.append(slideEl);
    });
    return  rootEl;
  }

  updateCarousel() {
    const slideWidth = this.corouselInner.offsetWidth;
    this.corouselInner.style.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    (this.currentSlide === 0)? this.arrowLeftEl.style.display = 'none' : this.arrowLeftEl.style.display = '';
    (this.currentSlide === (this.carouselSlides.length - 1))? this.arrowRightEl.style.display = 'none' : this.arrowRightEl.style.display = '';
  }
}
