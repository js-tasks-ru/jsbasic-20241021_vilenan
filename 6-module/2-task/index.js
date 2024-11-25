import createElement from '../../assets/lib/create-element.js';
export default class ProductCard {
  elem = null;
  constructor(product) {
    this.product = product;
    this.elem = this.#render();
  }
  #template() {
    return `
     <div class="card">
      <div class="card__top">
        <img src="" class="card__image" alt="product">
        <span class="card__price"></span>
      </div>
      <div class="card__body">
        <div class="card__title"></div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>
    `
  }
  #render() {
    this.elem = createElement(this.#template());
    this.elem.querySelector('.card__image').src = `/assets/images/products/${this.product.image}`;
    this.elem.querySelector('.card__title').textContent = this.product.name;
    this.elem.querySelector('.card__price').textContent = `€${this.product.price.toFixed(2)}`;
    const button = this.elem.querySelector('.card__button');
    button.addEventListener('click', () => {
      let event = new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true
      });
      this.elem.dispatchEvent(event);
    })
    return this.elem;
  }
}
