const InMemoryStorage = require('../src/InMemoryStorage');
const Cart = require('../src/Cart');
const Product = require('../src/Product');

describe('InMemoryStorage', () => {
  test('should set value in storage', () => {
    const storage = new InMemoryStorage();
    const apple = new Product('apple', 10.5);

    storage.setValue(apple.getName(), 3);
    expect(storage.getStorage()).toHaveProperty(apple.getName());
    expect(storage.getStorage()[apple.getName()]).toEqual(3);

    storage.setValue(apple.getName(), 2);
    expect(storage.getStorage()).toHaveProperty(apple.getName());
    expect(storage.getStorage()[apple.getName()]).toEqual(5); // 3 + 2
  });

  test('should restore products from storage', () => {
    const storage = new InMemoryStorage();
    const cart = new Cart(storage);
    const apple = new Product('apple', 10.5);
    cart.buy(apple, 3);

    cart.restore(apple);

    expect(storage.getStorage()).not.toHaveProperty(apple.getName());
  });

  test('should reset the storage', () => {
    const storage = new InMemoryStorage();
    const apple = new Product('apple', 10.5);
    storage.setValue(apple.getName(), 3);

    storage.reset();

    expect(storage.getStorage()).toEqual({});
  });

  test('should calculate the total price from storage', () => {
    const storage = new InMemoryStorage();
    const cart = new Cart(storage);
    const apple = new Product('apple', 10.5);
    const orange = new Product('orange', 7.5);
    cart.buy(apple, 3);
    cart.buy(orange, 2);

    const total = storage.total();

    expect(total).toEqual(
      3 * apple.getPrice() * (1 + cart.tva) +
        2 * orange.getPrice() * (1 + cart.tva)
    );
  });
});
