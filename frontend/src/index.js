"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import App from './components/App/App';
import LoginPage from './components/LoginPage/LoginPage';
import RestaurantsPage from './components/RestaurantsPage/RestaurantsPage';
import OneRestaurantPage from './components/OneRestaurantPage/OneRestaurantPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';


const cont = (
    <Router history={hashHistory}>
        <Route path="/" component={LoginPage}/>
        <Route path="/" component={App}>
            <Route path="restaurants" component={RestaurantsPage}/>
            <Route path="restaurants/:restaurant" component={OneRestaurantPage}/>
            <Route path="checkout" component={CheckoutPage}/>
        </Route>
        <Route path="*" component={() => {window.location = '/'}}/>
    </Router>
);

ReactDOM.render(cont, document.getElementById("root"));
