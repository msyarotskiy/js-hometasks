'use strict';

var drinkStorage = new TLocalStorage('drinks');
drinkStorage.Reset();

function addDrinkInfo() {
    var drinkName = prompt('Введите название напитка');
    var isAlcogol = confirm('Этот напиток алкогольный?');
    var addRecept = prompt('Рассскажите секрет приготовления этого напитка');
    drinkStorage.addValue(drinkName, {alcogol: isAlcogol, recept: addRecept});
}

function getDrinkInfo() {
    var askDrinkName = prompt('Введите название напитка,о котором хотите получить информацию');
    var drinkInfo = drinkStorage.getValue(askDrinkName);
    if (drinkInfo === undefined) {
        alert('Информации об этом напитке не найдено');
    } else {
        alert((drinkInfo.alcogol) ? 'Алкогольный напиток' : 'Безалкогольный Напиток');
        alert('Рецепт: ' + drinkInfo.recept);
    }
}

function delDrinkInfo() {
    var delDrinkName = prompt('Введите название напитка,информацию о котором хотите удалить');
    if (drinkStorage.deleteValue(delDrinkName)) {
        alert('Напиток удален');
    } else {
        alert('Информации об этом напитке не найдено');
    }
}

function getAllDrinks() {
    var allDrinks = drinkStorage.getKeys();
    alert(allDrinks.join(' , '));
}