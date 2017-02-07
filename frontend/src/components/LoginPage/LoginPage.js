import React from 'react';
import './LoginPage.scss';

class LoginPage extends React.Component {
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
        //Salvare in locale il nome del cliente --> il nome lo mando all'API solamente al momento della conferma ordine
        console.log('Button pressed');
        window.location.href = '/#/restaurants';


        /*
         axios.get('http://localhost:4000/restaurants/' + this.state.inputText)
           .then(function (res) {
             console.log(res.data);
           })
           .catch(function (error) {
             console.log(error);
           });

         */
    }
}

export default LoginPage;