import createElement from '../../assets/lib/create-element.js';
import categories from "./categories.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.#renderRibbon();
    this.innerEl = this.elem.querySelector('.ribbon__inner');
    const arrowLeftEl = this.elem.querySelector('.ribbon__arrow_left');
    const arrowRightEl = this.elem.querySelector('.ribbon__arrow_right');
    this.arrowLeftEl = arrowLeftEl;
    this.arrowRightEl = arrowRightEl;

    this.arrowRightEl.addEventListener('click', () => {
      this.innerEl.scrollBy(350,0);

    });

    this.arrowLeftEl.addEventListener('click', () => {
      this.innerEl.scrollBy(-350,0);
    });

// Добавляем обработчик события scroll
    this.innerEl.addEventListener('scroll', () => {
      this.#update();
    });
    this.activeCategoryId = '';
  }
  //разметка корневого элемента
  #templateRoot(){
    return `<div class="ribbon">
              <button class="ribbon__arrow ribbon__arrow_left">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
              </button>
              <nav class="ribbon__inner">
              </nav>
              <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
                <img src="/assets/images/icons/angle-icon.svg" alt="icon">
              </button>
            </div>`
  }
  #linkTemplate(){
    return `
    <a href="#" class="ribbon__item" data-id="on-the-side ribbon__item_active">On the side</a>
    `
  }
  #renderLink({id, name}){
    const linkEl = createElement(this.#linkTemplate());
    linkEl.dataset.id = id;
    linkEl.textContent = name;
    linkEl.addEventListener('click', (evt) => {
      evt.preventDefault();
      const previousActiveCategory = this.elem.querySelector('.ribbon__item_active');
      if(previousActiveCategory) previousActiveCategory.classList.remove('ribbon__item_active');
      this.activeCategoryId = id;
      const newActiveCategory = this.elem.querySelector(`[data-id='${this.activeCategoryId}']`);
      if(newActiveCategory) newActiveCategory.classList.add('ribbon__item_active');

      let event = new CustomEvent('ribbon-select', {
        detail: id,
        bubbles: true
      });
      this.elem.dispatchEvent(event);
    })
    return linkEl;
  }
  #renderRibbon(){
    const rootEl = createElement(this.#templateRoot());
    const innerEl = rootEl.querySelector('.ribbon__inner');
    this.innerEl = innerEl;
    this.categories.forEach(category => {
      const categoryEl = this.#renderLink(category);
      innerEl.append(categoryEl);
    });
    return rootEl;
  }

  #update(){
    const scrollWidth = this.innerEl.scrollWidth;
    const scrollLeft = this.innerEl.scrollLeft;
    const clientWidth = this.innerEl.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    if(scrollLeft === 0) {
      this.arrowLeftEl.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowLeftEl.classList.add('ribbon__arrow_visible');
    }

    if(scrollRight < 1){
      this.arrowRightEl.classList.remove('ribbon__arrow_visible');
    } else {
      this.arrowRightEl.classList.add('ribbon__arrow_visible');
    }
  }
}
