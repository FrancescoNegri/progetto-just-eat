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

            if (filenames.length > 0) {
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
            }
            else {
                console.log('no files found');
            }
        });
    }

    static storeData(callback) {
        var data = {};
        if (!fs.existsSync('./bills')) {
            fs.mkdirSync('./bills');
        }
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