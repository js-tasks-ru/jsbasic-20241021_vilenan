import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.elem = this.#renderModal();
    this.elem.querySelector('.modal__close').addEventListener('click', () => this.close());
    this.handleKeydown = (event) => {
      if (event.code === 'Escape') {
        this.close();
      }
    }
  }
  #template(){
    return `
     <div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>
    </div>`
  }

  #renderModal(){
    const rootEl = createElement(this.#template());
    return rootEl;
  }

  open(){
    document.body.appendChild(this.elem);
    document.body.classList.add('is-modal-open');
    window.addEventListener('keydown', this.handleKeydown)
  }
  close(){
    if (document.body.contains(this.elem)) {
        document.body.removeChild(this.elem);
    }
    window.removeEventListener('keydown', this.handleKeydown);
    document.body.classList.remove('is-modal-open');
  }

  setTitle(title){
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(node){
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(node);
  }
}
