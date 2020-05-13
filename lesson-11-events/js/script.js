'use strict';

(function () {
    var container = document.getElementById('container');
    var zIndex = 0;

    document.querySelectorAll('img').forEach(function (element) {
        element.style.cssText += 'width: 100px; height: 100px';
        element.style.left = Math.floor(Math.random() * 700) + "px";
        var minTop = parseInt(element.style.left) > 210 ? 0 : 25;
        element.style.top = minTop + Math.floor(Math.random() * (500 - minTop)) + "px";
        element.addEventListener('mousedown', mouseDownAction, false);
    });
    document.styleSheets[0].insertRule('img { position: absolute; }', 0);

    function mouseDownAction(EO) {
        var capturedItem = EO.target;

        if (capturedItem.tagName === 'IMG') {
            var currentIMG = capturedItem;
            currentIMG.style.cursor = 'move';
            currentIMG.style.zIndex = zIndex++;
            var shiftY = event.clientY - currentIMG.getBoundingClientRect().top + container.offsetTop;
            var shiftX = event.clientX - currentIMG.getBoundingClientRect().left + container.offsetLeft;

            moveAt(event.pageX, event.pageY);

            currentIMG.addEventListener('mousemove', mouseMoveAction, false);

            function moveAt(pageX, pageY) {
                var leftPosition = pageX - shiftX;
                var topPosition = pageY - shiftY;
                if (leftPosition < 0) {
                    leftPosition = 0;
                } else if (leftPosition > 700) {
                    leftPosition = 700;
                }
                if (topPosition < 0) {
                    topPosition = 0;
                } else if (topPosition > 500) {
                    topPosition = 500;
                }
                currentIMG.style.left = leftPosition + 'px';
                currentIMG.style.top = topPosition + 'px';
            }

            function mouseMoveAction(EO) {
                moveAt(EO.pageX, EO.pageY);
            }

            currentIMG.addEventListener('mouseup', mouseUpAction, false);
            window.addEventListener('mouseup', mouseUpAction, false);

            function mouseUpAction() {
                currentIMG.removeEventListener('mousemove', mouseMoveAction);
                currentIMG.onmouseup = null;
                currentIMG.style.cursor = 'pointer';
            }

            currentIMG.ondragstart = function () {
                return false;
            };
        }
    }

    container.oncontextmenu = function () {
        return false;
    };
})();