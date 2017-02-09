import React from 'react';
import CartManager from '../../utilities/cartManager';
import 'whatwg-fetch';
import './CheckoutPage.scss';

export default class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { myCart: '' };
        this.updateState = this.updateState.bind(this);
    }

    render() {
        return (
            <div id="CheckoutPage">
                <h1 className="page-header">Completa il tuo ordine!</h1>
                <section className="panel">
                    <div className="cart">
                        {this.renderMyCart()}
                    </div>
                    <button onClick={() => { this.completeOrder() }}>ORDINA</button>
                </section>
            </div>
        )
    }

    completeOrder() {
        var myCart = CartManager.getItems();
        var myId = window.sessionStorage.getItem('userName');

        var payload = { id: myId, cart: myCart };

        fetch('http://192.168.1.74:4000/checkout',
            {
                method: 'POST',
                body: JSON.stringify(payload)
            })
            .then((res) => {
                if (res.status == 200) {
                    alert('Ordine inviato correttamente!');
                    //FARE COSE, TIPO APRIRE PAGINA DI CONFERMA ORDINE
                }
            })
    }

    renderMyCart() {
        let cart = [];
        CartManager.getItems().map((item) => {
            const cartItem = (
                <p>{item["NAME"]}</p>
            );
            cart.push(cartItem);
        });

        return cart;
    }

    updateState(event) {
        this.setState({ inputText: event.target.value });
    }
}