'use strict';

let filterPopup = document.querySelector('.filter-list');
let filterLabel = document.querySelector('.filter-btn');
let filterIcon = document.querySelector('.filterIcon');

filterLabel.addEventListener('click', function () {
    filterPopup.classList.toggle('hidden');
    filterLabel.classList.toggle('filter-btn-pink');
});

let filterHeaders = document.querySelectorAll('.filter-list-item-a');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

// кнопка корзины в меню
const cartBtnEl = document.querySelector('.page-header-cart-btn');
// место вывода количества товара в корзине 
const goodsInCartEl = document.querySelector('.page-header-cart-btn>span');
// корзина
const goodsCartEl = document.querySelector('.basket');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');

const basket = {};

cartBtnEl.addEventListener('click', event => {
    goodsCartEl.classList.toggle('hidden');
});

document.querySelector('.catalog-products').addEventListener('click', event => {
    if (!event.target.closest('.products-item-btn')) {
        return;
    }

    const addProductItem = event.target.closest('.products-item');
    const id = addProductItem.dataset.id;
    const name = addProductItem.dataset.name;
    const price = addProductItem.dataset.price;

    addToCard(id, name, price);
});

function addToCard(id, name, price) {
    if (!(id in basket)) {
        basket[id] = { id: id, name: name, price: price, count: 0 };
    }
    // Добавляем в количество +1 к продукту.
    basket[id].count++;
    // Ставим новое количество добавленных товаров у значка корзины.
    goodsInCartEl.textContent = getTotalBasketCount().toString();
    // Ставим новую общую стоимость товаров в корзине.
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    // Отрисовываем продукт с данным id.
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    let goodsInCart = 0, key;
    for (key in basket) {
        goodsInCart += parseInt(basket[key].count);
    }
    return goodsInCart;
}

function getTotalBasketPrice() {
    let sumInCart = 0, key;
    for (key in basket) {
        sumInCart += +(basket[key].count) * +(basket[key].price);
    }
    return sumInCart;
}

/**
 * Отрисовывает в корзину информацию о продукте.
 * @param {number} productId - Id продукта.
 */
function renderProductInBasket(productId) {
    // Получаем строку в корзине, которая отвечает за данный продукт.
    const basketRowEl = goodsCartEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    // Если такой строки нет, то отрисовываем новую строку.
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
        return;
    }

    // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
    // добавленных продуктах.
    const product = basket[productId];
    // Ставим новое количество в строке продукта корзины.
    basketRowEl.querySelector('.productCount').textContent = product.count;
    // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
    basketRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}

/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId - Id товара.
 */
function renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}


