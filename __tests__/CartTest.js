const Cart = require('../src/Cart');
const InMemoryStorage = require('../src/InMemoryStorage');
const Product = require('../src/Product');

describe('Cart', () => {
  test('should add product to cart', () => {
    const storage = new InMemoryStorage();
    const cart = new Cart(storage);

    const apple = new Product('apple', 10.5);
    cart.buy(apple, 3);

    expect(storage.getStorage()).toHaveProperty(apple.getName());
    expect(storage.getStorage()[apple.getName()]).toEqual(3 * apple.getPrice() * (1 + cart.tva));
  });

  test('should reset the cart', () => {
    const storage = new InMemoryStorage();
    const cart = new Cart(storage);

    const apple = new Product('apple', 10.5);
    cart.buy(apple, 3);
    cart.reset();

    expect(storage.getStorage()).toEqual({});
  });

  test('should restore the cart', () => {
    const storage = new InMemoryStorage();
    const cart = new Cart(storage);

    const apple = new Product('apple', 10.5);
    cart.buy(apple, 3);
    cart.restore(apple);

    expect(storage.getStorage()).not.toHaveProperty(apple.getName());
  });

  test('should calculate the total price in cart', () => {
    const storage = new InMemoryStorage();
    const cart = new Cart(storage);

    const apple = new Product('apple', 10.5);
    const orange = new Product('orange', 7.5);

    cart.buy(apple, 3);
    cart.buy(orange, 2);

    const total = cart.total();

    expect(total).toEqual(3 * apple.getPrice() * (1 + cart.tva) + 2 * orange.getPrice() * (1 + cart.tva));
  });
});
