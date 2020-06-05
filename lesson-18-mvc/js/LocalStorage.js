'use strict';

function TLocalStorage(storage) {
    var items = {};

    this.addValue = function (key, value) {
        items[key] = value;
        localStorage[storage] = JSON.stringify(items);
    };

    this.getValue = function (askName) {
        if (askName in items) {
            return items[askName];
        } else {
            return false;
        }
    };

    this.deleteValue = function (delName) {
        if (delName in items) {
            delete items[delName];
            localStorage[storage] = JSON.stringify(items);
            return true;
        } else {
            return false;
        }
    };

    this.getKeys = function () {
        var arrKeys = [];
        for (var key in items) {
            arrKeys.push(key)
        }
        if (arrKeys.length !== 0) {
            return arrKeys;
        } else {
            return false;
        }
    };

    this.Reset = function () {
        if (localStorage.length > 0) {
            var storage = JSON.parse(localStorage[storage]);
            for (var key in storage) {
                items[key] = storage[key];
            }
        }
    }
}