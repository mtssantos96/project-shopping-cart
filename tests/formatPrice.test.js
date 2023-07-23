const { formatPrice } = require('../helpers/formatPrice');

describe('Testes para a função formatPrice', () => {
  test('formatPrice formata preço com casas decimais corretamente', () => {
    expect(formatPrice(10)).toBe('R$ 10,00');
    expect(formatPrice(10.5)).toBe('R$ 10,50');
    expect(formatPrice(10.05)).toBe('R$ 10,05');
  });

  test('formatPrice formata preço sem casas decimais corretamente', () => {
    expect(formatPrice(10.0)).toBe('R$ 10,00');
  });

  test('formatPrice não formata preço que já possui duas casas decimais', () => {
    expect(formatPrice(10.55)).toBe('R$ 10,55');
  });

  test('formatPrice não formata preço que já possui vírgula', () => {
    expect(formatPrice('10,50')).toBe('R$ 10,50');
  });

  test('formatPrice retorna string formatada corretamente', () => {
    expect(typeof formatPrice(10)).toBe('string');
    expect(typeof formatPrice(10.5)).toBe('string');
  });
});
