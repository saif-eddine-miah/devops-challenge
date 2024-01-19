class Cart {
  constructor() {
    this.items = [];
  }

  buy(product, quantity) {
    this.items.push({ product, quantity });
  }

  reset() {
    this.items = [];
  }

  restore(items) {
    this.items = items;
  }

  total() {
    return this.items.reduce((acc, { product, quantity }) => acc + product.getPrice() * quantity, 0);
  }
}

module.exports = Cart;
