const Cart = require('./src/Cart');
const InMemoryStorage = require('./src/InMemoryStorage');
const Product = require('./src/Product');

const cart = new Cart();
const inMemoryStorage = new InMemoryStorage();
const product = new Product('apple', 10.5);

inMemoryStorage.setValue(product, 3);
console.log('Total avant achat :', cart.total());

cart.buy(product, 3);
console.log('Total après achat :', cart.total());

cart.reset();
console.log('Total après réinitialisation :', cart.total());

inMemoryStorage.restore({ 'apple': 3, 'orange': 2 });
console.log('Total après restauration :', cart.total());