'use strict';

import React from 'react';
import 'whatwg-fetch';
import './RestaurantsPage.scss';
import startupData from '../../../../shared/startupData.json';

export default class RestaurantsPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {restaurants: []};
        this.updateState = this.updateState.bind(this);
        this.renderRestaurants = this.renderRestaurants.bind(this);
    }

    //evento richiamato dopo il mounting dell'elemento sulla pagina
    //è best practise fare qui le chiamate ajax per il render iniziale
    componentDidMount() {
        this.getRestaurants();
    }

    //RENDERING
    render() {
        return (
            <section id="RestaurantsPage">
                <h1 className="page-header">Seleziona il Ristorante</h1>
                <section className="restaurantsSection row">
                    {this.renderRestaurants()}
                </section>
            </section>
        )
    }

    renderRestaurants() {
        let restaurants = [];

        this.state.restaurants.map((restaurant) => {
            restaurants.push(
                <div className="restaurantPanel col-md-4" key={restaurant}>
                    <button
                        className="restaurantButton"
                        key={restaurant}
                        onClick={() => {
                            this.onButtonClick(restaurant)
                        }}>
                        {restaurant}
                    </button>
                </div>
            )
        });

        return restaurants;
    }
    //FINE RENDERING

    getRestaurants() {
        fetch('http://' + startupData['ip'] + ':4000/restaurants')
            .then((res) => {
                return res.json()
            }).then((json) => {
            this.updateState(json);
        })
    }

    updateState(restaurants) {
        this.setState({restaurants: restaurants});
    }

    onButtonClick(restaurant) {
        window.location.href = '/#/restaurants/' + this.normalizeName(restaurant);
    }

    normalizeName(restaurant) {
        let outR = restaurant.replace(/\s/g, '');
        return outR.toLowerCase();
    }

}