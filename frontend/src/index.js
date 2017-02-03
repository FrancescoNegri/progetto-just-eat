"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import LoginPage from './components/LoginPage/LoginPage';
import RestaurantsPage from './components/RestaurantsPage/RestaurantsPage';
import OneRestaurantPage from './components/OneRestaurantPage/OneRestaurantPage';

class App extends React.Component {
    render() {
        return (
            <section className="col-xs-12 col-sm-9 col-sm-push-3 col-md-10 col-md-push-2">
                {this.props.children}
            </section>
        );
    }
}

const cont = (
    <Router history={hashHistory}>
        <div>
            <Route path="/" component={App}>
                <IndexRoute component={LoginPage}/>
                <Route path="restaurants" component={RestaurantsPage}/> 
                <Route path="restaurants/:restaurant" component={OneRestaurantPage}/> 
            </Route>
        </div>
    </Router>
);

ReactDOM.render(cont, document.getElementById("root"));
