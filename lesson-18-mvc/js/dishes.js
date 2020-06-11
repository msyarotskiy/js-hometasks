'use strict';

var dishStorage = new TLocalStorage('dishes');
dishStorage.Reset();

function addDishInfo() {
    var dishName = prompt('Введите название блюда');
    var addRecept = prompt('Рассскажите секрет приготовления этого блюда');
    dishStorage.addValue(dishName, {recept: addRecept});
}

function getDishInfo() {
    var askDishName = prompt('Введите название блюда,о котором хотите получить информацию');
    var dishInfo = dishStorage.getValue(askDishName);
    if (dishInfo === undefined) {
        alert('Информации об этом блюде не найдено');
    } else {
        alert('Рецепт: ' + dishInfo.recept);
    }
}

function delDishInfo() {
    var delDishName = prompt('Введите название блюда, информацию о котором хотите удалить');
    if (dishStorage.deleteValue(delDishName)) {
        alert('Блюдо удалено');
    } else {
        alert('Информации об этом блюде не найдено');
    }
}

function getAllDishes() {
    var allDishes = dishStorage.getKeys();
    alert(allDishes.join(' , '));
}