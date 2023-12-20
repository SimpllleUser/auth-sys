import { storage } from '../../../src/services/local-storage.service';

describe('SecureLocalStorageAdapter', () => {
  const mockData = JSON.stringify({ key: 'value' });
  const mockKey = 'testKey';

  beforeEach(() => {
    storage.clear();
  });

  afterEach(() => {
    storage.clear();
  });

  it('Should set an item in local storage', () => {
    storage.setItem(mockKey, mockData);

    const storedData = storage.getItem(mockKey);

    expect(storedData).toEqual(mockData);
  });

  it('Should get an item from local storage', () => {
    storage.setItem(mockKey, mockData);

    const storedData = storage.getItem(mockKey);

    expect(storedData).toEqual(mockData);
  });

  it('Should remove an item from local storage', () => {
    storage.setItem(mockKey, mockData);
    storage.removeItem(mockKey);

    const storedData = storage.getItem(mockKey);

    expect(storedData).toBeNull();
  });

  it('Should clear all items from local storage', () => {
    storage.setItem('key1', 'value1');
    storage.setItem('key2', 'value2');
    storage.clear();

    const storedData1 = storage.getItem('key1');
    const storedData2 = storage.getItem('key2');

    expect(storedData1).toBeNull();
    expect(storedData2).toBeNull();
  });
});
