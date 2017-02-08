import React from 'react';
import CartManager from '../../utilities/cartManager';
import './CheckoutPage.scss';

export default class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputText: ''};
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
                </section>
            </div>
        )
    }

    renderMyCart() {
        let cart = [];
        CartManager.getItems().map((item) => {
            console.log(item);
            const cartItem = (
                <p>{item["NAME"]}</p>
            );
            cart.push(cartItem);
        });

        return cart;
    }

    updateState(event) {
        this.setState({inputText: event.target.value});
    }
}