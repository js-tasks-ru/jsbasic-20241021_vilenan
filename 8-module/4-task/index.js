import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal;
  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    const existingCartItem = this.cartItems.find(item => item.product.id === product.id);

    if(existingCartItem) {
      existingCartItem.count += 1;
    } else {
      const newCartItem = {
        product: product,
        count: 1
      };
      this.onProductUpdate(existingCartItem);
      this.cartItems.push(newCartItem);
    }
  }

  updateProductCount(productId, amount) {
    const updateCartItem = this.cartItems.find(item => item.product.id === productId);

    if (updateCartItem) {
      updateCartItem.count += amount;

      if (updateCartItem.count <= 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
        this.modal.elem.querySelector(`[data-product-id="${productId}"]`).remove();
      }

      this.onProductUpdate(updateCartItem);
    }
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((total, item) => total + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.count, 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    let modal = new Modal();
    this.modal = modal;
    modal.setTitle('Your order');
    const modalBody = document.createElement('div');

    this.cartItems.forEach(({product, count}) => {
      const productCard = this.renderProduct(product, count);
      const buttonMinus = productCard.querySelector('.cart-counter__button_minus');
      const buttonPlus = productCard.querySelector('.cart-counter__button_plus');

      buttonMinus.addEventListener('click', (evt) => {
        const clickedProduct = evt.target.closest('.cart-product');
        const clickedProductId = clickedProduct.dataset.productId;
        const clickedProductAmount = parseInt(clickedProduct.querySelector('.cart-counter__count').textContent);
        this.updateProductCount(clickedProductId,-1);
      });

      buttonPlus.addEventListener('click', (evt) => {
        const clickedProduct = evt.target.closest('.cart-product');
        const clickedProductId = clickedProduct.dataset.productId;
        const clickedProductAmount = parseInt(clickedProduct.querySelector('.cart-counter__count').textContent);
        this.updateProductCount(clickedProductId, 1);
      })
      modalBody.append(productCard);
    });

    const modalForm = this.renderOrderForm();
    modalBody.append(modalForm);

    modal.setBody(modalBody);
    const form = this.modal.elem.querySelector('.cart-form');

    form.addEventListener('submit', (event) => {
      this.onSubmit(event);
    })
    modal.open();
  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);

      if(document.body.classList.contains('is-modal-open')) {

        if(!this.getTotalCount()) {
          this.modal.close();
          return;
        }

        let productId = cartItem.product.id;
        let productCount = this.modal.elem.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let productPrice = this.modal.elem.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let infoPrice = this.modal.elem.querySelector(`.cart-buttons__info-price`);

        if(productCount) productCount.innerHTML = cartItem.count;

        if(productPrice) productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;

        if(infoPrice) infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
      }
  }

  async onSubmit(event) {
    event.preventDefault();
    const submitButton = this.modal.elem.querySelector('button[type="submit"]');
    submitButton.classList.add('is-loading');

    try {
      const formData = new FormData(event.target);
      let response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: formData
      })

        if (response.ok) {
          this.modal.setTitle('Success!');
          this.modal.setBody(createElement(`<div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>`));

          this.cartItems = [];
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

