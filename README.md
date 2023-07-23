# Projeto Shopping Cart - Carrinho de Compras Dinâmico

## Projeto Final
![Shopping Cart](./assets//projectImages/projetoShoppingCart.png)

## Descrição do Projeto

Projeto desenvolvido durante meu aprendizado no curso de Desenvolvimento Web da [Trybe](https://www.betrybe.com/) (Módulo: Front-end). <br>
Nesse projeto coloco em prática o que aprendi sobre JavaScript assíncrono, Fetch API, Async/Await, Jest - Testes Assíncronos.

O projeto Shopping Cart é uma aplicação que visa criar um carrinho de compras totalmente dinâmico, consumindo dados diretamente da API do Mercado Livre. Nesse projeto fazemos a busca pela categorias "computadores" e exibimos o resultado, mostrando imagem, nome e valor de cada produto.

## Funcionalidades

O projeto oferece as seguintes funcionalidades:

- Visualização dos produtos disponíveis no Mercado Livre (Computadores).
- Adição de produtos ao carrinho de compras.
- Remoção de produtos do carrinho de compras.
- Atualização automática dos preços e estoques dos produtos por meio da API.

## Desenvolvimento

O projeto foi elaborado com base no Desenvolvimento Orientado a Testes (Test Driven Development - TDD), ou seja, realizamos testes antes de implementar as funções da aplicação, de forma a assegurar a eficiência da função e prever possíveis falhas.

## Objetivos do projeto

### 1 - Desenvolver testes para cobrir 100% da função fetchProducts:

É testado se:
  
- `fetchProducts` é uma função;
- ao executar a função `fetchProducts` com o argumento `computador` se `fetch` foi chamada;
- ao chamar a função `fetchProducts` com o argumento `computador`, a função `fetch` utiliza o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=computador`;
- o retorno da função `fetchProducts` com o argumento `computador` é uma estrutura de dados igual ao objeto `computadorSearch` (arquivo já criado);
- ao chamar a função `fetchProducts` sem argumento, retorna um erro com a mensagem: `You must provide an url`.

### 2 - Criar a listagem dos produtos:

- Implementação da função `fetchProducts`;
- É utilizado o endpoint `https://api.mercadolibre.com/sites/MLB/search?q=$QUERY`, onde o valor de `$QUERY` é obrigatoriamente o termo `computador`;
- É criado a função `createListProducts`, responsável por criar a lista de produtos;
- Utilizo a função `createProductItemElement()`(função já criada) para criar os componentes HTML referentes a um produto;

### 3 - Desenvolver testes para cobrir 100% da função fetchItem:

É testado se:

- `fetchItem` é uma função;
- ao executar a função `fetchItem` com o argumento do item `MLB1615760527` se `fetch` foi chamada;
- ao chamar a função `fetchItem` com o argumento do item `MLB1615760527`, a função `fetch` utiliza o endpoint `https://api.mercadolibre.com/items/MLB1615760527`;
- o retorno da função `fetchItem` com o argumento do item `MLB1615760527` é uma estrutura de dados igual ao objeto `item` (arquivo já criado).
- ao chamar a função `fetchItem` sem argumento, retorna um erro com a mensagem: `You must provide an url`.

### 4 - Adicionar o produto ao carrinho de compras:

- Implementação da função `fetchItem`;
- É utilizado o endpoint `https://api.mercadolibre.com/items/$ItemID`, onde o valor de `$ItemID` é o `id` do produto a ser buscado;
- É criado a função `createCartListProducts`, responsável por adicionar o produto no carrinho;
- Utilizo a função `createCartItemElement()`(função já criada) para criar os componentes HTML referentes um item do carrinho;

5 - Remover o item do carrinho de compras ao clicar nele;<br>
6 - Desenvolver testes para cobrir 100% da função saveCartItems;<br>
7 - Desenvolver testes para cobrir 100% da função getSavedCartItems;<br>
8 - Carreguar o carrinho de compras através do **LocalStorage** ao iniciar a página;<br>
9 - Calcular o valor total dos itens do carrinho de compras de forma assíncrona;<br>
10 - Implementar a lógica no botão `Esvaziar Carrinho` para limpar o carrinho de compras;<br>
11 - Adicionar um texto de `carregando` durante uma requisição à API.<br>

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:
<p>
  <img src="https://www.svgrepo.com/show/452185/css-3.svg" alt="css3 logo" width="40" height="40"/>
  <img src="https://www.svgrepo.com/show/452228/html-5.svg" alt="html5 logo" width="40" height="40" margin=10px/>
  <img src="https://www.svgrepo.com/show/349419/javascript.svg" alt="javascript logo" width="40" height="40" margin=10px/>
  <img src="https://www.svgrepo.com/show/373701/jest-snapshot.svg" alt="javascript logo" width="40" height="40" margin=10px/>
</p>


- HTML, CSS e JavaScript para a criação da interface do usuário.
- A API Fetch para realizar requisições à API do Mercado Livre.
- Jest para a criação e execução dos testes automatizados.

## Demostração do funcionamento do projeto
![Shopping Cart](./assets//projectImages/projetoShoppingCart.gif)

## Como Executar o Projeto

Para executar o projeto em sua máquina local, siga as etapas abaixo:

1. Clone este repositório:
```
git clone git@github.com:mtssantos96/project-shopping-cart.git
```
2. Acesse o diretório do projeto:
```
cd project-shopping-cart
```
3. Instale as dependências do projeto `npm install`;
4. Inicie o projeto clicando no botão `Go Live` da extensão `Live Server` em seu `VS-Code`.

## Contribuição

Se você quiser contribuir para o desenvolvimento deste projeto, sinta-se à vontade para fazer um fork do repositório e enviar suas sugestões por meio de pull requests. Todas as contribuições são bem-vindas!

## Autor

O projeto Shopping Cart foi desenvolvido por [Matheus Santos](https://github.com/mtssantos96).
