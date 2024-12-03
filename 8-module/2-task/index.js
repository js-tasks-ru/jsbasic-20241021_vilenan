import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.#render();
  }

  #template(){
    return `<div class="products-grid">
              <div class="products-grid__inner">

              </div>
            </div>`
  }

  getFilteredProducts({noNuts, vegeterianOnly, maxSpiciness, category}) {
    return this.products.filter(product => {
      if (noNuts && (product.nuts === true || ('nuts' in product))) {
        return false;
      }
      if (vegeterianOnly && product.vegeterian !== true) {
        return false;
      }
      if (maxSpiciness !== undefined && product.spiciness > maxSpiciness) {
        return false;
      }
      if (category && product.category !== category) {
        return false;
      }
      return true; // Если все условия выполнены, товар проходит фильтрацию
    });
  }
  #render(){
    this.elem = createElement(this.#template());
    this.container = this.elem.querySelector('.products-grid__inner');

    this.products.forEach(product => {
      const card = new ProductCard(product);
      this.container.append(card.elem);
    });
    return this.elem;
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    const filteredProducts = this.getFilteredProducts(filters);
    this.container.innerHTML = '';

    this.products = filteredProducts;
    filteredProducts.forEach(product => {
      const card = new ProductCard(product);
      this.container.append(card.elem);
    });
  }

}
