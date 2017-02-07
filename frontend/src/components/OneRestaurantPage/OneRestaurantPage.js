import React from 'react';
import Collapsible from 'react-collapsible';
import 'whatwg-fetch';
import './OneRestaurantPage.scss';


export default class OneRestaurantPage extends React.Component {
    constructor(props) {
        console.log(props.params.restaurant);

        super(props);
        this.state = {
            restaurantID: props.params.restaurant,
            products: {}
        }
        this.updateState = this.updateState.bind(this);
        this.getMenu(props.params.restaurant)
    }

    getMenu(restaurantID) {
        fetch('http://localhost:4000/restaurants/' + restaurantID + '/menu')
            .then((res) => {
                return res.json()
            }).then((json) => {
                this.updateState(restaurantID, json)
            })
    }

    addProductToMyCart(product) {
        alert('Ho aggiunto ' + product['NAME'] + ' al tuo carello!');
    }

    updateState(restaurantID, products) {
        this.setState({ restaurantID: restaurantID, products: products });
    }

    render() {
        var categoriesComponent = Object.keys(this.state.products).map((category) => {
            var cat = this.state.products[category];
            cat = cat[0];

            //CREARE I VARI DIV FATTI BENE

            return (
                <Collapsible className="menuCard-category" trigger={cat['CATEGORY']}>
                    <div clssName="menuCard-category-description">{cat['CATEGORY DESCRIPTION']}</div>
                    {this.state.products[category].map((product) => {
                        return (
                            <div className="menu-product">
                                <div className="product-title">{product['NAME']}</div>
                                <div className="product-description">{product['DESCRIPTION']}</div>
                                <div className="product-price">{product["PRICE"]}</div>
                                <button
                                    onClick={() => {
                                        this.addProductToMyCart(product);
                                    }
                                }
                                >
                                    +
                                </button>
                            </div>
                        )
                    })}
                </Collapsible>
            )
        })

        return (
            <section id="OneRestaurantPage">
                {categoriesComponent}
            </section>
        );
    }
}