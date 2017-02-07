import React from 'react';
import 'whatwg-fetch';
import './RestaurantsPage.scss';

export default class RestaurantsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { restaurants: [] }
        this.updateState = this.updateState.bind(this);

        this.getRestaurants();
    }

    getRestaurants() {
        fetch('http://localhost:4000/restaurants')
            .then((res) => {
                return res.json()
            }).then((json) => {
                console.log('parsed json', json)
                this.updateState(json);
            })
    }

    updateState(restaurants) {
        this.setState({ restaurants: restaurants });
        console.log(this.state);
    }

    render() {
        var restaurantsComponents = this.state.restaurants.map((restaurant) => {
            console.log('Rendering...', restaurant);
            return (
                <div className="restaurantPanel">
                    <button
                        className="restaurantButton"
                        key={restaurant}
                        onClick={() => { this.onButtonClick(restaurant) }}
                    >
                        {restaurant}
                    </button>
                </div>
            )
        })

        return (
            <section id="RestaurantsPage">
                {restaurantsComponents}
            </section>
        )
    }

    onButtonClick(restaurant) {
        window.location.href = '/#/restaurants/' + this.normalizeName(restaurant);
    }

    normalizeName(restaurant) {
        var outR = restaurant.replace(/\s/g, '');
        outR = outR.toLowerCase();
        return outR;
    }
}