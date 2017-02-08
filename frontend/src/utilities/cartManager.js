'use strict';
class CartManager {

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
    }

    static deleteItem(id) {

    }

}

export default CartManager;