const Product = require('./Product');

class InMemoryStorage {
  constructor() {
    this.data = {};
    this.productPrices = {}; // Ajout d'un tableau pour stocker les prix des produits
  }

  setValue(product, quantity) {
    this.data[product.getName()] = quantity;
    this.productPrices[product.getName()] = product.getPrice(); // Stockage du prix du produit
  }
  restore(data) {
    this.data = data;
  }

  reset() {
    this.data = {};
  }

  total() {
    const productKeys = Object.keys(this.data);
    return productKeys.reduce((acc, key) => {
      return acc + this.productPrices[key] * this.data[key];
    }, 0);
  }
}

module.exports = InMemoryStorage;
