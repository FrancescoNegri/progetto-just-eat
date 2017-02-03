'use strict;'

const express = require('express');
const app = express();
const menuRender = require('./scripts/menuRender');
const dataManager = require('./scripts/dataManager.js');

const port = 4000;

//ROUTING

app.set('view engine', 'pug');

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
    console.log(dataManager.getProducts(restaurantsIDs[req.params.restaurant], categoriesIDs[req.params.restaurant + req.params.category]));
    if (categoriesIDs[req.params.restaurant + req.params.category]) {
        res.send(dataManager.getProducts(restaurantsIDs[req.params.restaurant], categoriesIDs[req.params.restaurant + req.params.category]));
    }
    else {
        res.json({ error: 404 });
    }
});

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

/*var rist = [];
rist = dataManager.getRestaurants();
console.log(rist);
var categ = dataManager.getCategoriesAndCategoriesDescriptions(rist[0]);
categ.forEach(function(c) {
    console.log(dataManager.getProducts(rist[0], c));
})*/







