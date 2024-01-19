const Cart = require('./src/Cart');
const MySQLStorage = require('./src/MySQLStorage');
const Product = require('./src/Product');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'cart_database'
};

const storage = new MySQLStorage(dbConfig);
const cart = new Cart(storage);
const product = new Product('apple', 10.5);

(async () => {
  try {
    await storage.reset(); // Réinitialise la base de données avant de commencer
    await storage.setValue(product.getName(), 3); // Ajoute quelques produits à la base de données
    console.log('Total avant achat :', cart.total());

    cart.buy(product, 3);
    console.log('Total après achat :', cart.total());

    cart.reset();
    console.log('Total après réinitialisation :', cart.total());

    await storage.restore(product.getName(), 3); // Restaure quelques produits de la base de données
    console.log('Total après restauration :', cart.total());
  } finally {
    await storage.close(); // Assurez-vous de fermer la connexion à la base de données
  }
})();
