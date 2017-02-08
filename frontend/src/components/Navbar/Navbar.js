<<<<<<< HEAD
'use strict';
import React from 'react';
import './NavBar.scss';

class Navbar extends React.Component {

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
                                <a href="#">
                                    <p className="glyphicon glyphicon-shopping-cart"></p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default Navbar;
=======
'use strict';
import React from 'react';
import './NavBar.scss';

class Navbar extends React.Component {

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
                                <a href="#">
                                    <p className="glyphicon glyphicon-shopping-cart"></p>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}

export default Navbar;
>>>>>>> e40c9739b88565c3a4d0d77e7b1c8a39bd652ad8
