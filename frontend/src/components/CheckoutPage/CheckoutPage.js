import React from 'react';
import CartManager from '../../utilities/cartManager';
import 'whatwg-fetch';
import './CheckoutPage.scss';
import startupData from '../../../../shared/startupData.json';

export default class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myCart: '',
            totalPrice: window.sessionStorage.getItem('total')
        };
        this.updateState = this.updateState.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.renderMyCart = this.renderMyCart.bind(this);
    }

    render() {
        return (
            <div id="CheckoutPage">
                <h1 className="page-header">Completa il tuo ordine!</h1>
                <div className="row heading">
                    <span className="col-sm-4">Prodotto</span>
                    <span className="col-sm-4">Ristorante</span>
                    <span className="col-sm-3">Prezzo</span>
                </div>
                <hr/>
                <div className="cart">
                    {this.renderMyCart()}
                </div>
                <div className="orderRow">
                    <h3>TOTALE: {this.state.totalPrice} €</h3>
                    <button onClick={this.completeOrder} className="btn btn-primary">ORDINA
                    </button>
                </div>
            </div>
        )
    }

    deleteItem(index) {
        CartManager.deleteItem(index)
            .then((data) => {
                const {myCart, totalPrice} = data;
                console.log(totalPrice);
                this.setState({myCart, totalPrice})
            });
    }

    completeOrder() {
        const myCart = CartManager.getItems();
        const myId = window.sessionStorage.getItem('userName');
        if (myCart.length > 0) {
            const payload = {id: myId, cart: myCart};
            //Cambiare con myiP dinamico!!
            fetch('http://' + startupData['ip'] + ':4000/checkout',
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
        else {
            alert('Carrello vuoto!');
        }
    }

    renderMyCart() {
        let cart = [];

        CartManager.getItems().map((item, i) => {
            const cartItem = (
                <li key={i} className="row">
                    <span className="col-sm-4">{item["NAME"]}</span>
                    <span className="col-sm-4">{item["RESTAURANT"]}</span>
                    <span className="col-sm-3">{item["PRICE"]}</span>
                    <span className="col-sm-1 glyphicon glyphicon-trash" onClick={() => this.deleteItem(i)}/>
                </li>
            );
            cart.push(cartItem);
        });

        return (<ul className="ordersList">{cart}</ul>);
    }

    updateState(event) {
        this.setState({inputText: event.target.value});
    }
}