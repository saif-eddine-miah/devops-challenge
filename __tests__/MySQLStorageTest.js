const MySQLStorage = require('../src/MySQLStorage'); // Assurez-vous de fournir le bon chemin
const mysql = require('mysql2/promise');

describe('MySQLStorage', () => {
  let mySQLStorage;

  beforeAll(async () => {
    mySQLStorage = new MySQLStorage({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'cart_database',
    });

    await mySQLStorage.initializeDatabase();
  });

  afterAll(async () => {
    await mySQLStorage.close();
  });

  describe('testSetValue', () => {
    test('should set a value in the storage', async () => {
      await mySQLStorage.setValue('key', 'value');
      const storedValue = await mySQLStorage.getValue('key');
      expect(storedValue).toBe('value');
    });
  });

  describe('testRestore', () => {
    test('should restore the storage to a previous state', async () => {
      const previousState = { key1: 'value1', key2: 'value2' };

      await mySQLStorage.restore(previousState);

      const value1 = await mySQLStorage.getValue('key1');
      const value2 = await mySQLStorage.getValue('key2');

      expect(value1).toBe('value1');
      expect(value2).toBe('value2');
    });
  });

  describe('testReset', () => {
    test('should reset the storage to an empty state', async () => {
      await mySQLStorage.reset();

      const isEmpty = await mySQLStorage.isEmpty();
      expect(isEmpty).toBe(true);
    });
  });

  describe('testTotal', () => {
    test('should calculate the total quantity in the storage', async () => {
      await mySQLStorage.setValue('product1', 5);
      await mySQLStorage.setValue('product2', 3);
      const totalQuantity = await mySQLStorage.total();

      expect(totalQuantity).toBe(8);
    });
  });
});
