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
    const priceText = element.innerHTML.split('$')[1].replace(',', '.');
    const priceValue = parseFloat(priceText);
    result += priceValue;
  });
  totalPrice.innerText = formatPrice(result);
};

const cartItemClickListener = (event) => {
  const id = event.target.className;
  const selector = `.cart__item .${id}`;
  const element = document.querySelector(selector);
  element.parentNode.remove();
  saveCartItems(list.innerHTML);
  getSum();
};

const createCustomProductElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  if (className !== 'productContent') e.innerText = innerText;
  return e;
};

const createCartItemElement = ({ image, sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(image));
  const textContainer = li.appendChild(createCustomProductElement('div', 'productContent'));
  textContainer.appendChild(createCustomProductElement('p', 'productName', name));
  const formattedPrice = formatPrice(salePrice);
  textContainer.appendChild(createCustomProductElement('p', 'productPrice', formattedPrice));
  const button = li.appendChild(createCustomProductElement('button', sku, 'X'));
  button.addEventListener('click', cartItemClickListener);
  return li;
};

const createCartListProducts = async (item) => {
  const products = await fetchItem(item);
  const { id, title, price, thumbnail } = products;
  const product = {
    image: thumbnail,
    sku: id,
    name: title,
    salePrice: price,
  };
  list.appendChild(createCartItemElement(product));
  saveCartItems(list.innerHTML);
  getSum();
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

const createProductItemElement = ({ sku, name, image, price }) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  const formattedPrice = formatPrice(price);
  section.appendChild(createCustomElement('span', 'item__price', formattedPrice));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!', sku));
  return section;
};

const items = document.querySelector('.items');

const createLoading = () => {
  const load = createCustomElement('p', 'loading', 'Carregando...');
  items.appendChild(load);
  return load;
};

const removeLoanding = (loadingElements) => {
  loadingElements.forEach((loadingElement) => {
    loadingElement.remove();
  });
};

const createListProducts = async () => {
  const loadingElements = [];
  for (let i = 0; i < 8; i) {
    const loadingElement = createLoading();
    i += 1;
    loadingElements.push(loadingElement);
  }
  const products = await fetchProducts('computador');
  removeLoanding(loadingElements);
  products.results.forEach(({ id, title, thumbnail, price }) => {
    const product = { sku: id, name: title, image: thumbnail, price };
    items.appendChild(createProductItemElement(product));
  });
};

const savedItems = () => {
  list.innerHTML = getSavedCartItems();
  const buttons = document.querySelectorAll('.cart__item button');
  buttons.forEach((button) => button.addEventListener('click', cartItemClickListener));
};

const cartContainer = document.querySelector('.cart');
const cartIcon = document.querySelector('.header i');

const toggleCartVisibility = () => {
  cartContainer.classList.toggle('noVisible');
  cartContainer.classList.toggle('visible');
  if (cartContainer.classList.contains('visible')) {
    cartIcon.textContent = 'highlight_off';
    cartIcon.classList.add('highlight-off-icon');
    cartIcon.classList.remove('shopping-cart-icon');
  } if (cartContainer.classList.contains('noVisible')) {
    cartIcon.textContent = 'shopping_cart';
    cartIcon.classList.add('shopping-cart-icon');
    cartIcon.classList.remove('highlight-off-icon');
  }
};

const iconEventListener = () => {
  cartIcon.addEventListener('click', toggleCartVisibility);
};

const clear = document.querySelector('.empty-cart');

const clearCart = () => {
  clear.addEventListener('click', () => {
    localStorage.clear();
    list.innerText = '';
    totalPrice.innerText = 'R$ 0,00';
  });
};

window.onload = () => { 
  createListProducts();
  savedItems();
  clearCart();
  getSum();
  iconEventListener();
};
