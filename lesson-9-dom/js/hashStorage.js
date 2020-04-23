'use strict';

class THashStorage {
    constructor() {
        this.drinks = {};
    }

    addValue(key, value) {
        this.drinks[key] = value;
    }

    getValue(key) {
        return this.drinks[key];
    }

    deleteValue(key) {
        return delete this.drinks[key];
    }

    getKeys() {
        return Object.keys(this.drinks);
    }
}