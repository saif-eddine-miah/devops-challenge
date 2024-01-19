const mysql = require('mysql2/promise');

class MySQLStorage {
  constructor(dbConfig) {
    this.dbConfig = {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'cart_database',
    };
    this.connection = null;
  }

  async getConnection() {
    try {
      if (!this.connection) {
        this.connection = await mysql.createConnection(this.dbConfig);
      }
      return this.connection;
    } catch (error) {
      console.error(
        'Erreur lors de la connexion à la base de données :',
        error.message
      );
      throw error;
    }
  }

  async initializeDatabase() {
    try {
      const connection = await this.getConnection();

      // Crée la base de données et utilise la connexion
      await connection.execute('CREATE DATABASE IF NOT EXISTS cart_database;');
      await connection.execute('USE cart_database;');

      // Crée la table pour stocker les valeurs (products)
      await connection.execute(`
        CREATE TABLE IF NOT EXISTS products (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          price DECIMAL(10, 2) NOT NULL
        );
      `);

      console.log('Base de données initialisée avec succès.');
    } catch (error) {
      console.error(
        "Erreur lors de l'initialisation de la base de données :",
        error.message
      );
    }
  }

  async setValue(productName, value) {
    try {
      const connection = await this.getConnection();
      await connection.execute(
        'INSERT INTO in_memory_storage (product_id, quantity) VALUES ' +
          '((SELECT id FROM products WHERE name = ?), ?) ' +
          'ON DUPLICATE KEY UPDATE quantity = VALUES(quantity);',
        [productName, value]
      );
      console.log('Valeur ajoutée avec succès.');
    } catch (error) {
      console.error("Erreur lors de l'ajout de la valeur :", error.message);
    }
  }

  async restore() {
    try {
      const connection = await this.getConnection();
      // Récupère toutes les valeurs depuis la table products
      const [rows] = await connection.execute('SELECT * FROM products;');
      return rows;
    } catch (error) {
      console.error('Erreur lors de la restauration :', error.message);
    }
  }

  async reset() {
    try {
      const connection = await this.getConnection();
      await connection.execute('DELETE FROM in_memory_storage;');
      console.log('Base de données réinitialisée avec succès.');
    } catch (error) {
      console.error(
        'Erreur lors de la réinitialisation de la base de données :',
        error.message
      );
    }
  }

  async total() {
    try {
      const connection = await this.getConnection();
      const [rows] = await connection.query(
        'SELECT SUM(quantity) as total FROM in_memory_storage;'
      );
      return rows[0].total || 0;
    } catch (error) {
      console.error('Erreur lors du calcul du total :', error.message);
      return 0;
    }
  }

  async close() {
    // Ferme la connexion à la base de données
    if (this.connection) {
      await this.connection.end();
    }
  }
}

module.exports = MySQLStorage;
