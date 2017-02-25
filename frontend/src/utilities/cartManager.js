'use strict';
export default class CartManager {

    static getItems() {
        let cartItems = window.sessionStorage.getItem('cart');
        cartItems = cartItems ? JSON.parse(cartItems) : [];
        return cartItems;
    }

    static saveItem(item) {
        let items = this.getItems();
        items.push(item);
        const cart = JSON.stringify(items);
        window.sessionStorage.setItem('cart', cart);
        this.saveTotalPrice();
    }

    static saveTotalPrice() {
        let items = this.getItems();
        let total = 0;
        items.map(item => {
            const price = parseFloat(item["PRICE"].split(' ')[2].replace(',', '.'));
            total += price;
        });
        window.sessionStorage.setItem('total', total);
        return total;
    }

    static deleteItem(index) {

        const prom = new Promise(resolve => {
            let items = this.getItems();
            const newItems = items.filter((item, i) => i != index);
            window.sessionStorage.setItem('cart', JSON.stringify(newItems));
            const totalPrice = this.saveTotalPrice();
            resolve({newItems, totalPrice});
        });

        return prom;

    }

}