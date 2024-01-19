class InMemoryStorage {
  constructor() {
      this.storage = {};
  }

  setValue(name, price) {
      if (this.storage.hasOwnProperty(name)) {
          this.storage[name] += price;
      } else {
          this.storage[name] = price;
      }
  }

  restore(name) {
      if (!(name in this.storage)) {
          throw new Error(`Product ${name} not found`);
      }

      delete this.storage[name];
  }

  reset() {
      this.storage = {};
  }

  total() {
      return Object.values(this.storage).reduce((acc, price) => acc + price, 0);
  }

  getStorage() {
      return this.storage;
  }
}

module.exports = InMemoryStorage;