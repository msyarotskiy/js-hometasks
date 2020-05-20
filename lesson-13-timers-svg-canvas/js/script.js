'use strict';

(function () {
    var clock = document.getElementById('clock');
    var ctx = clock.getContext('2d');
    var centerX = clock.width / 2;
    var centerY = clock.height / 2;
    var radius = centerX < centerY ? centerX * 0.95 : centerY * 0.95;

    /*отрисовка циферблата*/
    function drawClock() {
        ctx.fillStyle = 'yellow';
        ctx.strokeStyle = 'gray';
        ctx.lineWidth = radius / 25;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.fill();
        var angle = 0;	//угол поворота метки
        var shift = radius / 15; 	//отступ метки от края циферблата
        ctx.fillStyle = 'black';
        for (var i = 0; i < 12; i++) {
            var markX = centerX + (radius - shift) * Math.sin(angle);
            var markY = centerY + (radius - shift) * Math.cos(angle);
            ctx.beginPath();
            ctx.arc(markX, markY, radius / 20, 0, Math.PI * 2, true);
            ctx.fill();
            angle += 30 * Math.PI / 180;
        }
    }

    /*отрисовка стрелок*/
    function displayAnalogTime(d) {
        var tSec = (6 * d.getSeconds() - 90) * Math.PI / 180;  //Определяем угол для секунд
        var tMin = (6 * (d.getMinutes() + (1 / 60) * d.getSeconds()) - 90) * Math.PI / 180; //Определяем угол для минут
        var tHour = (30 * (d.getHours() + (1 / 60) * d.getMinutes()) - 90) * Math.PI / 180;  //Определяем угол для часов
        ctx.lineCap = 'round';
        var secShift = radius / 4;
        var minShift = radius / 9;
        var hourShift = radius / 2.3;

        /*секундная стрелка*/
        ctx.strokeStyle = 'red';
        ctx.lineWidth = radius / 50;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        var secTipX = centerX + (radius - secShift) * Math.cos(tSec);
        var secTipY = centerY + (radius - secShift) * Math.sin(tSec);
        ctx.lineTo(secTipX, secTipY);
        ctx.stroke();

        /*минутная стрелка*/
        ctx.strokeStyle = 'black';
        ctx.lineWidth = radius / 25;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        var minTipX = centerX + (radius - minShift) * Math.cos(tMin);
        var minTipY = centerY + (radius - minShift) * Math.sin(tMin);
        ctx.lineTo(minTipX, minTipY);
        ctx.stroke();

        /*часовая стрелка*/
        ctx.strokeStyle = 'black';
        ctx.lineWidth = radius / 15;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        var hourTipX = centerX + (radius - hourShift) * Math.cos(tHour);
        var hourTipY = centerY + (radius - hourShift) * Math.sin(tHour);
        ctx.lineTo(hourTipX, hourTipY);
        ctx.stroke();
    }

    setInterval(function () {
        var d = new Date();
        ctx.clearRect(0, 0, clock.width, clock.height);
        drawClock(d);
        displayAnalogTime(d);
    }, 1000);
}());