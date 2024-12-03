export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return; // Если product равен null или не передан, выходим из метода
    }
    // Ищем товар в корзине по id
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
    // Ищем товар в корзине по id
    const updateCartItem = this.cartItems.find(item => item.product.id === productId);

    if (updateCartItem) {
      // Обновляем количество товара
      updateCartItem.count += amount;

      // Если количество стало 0 или меньше, удаляем товар из корзины
      if (updateCartItem.count <= 0) {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

