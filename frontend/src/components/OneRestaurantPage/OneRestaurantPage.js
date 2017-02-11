import React from 'react';
import Collapsible from 'react-collapsible';
import 'whatwg-fetch';
import CartManager from '../../utilities/cartManager';
import './OneRestaurantPage.scss';
import startupData from '../../../../shared/startupData.json';


export default class OneRestaurantPage extends React.Component {

    constructor(props) {
        console.log(props.params.restaurant);
        super(props);
        this.state = {
            restaurantID: props.params.restaurant,
            products: {}
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
        alert('elemento salvato nel carrelo');
    }

    updateState(restaurantID, products) {
        this.setState({restaurantID, products});
    }

    render() {

        return (
            <section id="OneRestaurantPage">
                <h1 className="page-header">Seleziona i Prodotti</h1>
                {this.renderCategories()}
            </section>
        );
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
                <div className="menu-product" key={j}>
                    <div className="product-title">{product['NAME']}</div>
                    <div className="product-description">{product['DESCRIPTION']}</div>
                    <div className="product-price">{product["PRICE"]}</div>
                    <button onClick={() => this.addProductToMyCart(product)}>+</button>
                </div>
            );
            products.push(prod);
        });

        return products;

    }
}