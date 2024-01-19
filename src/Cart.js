const mysql = require('mysql2/promise');

class MySQLStorage {
    constructor(dbConfig) {
        this.connection = mysql.createConnection(dbConfig);
    }

    async setValue(productName, total) {
        await this.connection.execute('INSERT INTO in_memory_storage (product_name, total) VALUES (?, ?)', [productName, total]);
    }

    async restore(productName) {
        await this.connection.execute('DELETE FROM in_memory_storage WHERE product_name = ?', [productName]);
    }

    async reset() {
        await this.connection.execute('DELETE FROM in_memory_storage');
    }

    async total() {
        const [result] = await this.connection.query('SELECT SUM(total) as total FROM in_memory_storage');
        return result[0].total || 0;
    }

    async close() {
        await this.connection.end();
    }
}

module.exports = MySQLStorage;
