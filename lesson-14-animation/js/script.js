'use strict';
(function () {
    /*размеры игрового поля*/
    const fieldWidth = 800;
    const fieldHeight = 500;

    /*получаем необходимые для игры элементы*/
    let btnStart = document.getElementById('start');
    let btnNewGame = document.getElementById('new-game');
    let ball = document.getElementById('ball');
    let racketL = document.getElementById('racket-left');
    let racketR = document.getElementById('racket-right');
    let score = document.getElementById('score');
    const field = document.getElementById('game-box');
    let speed = document.getElementById('speed');

    /*установка размера игрового поля*/
    field.style.width = fieldWidth + 180 + 'px';
    field.style.height = fieldHeight + 50 + 'px';

    /*Объект состояния игры*/
    let gameState = {
        isStarted: false,
        scoreL: 0,
        scoreR: 0,
        /*положение ракеток*/
        racketLTop: 0,
        racketRTop: 0,
        racketLSpeed: 0,
        racketRSpeed: 0,
        speed: 1,
        /*положение мяча и скорость изменения координат*/
        ball: {
            posX: 0,
            posY: 0,
            speedX: 1,
            speedY: 1,
            /*установка начальной скорости и направления перемещения мяча*/
            setDirection: function () {
                this.speedX = Math.random() * (2 / Math.sin(Math.PI / 4) - 2) + 2;
                this.speedY = Math.sqrt(Math.pow((2 / Math.sin(Math.PI / 4)), 2) - Math.pow(this.speedX, 2));
                this.speedX *= Math.round(Math.random()) == 0 ? -1 : 1;
                this.speedY *= Math.round(Math.random()) == 0 ? -1 : 1;
                console.log('speedX=' + this.speedX);
                console.log('speedY=' + this.speedY);
            }
        },
        /*установка положений элементов в начальном положении*/
        defaultPosition: function () {
            this.racketLTop = fieldHeight / 2 - racketL.offsetHeight / 2;
            this.racketRTop = fieldHeight / 2 - racketR.offsetHeight / 2;
            this.ball.posX = fieldWidth / 2 - ball.offsetWidth / 2;
            this.ball.posY = fieldHeight / 2 - ball.offsetHeight / 2;
            this.speed = 1;
            setTimeout(updateDisplay, 20);
        }
    };

    /*перемещение мяча по полю*/
    let runBall = function () {
        let posX = gameState.ball.posX + gameState.ball.speedX;
        let posY = gameState.ball.posY + gameState.ball.speedY;
        /*смена направления движения, если достигнуты верхний или нижний край*/
        if (posY > (fieldHeight - 50) || posY < 0) {
            gameState.ball.speedY *= -1;
        }
        /*проверка зоны касания левой ракетки*/
        if (posX <= 15) {
            if (posY + 50 > gameState.racketLTop && posY < gameState.racketLTop + 150) {
                gameState.ball.speedX *= -1;
                gameState.ball.posY += gameState.racketLSpeed;
            } else {
                gameState.defaultPosition();
                gameState.ball.setDirection();
                gameState.scoreR++;
            }
        }
        /*проверка зоны касания правой ракетки*/
        if (posX >= fieldWidth - 65) {
            if (posY + 50 > gameState.racketRTop && posY < gameState.racketRTop + 150) {
                gameState.ball.speedX *= -1;
                gameState.ball.posY += gameState.racketRSpeed;
            } else {
                gameState.defaultPosition();
                gameState.ball.setDirection();
                gameState.scoreL++;
            }
        }
        gameState.ball.posX += gameState.ball.speedX;
        gameState.ball.posY += gameState.ball.speedY;
    };

    let stopRacket;
    let moveRacket = function (event) {
        switch (event.keyCode) {
            case 16:
                if (gameState.racketLSpeed > -16)
                    gameState.racketLSpeed -= 1;
                break;
            case 17:
                if (gameState.racketLSpeed < 16)
                    gameState.racketLSpeed += 1;
                break;
            case 38:
                if (gameState.racketLSpeed > -16)
                    gameState.racketRSpeed -= 1;
                break;
            case 40:
                if (gameState.racketLSpeed < 16)
                    gameState.racketRSpeed += 1;
        }

        setInterval(function () {
            let lTop = gameState.racketLTop + gameState.racketLSpeed;
            let rTop = gameState.racketRTop + gameState.racketRSpeed;
            if (lTop >= 0 && lTop <= fieldHeight - racketL.offsetHeight) {
                gameState.racketLTop += gameState.racketLSpeed;
            }
            if (rTop >= 0 && rTop <= fieldHeight - racketR.offsetHeight) {
                gameState.racketRTop += gameState.racketRSpeed;
            }
        }, 200);

        stopRacket = function (event) {
            switch (event.keyCode) {
                case 16:
                case 17:
                    gameState.racketLSpeed = 0;
                    break;
                case 38:
                case 40:
                    gameState.racketRSpeed = 0;
            }
        };
        addEventListener('keyup', stopRacket, false);
    };

    /*таймеры*/
    let animation; //таймер обновления дисплея
    let ballMotion;	//перемещение мяча
    let speedTimer;	//таймер увеличения скорости перемещения мяча

    /*обновление положений элементов на экране*/
    let updateDisplay = function () {
        ball.style.top = gameState.ball.posY + 'px';
        ball.style.left = gameState.ball.posX + 'px';
        racketL.style.top = gameState['racketLTop'] + 'px';
        racketR.style.top = gameState['racketRTop'] + 'px';
        score.textContent = gameState.scoreL + ':' + gameState.scoreR;
        speed.textContent = `скорость: ${gameState.speed}`;
        animation = requestAnimationFrame(updateDisplay);
    };

    let increaceSpeed = function () {
        gameState.ball.speedX *= 1.2;
        gameState.ball.speedY *= 1.2;
        gameState.speed++;
        console.log(`увеличение скорости: speedX=${gameState.ball.speedX}, speedY=${gameState.ball.speedY}`)
    };

    /*запуск игры*/
    let start = function () {
        addEventListener('keydown', moveRacket, false);

        if (!gameState.isStarted) { //исли игра не начата
            gameState.defaultPosition();
            gameState.isStarted = true;
            btnStart.innerHTML = 'пауза';
            gameState.ball.setDirection();
            ballMotion = setInterval(runBall, 20);
            updateDisplay();
            /*увеличение скорости каждые 10 секунд*/
            speedTimer = setInterval(increaceSpeed, 10000);
            console.log('игра начата');
        } else { //если игра уже начата
            if (btnStart.innerHTML == 'пауза') {
                btnStart.innerHTML = 'продолжить';
                clearInterval(ballMotion);
                clearInterval(speedTimer);
                removeEventListener('keydown', moveRacket, false);
                console.log('игра приостановлена');
            } else {
                btnStart.innerHTML = 'пауза';
                ballMotion = setInterval(runBall, 20);
                speedTimer = setInterval(increaceSpeed, 10000);
                addEventListener('keydown', moveRacket, false);
                console.log('игра продолжена');
            }
        }
    };

    /*сброс игры*/
    let resetGame = function () {
        gameState.defaultPosition();
        cancelAnimationFrame(animation);
        clearInterval(speedTimer);
        clearInterval(ballMotion);
        gameState.scoreL = 0;
        gameState.scoreR = 0;
        gameState.speed = 1;
        gameState.isStarted = false;
        btnStart.innerHTML = 'старт!';
        console.log('игра сброшена');
        removeEventListener('keydown', moveRacket, false);
    };

    field.addEventListener('touchstart', mouseDownAction, false);
    field.addEventListener('touchend', mouseUpAction, false);
    field.addEventListener('mousedown', mouseDownAction, false);
    field.addEventListener('mouseup', mouseUpAction, false);

    function mouseDownAction(EO) {
        let element = EO.target;
        switch (element.id) {
            case 'btn-lUp':
                EO.keyCode = 16;
                moveRacket(EO);
                break;
            case 'btn-lDown':
                EO.keyCode = 17;
                moveRacket(EO);
                break;
            case 'btn-rUp':
                EO.keyCode = 38;
                moveRacket(EO);
                break;
            case 'btn-rDown':
                EO.keyCode = 40;
                moveRacket(EO);
        }
    }

    function mouseUpAction(EO) {
        EO.stopPropagatoin;
        let element = EO.target;
        switch (element.id) {
            case 'btn-lUp': {
                EO.keyCode = 16;
                stopRacket(EO);
                break;
            }
            case 'btn-lDown':
                EO.keyCode = 17;
                stopRacket(EO);
                break;
            case 'btn-rUp':
                EO.keyCode = 38;
                stopRacket(EO);
                break;
            case 'btn-rDown':
                EO.keyCode = 40;
                stopRacket(EO);
                break;
        }
    }

    btnStart.addEventListener('click', start, true);
    btnNewGame.addEventListener('click', resetGame, true);
}());