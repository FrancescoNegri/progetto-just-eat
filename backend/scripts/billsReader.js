"use strict";

const fs = require('fs');
const path = require('path');

module.exports = class BillsReader {
    static readFiles(dirname, onFileContent, onError, callback) {
        fs.readdir(dirname, function (err, filenames) {
            if (err) {
                onError(err);
                return;
            }

            var itemsProcessed = 0;

            filenames.forEach(function (filename) {
                fs.readFile(path.join(dirname, filename), function (err, content) {
                    if (err) {
                        onError(err);
                        return;
                    }
                    onFileContent(filename, content);
                    itemsProcessed++;
                    if (itemsProcessed === filenames.length) callback();
                });
            });
        });
    }

    static storeData(callback) {
        var data = {};
        this.readFiles(path.resolve(__dirname, '../bills/'), function (filename, content) {
            data[filename] = JSON.parse(content);
        }, function (err) {
            throw err;
        }, () => {
            callback(data)
        });
    }

    static getCartsContent(callback) {
        var globalCart = {};
        this.storeData((data) => {
            for (var item in data) {
                var obj = data[item];
                obj['CART'].forEach((cartItem) => {
                    if (!globalCart.hasOwnProperty(cartItem['RESTAURANT'])) {
                        globalCart[cartItem['RESTAURANT']] = {};
                    }
                    var a = globalCart[cartItem['RESTAURANT']];
                    if (!a.hasOwnProperty(cartItem['CATEGORY'])) {
                        a[cartItem['CATEGORY']] = [];
                    }
                    a[cartItem['CATEGORY']].push(cartItem['PRODUCT']);
                    a[cartItem['CATEGORY']].sort();
                });
            };

            callback(globalCart);
        });
    }
};


//UTILITY FUNCTIONS

var arrayContainsObject = (arr, obj) => {
    var out;
    arr.forEach(function (item) {
        if (jsonEqual(item, obj)) {
            out = true;
        }
    }, this);
    if (!out) { out = false };

    return out;
}


function jsonEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}