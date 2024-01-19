const InMemoryStorage = require('../src/InMemoryStorage');
const Product = require('../src/Product');

describe('InMemoryStorage', () => {
  test('should set value in storage', () => {
    const storage = new InMemoryStorage();
    const product = new Product('apple', 10.5);

    storage.setValue(product, 3);

    expect(storage.data).toHaveProperty(product.getName());
    expect(storage.data[product.getName()]).toEqual(3);
  });

  test('should restore products from storage', () => {
    const storage = new InMemoryStorage();
    const product = new Product('apple', 10.5);
    storage.setValue(product, 3);

    const storage2 = new InMemoryStorage();
    storage2.restore(storage.data);

    expect(storage2.data).toHaveProperty(product.getName());
    expect(storage2.data[product.getName()]).toEqual(3);
  });

  test('should reset the storage', () => {
    const storage = new InMemoryStorage();
    const product = new Product('apple', 10.5);
    storage.setValue(product, 3);

    storage.reset();

    expect(storage.data).toEqual({});
  });

  test('should calculate the total price from storage', () => {
    const storage = new InMemoryStorage();

    const apple = new Product('apple', 10.5);
    const orange = new Product('orange', 7.5);

    storage.setValue(apple, 3);
    storage.setValue(orange, 2);

    const total = storage.total();

    expect(total).toEqual(10.5 * 3 + 7.5 * 2);
  });
});
