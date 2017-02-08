<<<<<<< HEAD
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

=======
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

>>>>>>> e40c9739b88565c3a4d0d77e7b1c8a39bd652ad8
export default App;