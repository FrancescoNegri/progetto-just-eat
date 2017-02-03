import React from 'react';
import 'whatwg-fetch';

class OneRestaurantPage extends React.Component {
    constructor(props) {
        console.log(props.params.restaurant);
        
        super(props);
        this.state = { restaurantID: props.params.restaurant }
        //this.updateState = this.updateState.bind(this);
    }

    render() {
        return (
            <p> {this.state.restaurantID} </p>
        );
    }
}

export default OneRestaurantPage;