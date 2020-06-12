'use strict';

let drinkStorage = new TAJAXStorage('drinks');
drinkStorage.Reset();

function addDrinkInfo() {
    let drinkName = prompt('Введите название напитка');
    let isAlcogol = confirm('Этот напиток алкогольный?');
    let addRecept = prompt('Рассскажите секрет приготовления этого напитка');
    drinkStorage.addValue(drinkName, {alcogol: isAlcogol, recept: addRecept});
}

function getDrinkInfo() {
    let askDrinkName = prompt('Введите название напитка,о котором хотите получить информацию');
    let drinkInfo = drinkStorage.getValue(askDrinkName);
    if (drinkInfo === undefined) {
        alert('Информации об этом напитке не найдено');
    } else {
        alert((drinkInfo.alcogol) ? 'Алкогольный напиток' : 'Безалкогольный напиток');
        alert('Рецепт: ' + drinkInfo.recept);
    }
}

function delDrinkInfo() {
    let delDrinkName = prompt('Введите название напитка,информацию о котором хотите удалить');
    if (drinkStorage.deleteValue(delDrinkName)) {
        alert('Напиток удален');
    } else {
        alert('Информации об этом напитке не найдено');
    }
}

function getAllDrinks() {
    let allDrinks = drinkStorage.getKeys();
    alert(allDrinks.join(' , '));
}