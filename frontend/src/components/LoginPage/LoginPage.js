import React from 'react';
import axios from 'axios';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { inputText: 'Nome' };
        this.updateState = this.updateState.bind(this);
    }

    render() {
        return (
            <div>
                <input className='loginInput' type='text' value={ this.state.inputText } onChange={ this.updateState } />
                <button className='sendButton' onClick={() => {this.saveName()}} />
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