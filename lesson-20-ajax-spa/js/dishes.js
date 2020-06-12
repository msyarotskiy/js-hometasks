'use strict';

let dishStorage = new TAJAXStorage('dishes');
dishStorage.Reset();

function addDishInfo() {
    let dishName = prompt('Введите название блюда');
    let addRecept = prompt('Рассскажите секрет приготовления этого блюда');
    dishStorage.addValue(dishName, {recept: addRecept});
}

function getDishInfo() {
    let askDishName = prompt('Введите название блюда,о котором хотите получить информацию');
    let dishInfo = dishStorage.getValue(askDishName);
    if (dishInfo === undefined) {
        alert('Информации об этом блюде не найдено');
    } else {
        alert('Рецепт: ' + dishInfo.recept);
    }
}

function delDishInfo() {
    let delDishName = prompt('Введите название блюда, информацию о котором хотите удалить');
    if (dishStorage.deleteValue(delDishName)) {
        alert('Блюдо удалено');
    } else {
        alert('Информации об этом блюде не найдено');
    }
}

function getAllDishes() {
    let allDishes = dishStorage.getKeys();
    alert(allDishes.join(' , '));
}