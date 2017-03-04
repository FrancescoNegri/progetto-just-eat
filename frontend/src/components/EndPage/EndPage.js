'use strict';
import React from 'react';
import './EndPage.scss';
import {Link} from 'react-router';

const EndPage = () => {


    return (<section className="endPage">
        <h1 className="page-header"> Ordine Completato</h1>
        <div className="container-fluid">
            <p>Il tuo ordine è stato ricevuto con successo!</p>
        </div>

        <div>
            <Link to="restaurants" className="btn btn-primary">Torna Alla Pagina Principale</Link>
            <Link to="/" className="btn btn-primary">Torna Alla Pagina Di Login</Link>
        </div>
    </section>);

};

export default EndPage;
