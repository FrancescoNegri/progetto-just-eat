import React from 'react';
import CartManager from '../../utilities/cartManager';
import 'whatwg-fetch';
import './CheckoutPage.scss';
import startupData from '../../../../shared/startupData.json';
var accounting = require('../../lib/accounting.js');

export default class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myCart: '',
            totalPrice: window.sessionStorage.getItem('total'),
            fee: 0
        };
        this.getFee();

        this.updateState = this.updateState.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.renderMyCart = this.renderMyCart.bind(this);
    }

    render() {
        this.formatMoney(Number.parseFloat(this.state.totalPrice) + Number.parseFloat(this.state.fee));
        return (
            <div id="CheckoutPage">
                <h1 className="page-header">Completa il tuo ordine!</h1>
                <div className="row heading">
                    <span className="col-sm-4" style={{fontStyle: 'italic', opacity: '0.5'}}>Prodotto</span>
                    <span className="col-sm-4" style={{fontStyle: 'italic', opacity: '0.5'}}>Ristorante</span>
                    <span className="col-sm-3" style={{fontStyle: 'italic', opacity: '0.5'}}>Prezzo</span>
                </div>
                <hr />
                <div className="cart">
                    {this.renderMyCart()}
                </div>
                <div className="orderRow">
                    <h3>
                        TOTALE: {(this.formatMoney(Number.parseFloat(this.state.totalPrice) + Number.parseFloat(this.state.fee))).replace(/€/g, '€ ')}</h3>
                    <button onClick={this.completeOrder} className="btn btn-primary">ORDINA
                    </button>
                </div>
            </div>
        )
    }

    formatMoney(value) {
        accounting.settings = {
            currency: {
                symbol: "€",   // default currency symbol is '$'
                format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
                decimal: ",",  // decimal point separator
                thousand: ".",  // thousands separator
                precision: 2   // decimal places
            },
            number: {
                precision: 0,  // default precision on numbers is 0
                thousand: ",",
                decimal: "."
            }
        }

        var out = accounting.formatMoney(value);
        return out;
    }

    getFee() {
        fetch('http://' + startupData['ip'] + ':4000/fee')
            .then((res) => {
                return res.json()
            }).then((json) => {
            this.updateState(json['fee']);
        })
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
                    <span className="col-xs-4 col-md-4">{item["NAME"]}</span>
                    <span className="col-xs-4 col-md-4">{item["RESTAURANT"]}</span>
                    <span className="col-xs-2 col-md-3">{item["PRICE"]}</span>
                    <span className="col-xs-2 col-md-1 glyphicon glyphicon-trash" onClick={() => this.deleteItem(i)}/>
                </li>
            );
            cart.push(cartItem);
        });

        const fee = (
            <li key='fee' className="row">
                <span className="col-sm-4" style={{fontStyle: 'italic', opacity: '0.5'}}>fee</span>
                <span className="col-sm-4"/>
                <span className="col-sm-3" style={{
                    fontStyle: 'italic',
                    opacity: '0.5'
                }}>{this.formatMoney(Number.parseFloat(this.state.fee)).replace(/€/g, '€ ')}</span>
            </li>
        );
        cart.push(fee);

        return (<ul className="ordersList">{cart}</ul>);
    }

    updateState(fee) {
        this.setState({fee: fee});
    }
}