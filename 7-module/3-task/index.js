import createElement from '../../assets/lib/create-element.js';
export default class StepSlider {
  steps = 0;
  value = 0;
  elem = null;

  constructor({ steps, value = 0 }) {
    this.steps = steps || this.steps;
    this.value = value || this.value;
    this.elem = this.#renderSlider();
    this.segments = this.steps - 1;
    this.leftPercents = value / this.segments * 100;
    this.#init();

// вешаем события клика на корневой элемент
    this.elem.addEventListener('click', (evt) => {
      const left = evt.offsetX;
      this.#updateSlider(left);
    });
  }
  #init(){
    const sliderValue = this.elem.querySelector('.slider__value');
    sliderValue.textContent = this.value;
    const sliderSteps = this.elem.querySelector('.slider__steps');
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    sliderSteps.children[this.value].classList.add('slider__step-active');
    thumb.style.left = `${this.leftPercents}%`;
    progress.style.width = `${this.leftPercents}%`;
  }
  #updateSlider(left){
    const sliderWidth = this.elem.offsetWidth;
    const sliderValue = this.elem.querySelector('.slider__value');
    const sliderSteps = this.elem.querySelector('.slider__steps');
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    let leftRelative = left / sliderWidth;
    let approximateValue = leftRelative * this.segments;
    let value = Math.round(approximateValue);
    sliderValue.textContent = value;
    let leftPercents = value / this.segments * 100;
    for (const step of sliderSteps.children) {
      if(step.classList.contains('slider__step-active')){
        step.classList.remove('slider__step-active');
      }
    }
    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    // генерируем событие
    let event = new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    });
    this.elem.dispatchEvent(event);
  }

  #template(){
    return `<div class="slider">

    <div class="slider__thumb" style="left: 50%;">
      <span class="slider__value"></span>
    </div>

    <div class="slider__progress" style="width: 50%;"></div>

    <div class="slider__steps">
    </div>
  </div>`
  }
  #renderSlider(){
    this.elem = createElement(this.#template());
    const stepsContainerEl = this.elem.querySelector('.slider__steps');
    this.stepsContainer = stepsContainerEl;
    for (let i= 0; i < this.steps; i++) {
      const stepEl = document.createElement('span');
      stepsContainerEl.append(stepEl);
    }
    return this.elem;
  }



}
