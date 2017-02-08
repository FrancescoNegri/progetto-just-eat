import React from 'react';
import './CheckoutPage.scss';

export default class CheckoutPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputText: ''};
        this.updateState = this.updateState.bind(this);
    }

    render() {
        return (
            <div id="CheckoutPage">
                <h1 className="page-header">Completa il tuo ordine!</h1>
                <section className="panel">
                    
                </section>
            </div>
        )
    }

    updateState(event) {
        this.setState({inputText: event.target.value});
    }
}