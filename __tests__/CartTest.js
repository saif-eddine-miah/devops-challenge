const Cart = require('../src/Cart');
const Product = require('../src/Product');

describe('Cart', () => {
  test('should add products to the cart', () => {
    const cart = new Cart();
    const product = new Product('apple', 10.5);

    cart.buy(product, 3);

    expect(cart.items).toHaveLength(1);
    expect(cart.items[0].product).toEqual(product);
    expect(cart.items[0].quantity).toEqual(3);
  });

  test('should reset the cart', () => {
    const cart = new Cart();
    const product = new Product('apple', 10.5);
    cart.buy(product, 3);

    cart.reset();

    expect(cart.items).toHaveLength(0);
  });

  test('should restore products to the cart', () => {
    const cart = new Cart();
    const product = new Product('apple', 10.5);
    cart.buy(product, 3);

    const cart2 = new Cart();
    cart2.restore(cart.items);

    expect(cart2.items).toHaveLength(1);
    expect(cart2.items[0].product).toEqual(product);
    expect(cart2.items[0].quantity).toEqual(3);
  });

  test('should calculate the total price of the cart', () => {
    const cart = new Cart();
    const apple = new Product('apple', 10.5);
    const orange = new Product('orange', 7.5);
    cart.buy(apple, 3);
    cart.buy(orange, 2);

    const total = cart.total();

    expect(total).toEqual(10.5 * 3 + 7.5 * 2);
  });
});
