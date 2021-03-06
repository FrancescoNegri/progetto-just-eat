import React from 'react';
import Collapsible from 'react-collapsible';
import 'whatwg-fetch';
import CartManager from '../../utilities/cartManager';
import './OneRestaurantPage.scss';
import startupData from '../../../../shared/startupData.json';


export default class OneRestaurantPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantID: props.params.restaurant,
            products: {},
            orderCount: 0
        };
        this.updateState = this.updateState.bind(this);
        this.renderCategories = this.renderCategories.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
    }

    //evento richiamato dopo il mounting dell'elemento sulla pagina
    //è best practise fare qui le chiamate ajax per il render iniziale
    componentDidMount() {
        this.getMenu(this.props.params.restaurant);
    }

    getMenu(restaurantID) {
        fetch('http://' + startupData['ip'] + ':4000/restaurants/' + restaurantID + '/menu')
            .then((res) => {
                return res.json()
            }).then((json) => {
            this.updateState(restaurantID, json)
        })
    }

    addProductToMyCart(product) {
        CartManager.saveItem(product);
        const oldState = this.state;
        oldState.orderCount += 1;
        this.setState(oldState);
    }

    updateState(restaurantID, products) {
        this.setState({restaurantID, products});
    }

    render() {

        return (
            <section id="OneRestaurantPage">
                <h1 className="page-header">Seleziona i Prodotti</h1>
                {this.renderCategories()}
                {this.renderAlert()}
            </section>
        );
    }

    renderAlert() {
        if (this.state.orderCount > 0) {
            return (
                <p className="alert-success" onClick={ () => window.location = '/#/checkout'}>
                    <p> {this.state.orderCount}
                        {(this.state.orderCount == 1) ? " Nuovo Elemento Aggiunto " : " Nuovi Elementi Aggiunti "}
                        Al Carrello</p>
                </p>)
        }
        return null;
    }

    renderCategories() {
        let categories = [];

        Object.keys(this.state.products).map((category, i) => {
            let cat = this.state.products[category];
            cat = cat[0];

            //CREARE I VARI DIV FATTI BENE
            let item = (
                <article key={i}>
                    <Collapsible className="menuCard-category" trigger={cat['CATEGORY']}>
                        <div className="menuCard-category-description">{cat['CATEGORY DESCRIPTION']}</div>
                        {this.renderProducts(category)}
                    </Collapsible>
                    <hr/>
                </article>);
            categories.push(item);
        });

        return categories;
    }

    renderProducts(category) {

        let products = [];

        this.state.products[category].map((product, j) => {
            const prod = (
                <div className="menu-product row" key={j}>
                    <div className="col-xs-6 col-md-10">
                        <div className="product-title">{product['NAME']}</div>
                        <div className="product-description">{product['DESCRIPTION']}</div>
                    </div>
                    <span className="product-price col-xs-4 col-md-1">{product["PRICE"]}</span>
                    <span className="btn btn-success col-xs-1" onClick={() => this.addProductToMyCart(product)}>
                            <span className="glyphicon glyphicon-plus"/>
                    </span>
                </div>
            );
            products.push(prod);
        });

        return products;

    }
}