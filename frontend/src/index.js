"use strict";
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory, hashHistory} from "react-router";
import LoginPage from './components/LoginPage/LoginPage';
import RestaurantsPage from './components/RestaurantsPage/RestaurantsPage';
import OneRestaurantPage from './components/OneRestaurantPage/OneRestaurantPage';
import CheckoutPage from './components/CheckoutPage/CheckoutPage';

class App extends React.Component {
    render() {
        return (
            <section className="container">
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
                <Route path="checkout" component={CheckoutPage}/>
            </Route>
        </div>
    </Router>
);

ReactDOM.render(cont, document.getElementById("root"));

/*const routes = [{
  path: '/',
  component: App,
  indexRoute: LoginPage,
  childRoutes: [
    { path: 'restaurants', component: RestaurantsPage }
  ]
}]

ReactDOM.render((<Router history={browserHistory} routes={routes} />), document.getElementById("root"));*/
