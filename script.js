const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const totalPrice = document.querySelector('.total-price');

const list = document.querySelector('.cart__items');

const getSum = () => {
  const li = document.querySelectorAll('.cart__item');
  let result = 0;
  li.forEach((element) => {
    result += parseFloat(element.innerHTML.split('$')[1]);
  });
  totalPrice.innerText = result;
};

const cartItemClickListener = (event) => {
  event.target.remove();
  saveCartItems(list.innerHTML);
  getSum();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  getSum();
  return li;
};

const createCartListProducts = async (item) => {
  const products = await fetchItem(item);
  const { id, title, price } = products;
  const product = {
    sku: id,
    name: title,
    salePrice: price,
  };
  list.appendChild(createCartItemElement(product));
  saveCartItems(list.innerHTML);
};

const createCustomElement = (element, className, innerText, sku) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') {
    e.addEventListener('click', () => {
      createCartListProducts(sku);
    });
  }
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));

  return section;
};

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const items = document.querySelector('.items');

const createListProducts = async () => {
  const products = await fetchProducts('computador');
  products.forEach(({ id, title, thumbnail }) => {
    const product = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    items.appendChild(createProductItemElement(product));
  });
};

const savedItems = () => {
  list.innerHTML = getSavedCartItems();
  document.querySelectorAll('.cart__item').forEach((item) => item
    .addEventListener('click', cartItemClickListener));
};

const clear = document.querySelector('.empty-cart');

const clearCart = () => {
  clear.addEventListener('click', () => {
    localStorage.clear();
    list.textContent = '';
    totalPrice.textContent = 0;
  });
};

window.onload = () => { 
  createListProducts();
  savedItems();
  clearCart();
};
