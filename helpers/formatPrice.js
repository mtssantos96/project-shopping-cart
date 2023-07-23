const formatPrice = (price) => {
  let newPrice = String(price);

  if (newPrice.includes('.')) {
    const decimalPart = newPrice.split('.')[1];
    if (decimalPart.length === 1) {
      newPrice += '0';
    }
  } else if (!newPrice.includes(',')) {
    newPrice += ',00';
  }

  newPrice = parseFloat(newPrice.replace(',', '.'))
    .toFixed(2).replace('.', ',');
  return `R$ ${newPrice}`;
};

if (typeof module !== 'undefined') {
  module.exports = {
    formatPrice,
  };
}
