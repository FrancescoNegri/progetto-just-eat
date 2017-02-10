'use strict;'

const express = require('express');
const app = express();
const menuRender = require('./scripts/menuRender');
const dataManager = require('./scripts/dataManager.js');
const bodyParser = require('body-parser');
const ip = require('ip');
const fs = require('fs');
const accounting = require('./lib/accounting.js');

const port = 4000;

//ROUTING

app.set('view engine', 'pug');

app.use(bodyParser.text());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();


    console.log(datetime, '- Request:', req.method, '-', req.url);

    next();
});


app.get('/', (req, res) => {
    res.render('index', { title: 'TEST', message: 'Benvenuto nel nostro test!' });
});

app.get('/restaurants', (req, res) => {
    //res.render('restaurants', {restaurantList : dataManager.getRestaurants()});
    res.send(dataManager.getRestaurants());
});

app.get('/restaurants/:restaurant', (req, res) => {
    res.send(dataManager.getCategoriesAndCategoriesDescriptions(restaurantsIDs[req.params.restaurant]));
});

app.get('/restaurants/:restaurant/categories', (req, res) => {
    res.send(dataManager.getCategoriesAndCategoriesDescriptions(restaurantsIDs[req.params.restaurant]));
});

app.get('/restaurants/:restaurant/categories/:category', (req, res) => {
    //console.log(dataManager.getProducts(restaurantsIDs[req.params.restaurant], categoriesIDs[req.params.restaurant + req.params.category]));
    if (categoriesIDs[req.params.restaurant + req.params.category]) {
        res.send(dataManager.getProducts(restaurantsIDs[req.params.restaurant], categoriesIDs[req.params.restaurant + req.params.category]));
    }
    else {
        res.json({ error: 404 });
    }
});

app.get('/restaurants/:restaurant/menu', (req, res) => {
    //console.log(dataManager.getProducts(restaurantsIDs[req.params.restaurant], categoriesIDs[req.params.restaurant + req.params.category]));
    if (restaurantsIDs[req.params.restaurant]) {
        res.send(dataManager.getNormalizedCategoriesAndProducts(restaurantsIDs[req.params.restaurant]));
    }
    else {
        res.json({ error: 404 });
    }
});

app.post('/checkout', (req, res) => {
    order = JSON.parse(req.body);
    //console.log(order);

    //SALVARE L'ORDINE CARICATO IN UN'APPOSITA CARTELLA TIPO SCONTRINO
    var currentdate = new Date();
    var datetime = currentdate.getDate() + ""
        + (currentdate.getMonth() + 1) + ""
        + currentdate.getFullYear() + "-"
        + currentdate.getHours()
        + currentdate.getMinutes()
        + currentdate.getSeconds() + "-";


    const fee = 5;

    var bill = {};
    var total = 0;
    var cart = [];
    order["cart"].forEach((item) => {
        obj = { PRODUCT: item['NAME'], PRICE: item['PRICE'] };
        cart.push(obj);
        num = (item['PRICE'].trim().replace('€', ""));
        total += parseFloat(num.replace(',', '.').replace(' ', ''));
    });
    bill['CLIENT'] = order['id'];
    bill['CART'] = cart;
    accounting.settings = {
        currency: {
            symbol: "€",   // default currency symbol is '$'
            format: "%s%v", // controls output: %s = symbol, %v = value/number (can be object: see below)
            decimal: ",",  // decimal point separator
            thousand: ".",  // thousands separator
            precision: 2   // decimal places
        },
        number: {
            precision: 0,  // default precision on numbers is 0
            thousand: ",",
            decimal: "."
        }
    }
    bill['FEE'] = accounting.formatMoney(fee).toString();
    bill['TOTAL'] = accounting.formatMoney(total + fee).toString();
    fs.writeFile("./bills/" + datetime + order['id'] + '.json', JSON.stringify(bill), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("Saved order by", order['id'] + '!');
    });

    //RESPONSE
    res.setHeader('Content-Type', 'application/json')
    res.json = { message: "Ordine caricato correttamente!" };
    res.end();
})

app.get('/menu', (req, res) => {
    menuRender(res);
})

app.all('*', (req, res) => {
    res.sendfile('./src/notfound.json');
})

app.listen(port, () => {
    console.log('Server listening on port ' + port.toString());
})

//END ROUTING

//GENERATE RESTAURANT and CATEGORIES ASSOCIATION & IDs
var restaurantsIDs = {};
var categoriesIDs = {};

dataManager.getRestaurants().forEach(function (restaurant) {
    var outR = restaurant.replace(/\s/g, '');
    outR = outR.toLowerCase();
    restaurantsIDs[outR] = restaurant;

    dataManager.getCategoriesAndCategoriesDescriptions(restaurant).forEach(function (category) {
        var outC = category['CATEGORY'].replace(/\s/g, '');
        outC = outC.toLowerCase();
        categoriesIDs[outR + outC] = category;
    });
});

fs.writeFile("../myIp.txt", ip.address().toString(), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("My IP is:", ip.address());
});
/*var rist = [];
rist = dataManager.getRestaurants();
console.log(rist);
var categ = dataManager.getCategoriesAndCategoriesDescriptions(rist[0]);
categ.forEach(function(c) {
    console.log(dataManager.getProducts(rist[0], c));
})*/







