import React from 'react';
import 'whatwg-fetch';

class RestaurantsPage extends React.Component {
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
                //console.log('parsed json', json)
                this.updateState(json);
            })
    }

    updateState(restaurants) {
        this.setState({ restaurants: restaurants });
    }

    render() {
        var restaurantsComponents = this.state.restaurants.map((restaurant) => {
            return
            <li>
                <button
                    className="restaurant"
                    key={restaurant}
                    onClick={() => { this.onButtonClick(restaurant) }}
                >
                    {restaurant}
                </button>
            </li>;
        })

        return <ul> {restaurantsComponents}</ul>;
    }

    onButtonClick(restaurant) {
        var outR = restaurant.replace(/\s/g, '');
        outR = outR.toLowerCase();

        window.location.href = '/#/restaurants/' + outR;
    }
}

export default RestaurantsPage;