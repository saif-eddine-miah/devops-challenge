const Product = require('../src/Product');

describe('Product', () => {
  test('should get the name of the product', () => {
    const product = new Product('apple', 10.5);

    expect(product.getName()).toEqual('apple');
  });

  test('should get the price of the product', () => {
    const product = new Product('apple', 10.5);

    expect(product.getPrice()).toEqual(10.5);
  });

  test('should set the name of the product', () => {
    const product = new Product('apple', 10.5);
    product.setName('orange');

    expect(product.getName()).toEqual('orange');
  });

  test('should set the price of the product', () => {
    const product = new Product('apple', 10.5);
    product.setPrice(7.5);

    expect(product.getPrice()).toEqual(7.5);
  });
});
