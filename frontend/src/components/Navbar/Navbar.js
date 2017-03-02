import React from 'react';
import './Navbar.scss';

export default class Navbar extends React.Component {

    render() {
        return (
            <div id="navbar" className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" data-toggle="collapse" data-target=".navbar-collapse"
                                className="navbar-toggle">
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className='navbar-brand' href='/'>{window.sessionStorage.getItem('userName')}</a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="#/restaurants">
                                    <span>Ristoranti</span>
                                    <p className="glyphicon glyphicon-cutlery"/>
                                </a>
                            </li>
                            <li>
                                <a href="#/checkout">
                                    <span>Carrello</span>
                                    <p className="glyphicon glyphicon-shopping-cart"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}
