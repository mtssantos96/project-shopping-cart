const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  it('Ao ser chamada, o método "localStorage.setItem" é chamado', () => {

    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it('Ao ser chamada, o método "localStorage.setItem" é chamado com o parâmetro "cartItens"', () => {

    getSavedCartItems();

    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });
});
