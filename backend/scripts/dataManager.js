"use strict"

var menu = require('../menu.json');
const items = menu['ITEMS'];

module.exports = class DataManager {
    
    
    static getRestaurants() {
        var restaurants = [];

        items.forEach((item) => {
            restaurants.push(item['RESTAURANT']);
        })
        var restaurants = restaurants.filter(function(elem, pos) {
            return restaurants.indexOf(elem) == pos;
        })

        return restaurants;
    };

    static getCategoriesAndCategoriesDescriptions(restaurant) {
        var categories = [];

        items.forEach((item) => {
            if (item['RESTAURANT'] == restaurant) {
            var temp = {'CATEGORY': item['CATEGORY'], 'CATEGORY DESCRIPTION': item['CATEGORY DESCRIPTION']};
            
                if (categories.length == 0)  categories.push(temp);
                else {
                    if (!arrayContainsObject(categories, temp)) {
                        categories.push(temp);
                    }
                }
            }
                
        }, this); 

        return categories;
    }

    static getProducts(restaurant, category) {
        var products = [];

        items.forEach((item) => {
            if (item['RESTAURANT'] == restaurant) {
                if (category !== undefined) {
                    if (item['CATEGORY'] == category['CATEGORY']) {
                        products.push(item);
                    }
                }
                else {
                    products.push(item);
                }
                
            }
        })

        return products;
    }

    static getNormalizedCategoriesAndProducts(restaurant) {
        var output = {};
        var categories = this.getCategoriesAndCategoriesDescriptions(restaurant);

        categories.forEach((category) => {
            var products = this.getProducts(restaurant, category);
            var categoryID = category['CATEGORY'].replace(/\s/g, '');
            categoryID = categoryID.toLowerCase();
            output[categoryID] = [];

            products.forEach((product) => {
                output[categoryID].push(product);
            })
        }, this);

        return output;
    }
};


//UTILITY FUNCTIONS

var arrayContainsObject = (arr, obj) => {
    var out;
    arr.forEach(function(item) {
        if (jsonEqual(item, obj)) {
            out = true;
        }
    }, this);
    if (!out) {out = false};

    return out;
}


function jsonEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
