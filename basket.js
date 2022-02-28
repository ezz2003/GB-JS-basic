"use strict";

class Basket {
    constructor(id, product, price, count) {
        this.id = id;
        this.product = product;
        this.price = price;
        this.count = count;
        this.totalPrice = this.count * this.price;
    }
    counter() {
        this.count = this.count + 1;
    }
    totalPriceEr() {
        this.totalPrice = this.count * this.price;
    }
}

class BasketAll {
    constructor(basket, basketAll, result) {
        this.basket = basket;
        this.basketAll = basketAll;
        this.result = result;
    }

    pusher() {
        for (let i of this.basketAll) {
            if (i.id == this.basket.id) {
                i.count = i.count + 1;
                return;
            }
        }
        this.basketAll.push(this.basket);

    }

    resulter() {
        this.result = 0;
        for (let i of this.basketAll) {
            this.result = this.result + i.totalPrice;
        }
    }

}

let payAll;
let count = 0;

const elProduct = document.querySelector(".catalog-products");
const elBasketNumber = document.querySelector('.basket-number');
elProduct.addEventListener('click', event => {
    const but = event.target;
    if (but.className !== "index-products-cart-btn") {
        return;
    }
    const butC = but.parentNode;
    const pay = new Basket(
        butC.getAttribute('data-id'),
        butC.querySelector('.products-item-title').textContent,
        butC.querySelector('.products-item-price').textContent,
        1
    );
    if (!payAll) {
        payAll = new BasketAll(pay, [], 0);
    }
    payAll = new BasketAll(
        pay,
        payAll.basketAll,
        1
    )
    payAll.pusher();
    elBasketNumber.innerText = `${payAll.basketAll.length}`;
});

const elBasket = document.querySelector('.basket-icon');
const elBasketHidden = document.querySelector('.basket');
const elBasketTotalValue = document.querySelector('.basketTotalValue')
elBasket.addEventListener('click', function() {
    const elPre = document.querySelectorAll('pre');
    elPre.forEach(e => {
        e.remove();
    });

    if (payAll) {
        const elBasketRow = document.querySelector('.basket-products');
        for (let i of payAll.basketAll) {
            const prodBasNew = document.createElement('pre');
            i.totalPriceEr()
            prodBasNew.innerText = `${i.product}              ${i.price}                       ${i.count}                      ${(i.totalPrice).toFixed(2)}`;
            elBasketRow.prepend(prodBasNew);
        }
    }
    elBasketHidden.classList.toggle('hidden');
    payAll.resulter();
    elBasketTotalValue.innerText = `${payAll.result}`;


});