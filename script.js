// Elementos HTML
// Container da lista de produtos.
const items = document.querySelector('.items');
// Icone do Carrinho de compras.
const cartIcon = document.querySelector('.header i');
// Container do Carrinho.
const cartContainer = document.querySelector('.cart');
// Botão de limpar o carrinho.
const clear = document.querySelector('.empty-cart');
// Elemento HTML que contem o valor total do carrinho.
const totalPrice = document.querySelector('.total-price');
// Lista dos produtos do Carrinho.
const list = document.querySelector('.cart__items');
// Cada produto do Carrinho.
const cartItem = document.querySelectorAll('.cart__item');
// --------------------------------------------------- //

// Criar um elemento HTML de imagem.
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

// Realiza a soma do valor total do carrinho.
const getSum = () => {
  let result = 0;
  cartItem.forEach((element) => {
    const priceText = element.innerHTML.split('$')[1].replace(',', '.');
    const priceValue = parseFloat(priceText);
    result += priceValue;
  });
  totalPrice.innerText = formatPrice(result);
};

// Remove um item específico do carrinho de compras quando o botão de remoção é clicado. 
const cartItemClickListener = (event) => {
  const id = event.target.className;
  const selector = `.cart__item .${id}`;
  const element = document.querySelector(selector);
  element.parentNode.remove();
  saveCartItems(list.innerHTML);
  getSum();
};

// Cria um elemento HTML conforme a especiação dos parametros - Carrinho.
const createCustomProductElement = (tag, className, innerText) => {
  const element = document.createElement(tag);
  element.className = className;
  if (className !== 'productContent') element.innerText = innerText;
  return element;
};

// Cria os componentes HTML referentes um item do carrinho.
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

// Adiciona produto no carrinho.
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

// Cria um elemento HTML conforme a especiação dos parametros - Lista de produtos
const createCustomElement = (tag, className, innerText, sku) => {
  const element = document.createElement(tag);
  element.className = className;
  element.innerText = innerText;
  if (tag === 'button') {
    element.addEventListener('click', () => {
      createCartListProducts(sku);
    });
  }
  return element;
};

// Cria os componentes HTML referentes a um produto
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

// Cria o elemento HTML referente a tela de Loading.
const createLoading = () => {
  const load = createCustomElement('p', 'loading', 'Carregando...');
  items.appendChild(load);
  return load;
};

// Remove o elemento HTML referente a tela de Loading
const removeLoanding = (loadingElements) => {
  loadingElements.forEach((loadingElement) => {
    loadingElement.remove();
  });
};

// Cria uma lista com todos os produtos
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

// Carrega os itens do carrinho salvos no 'Local Storage'
const savedItems = () => {
  list.innerHTML = getSavedCartItems();
  const buttons = document.querySelectorAll('.cart__item button');
  buttons.forEach((button) => button.addEventListener('click', cartItemClickListener));
};

// Cria a dinamica de esconder ou mostrar o carrinho
const toggleCartVisibility = () => {
  cartContainer.classList.toggle('noVisible');
  cartContainer.classList.toggle('visible');
  const isVisible = cartContainer.classList.contains('visible');
  cartIcon.textContent = isVisible ? 'highlight_off' : 'shopping_cart';
  cartIcon.classList.toggle('highlight-off-icon', isVisible);
  cartIcon.classList.toggle('shopping-cart-icon', !isVisible);
};

// Adiciona o evento 'toggleCartVisibility' ao icone do carrinho
const iconEventListener = () => {
  cartIcon.addEventListener('click', toggleCartVisibility);
};

// Limpa o carrinho
const clearCart = () => {
  clear.addEventListener('click', () => {
    localStorage.clear();
    if (list) {
      while (list.firstChild) {
        list.removeChild(list.firstChild);
      } 
    }
      getSum();
  });
};

window.onload = () => { 
  createListProducts();
  savedItems();
  clearCart();
  getSum();
  iconEventListener();
};
