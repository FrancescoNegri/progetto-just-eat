<<<<<<< HEAD
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

=======
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

>>>>>>> e40c9739b88565c3a4d0d77e7b1c8a39bd652ad8
export default CartManager;