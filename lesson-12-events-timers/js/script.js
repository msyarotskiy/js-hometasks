'use strict';

(function () {
    var clock = document.getElementById('clock');
    var digital = document.createElement('span');
    digital.setAttribute('class', 'digital');
    clock.appendChild(digital);

    var numbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    for (var i = 0; i < 12; i++) {
        var clockFace = document.createElement('div');
        clockFace.setAttribute('class', 'clockFace');
        clock.appendChild(clockFace);
        clockFace.style.transform = `rotate(${i * 30}deg)`;
        var number = document.createElement('span');
        number.setAttribute('class', 'number');
        number.innerText = numbers[i];
        number.style.transform = `rotate(-${i * 30}deg);`;
        clockFace.appendChild(number);
    }

    var clockHands = document.createElement('div');
    clockHands.setAttribute('class', 'clockHands');
    var hourHand = document.createElement('div');
    hourHand.setAttribute('class', 'hour');
    var minuteHand = document.createElement('div');
    minuteHand.setAttribute('class', 'minute');
    var secondHand = document.createElement('div');
    secondHand.setAttribute('class', 'second');
    clockHands.appendChild(hourHand);
    clockHands.appendChild(minuteHand);
    clockHands.appendChild(secondHand);
    clock.appendChild(clockHands);

    function displayDigitalTime(d) {
        digital.innerHTML = d.toLocaleTimeString();
    }

    function displayAnalogTime(d) {
        var tSec = 6 * d.getSeconds();
        var tMin = 6 * (d.getMinutes() + (1 / 60) * d.getSeconds());
        var tHour = 30 * (d.getHours() + (1 / 60) * d.getMinutes());
        hourHand.style.transform = `rotate(${tHour}deg)`;
        minuteHand.style.transform = `rotate(${tMin}deg)`;
        secondHand.style.transform = `rotate(${tSec}deg)`;
    }

    setInterval(function () {
        var d = new Date();
        displayDigitalTime(d);
        displayAnalogTime(d);
    }, 1000);
}());