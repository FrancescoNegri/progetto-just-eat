"use strict";
import React from "react";
import Navbar from '../Navbar/Navbar';
import './App.scss';

class App extends React.Component {
    render() {
        return (
            <section className="container appContainer">
                <Navbar/>
                {this.props.children}
            </section>
        );
    }
}

export default App;