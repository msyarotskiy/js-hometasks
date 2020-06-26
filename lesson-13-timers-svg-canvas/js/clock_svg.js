'use strict';

(function () {

    var clockRadius = 300; //радиус часов в пикселях
    var hoursOnClockFace = 12;// количество часов

    function clockBuilder() {

        var clockArea = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        clockArea.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        clockArea.setAttribute('width', clockRadius * 2);
        clockArea.setAttribute('height', clockRadius * 2);
        clockArea.style.marginLeft = (document.documentElement.clientWidth / 2) - clockRadius + 'px';
        document.body.appendChild(clockArea);

        var clock = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        clock.setAttribute('r', clockRadius);
        clock.setAttribute('cx', '50%');
        clock.setAttribute('cy', '50%');
        clock.setAttribute('fill', '#FF7100');
        clockArea.appendChild(clock);

        for (var i = 1; i <= hoursOnClockFace; i++) {

            var clockNumb = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
            clockNumb.setAttribute('r', clockRadius * 0.1);
            clockNumb.setAttribute('fill', '#007B25');
            clockNumb.setAttribute('cx', clockRadius + Math.round((clockRadius * 0.85) * Math.sin(Math.PI * (360 / hoursOnClockFace) * i / 180)));
            clockNumb.setAttribute('cy', clockRadius - Math.round((clockRadius * 0.85) * Math.cos(Math.PI * (360 / hoursOnClockFace) * i / 180)));
            clockArea.appendChild(clockNumb);

            var numb = document.createElementNS("http://www.w3.org/2000/svg", 'text');
            numb.setAttribute('x', clockRadius + Math.round((clockRadius * 0.85) * Math.sin(Math.PI * (360 / hoursOnClockFace) * i / 180)));
            numb.setAttribute('y', clockRadius + clockRadius * 0.06 - Math.round((clockRadius * 0.85) * Math.cos(Math.PI * (360 / hoursOnClockFace) * i / 180)));
            numb.setAttribute('font-size', clockRadius * 0.18);
            numb.style.lineHeight = '100%';
            numb.setAttribute('text-anchor', 'middle');
            numb.setAttribute('fill', '#000');
            numb.textContent = i;
            clockArea.appendChild(numb);
        }

        var hourClockHand = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        var hourClockHandWidth = clockRadius * 0.1;
        var hourClockHandHeiht = clockRadius * 0.6;
        hourClockHand.setAttribute('x1', clockRadius);
        hourClockHand.setAttribute('y1', clockRadius + hourClockHandHeiht * 0.1);
        hourClockHand.setAttribute('x2', clockRadius);
        hourClockHand.setAttribute('y2', clockRadius - hourClockHandHeiht + hourClockHandHeiht * 0.1);
        hourClockHand.setAttribute('stroke', '#000');
        hourClockHand.setAttribute('stroke-width', hourClockHandWidth);
        hourClockHand.setAttribute('stroke-linecap', 'round');
        hourClockHand.id = "hoursHand";
        clockArea.appendChild(hourClockHand);

        var minuteClockHand = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        var minuteClockHandWidth = clockRadius * 0.05;
        var minuteClockHandHeiht = clockRadius * 0.7;
        minuteClockHand.setAttribute('x1', clockRadius);
        minuteClockHand.setAttribute('y1', clockRadius + minuteClockHandHeiht * 0.1);
        minuteClockHand.setAttribute('x2', clockRadius);
        minuteClockHand.setAttribute('y2', clockRadius - minuteClockHandHeiht + minuteClockHandHeiht * 0.1);
        minuteClockHand.setAttribute('stroke', '#000');
        minuteClockHand.setAttribute('stroke-width', minuteClockHandWidth);
        minuteClockHand.setAttribute('stroke-linecap', 'round');
        minuteClockHand.id = "minuteHand";
        clockArea.appendChild(minuteClockHand);

        var secondClockHand = document.createElementNS("http://www.w3.org/2000/svg", 'line');
        var secondClockHandWidth = clockRadius * 0.025;
        var secondClockHandHeiht = clockRadius * 0.8;
        secondClockHand.setAttribute('x1', clockRadius);
        secondClockHand.setAttribute('y1', clockRadius + secondClockHandHeiht * 0.1);
        secondClockHand.setAttribute('x2', clockRadius);
        secondClockHand.setAttribute('y2', clockRadius - secondClockHandHeiht + secondClockHandHeiht * 0.1);
        secondClockHand.setAttribute('stroke', '#000');
        secondClockHand.setAttribute('stroke-width', secondClockHandWidth);
        secondClockHand.setAttribute('stroke-linecap', 'round');
        secondClockHand.id = "secondHand";
        clockArea.appendChild(secondClockHand);

        var screw = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        screw.setAttribute('r', clockRadius * 0.01);
        screw.setAttribute('fill', '#929292');
        screw.setAttribute('cx', clockRadius);
        screw.setAttribute('cy', clockRadius);
        clockArea.appendChild(screw);


        var digitalClock = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        digitalClock.setAttribute('x', clockRadius);
        digitalClock.setAttribute('y', clockRadius * 0.55);
        digitalClock.setAttribute('text-anchor', 'middle');
        digitalClock.setAttribute('font-size', clockRadius * 0.18);
        digitalClock.setAttribute('fill', '#000');
        digitalClock.style.lineHeight = '100%';
        digitalClock.textContent = '00:00:00';
        digitalClock.id = "digitalClock";
        clockArea.appendChild(digitalClock);
    }

    function str0l(val, len) {
        var strVal = val.toString();
        while (strVal.length < len)
            strVal = '0' + strVal;
        return strVal;
    }


    function setTime() {

        var soon = new Date();
        var hours = soon.getHours();

        if (hoursOnClockFace < 12) {
            hours = hours % 12;
        }

        var minutes = soon.getMinutes();
        var seconds = soon.getSeconds();

        document.getElementById("digitalClock").textContent = str0l(hours, 2) + ':' + str0l(minutes, 2) + ':' + str0l(seconds, 2);

        var hourAngle = (360 / hoursOnClockFace * hours) + (360 / hoursOnClockFace) / 60 * minutes;
        document.getElementById('hoursHand').setAttribute('transform', 'rotate' + '(' + hourAngle + ' ' + clockRadius + ' ' + clockRadius + ')');

        var minuteAngle = (360 / 60) * minutes;
        document.getElementById('minuteHand').setAttribute('transform', 'rotate' + '(' + minuteAngle + ' ' + clockRadius + ' ' + clockRadius + ')');

        var secondAngle = (360 / 60) * seconds;
        document.getElementById('secondHand').setAttribute('transform', 'rotate' + '(' + secondAngle + ' ' + clockRadius + ' ' + clockRadius + ')');
    }

    clockBuilder();
    setTime();
    setInterval(setTime, 1000);
}());