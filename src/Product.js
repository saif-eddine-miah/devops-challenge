class Product {
  constructor(name, price) {
      this.name = name;
      this.price = price;
  }

  getName() {
      return this.name;
  }

  setName(name) {
      this.name = name;
  }

  setPrice(price) {
      this.price = price;
  }

  getPrice() {
      return this.price;
  }
}

module.exports = Product;