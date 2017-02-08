import React from 'react';
import './LoginPage.scss';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {inputText: ''};
        this.updateState = this.updateState.bind(this);
    }

    render() {
        return (
            <div id="LoginPage">
                <h1 className="page-header">Benvenuto al Progetto Just Eat</h1>
                <section className="panel">
                    <input className="form-control" type='text' value={ this.state.inputText }
                           placeholder="inserisci il tuo nome" onChange={ this.updateState }/>
                    <button className='btn btn-primary' onClick={() => {
                        this.saveName()
                    }}> Invia
                    </button>
                </section>
            </div>
        )
    }

    updateState(event) {
        this.setState({inputText: event.target.value});
    }

    saveName() {
        if (this.state.inputText.trim()) {
            window.sessionStorage.setItem('userName', this.state.inputText);
            window.location.href = '/#/restaurants';
        }
        else {
            alert('Devi inserire il tuo nome');
        }
    }
}
