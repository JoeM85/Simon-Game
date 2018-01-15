var model = {
    computerTurns: [],
    playerTurns: [],
    nextTurn: 0,
    randomNumber: 0,
    score: 0,
}

var controller = {
    //Starts game 
    startComputer: function () {
        //Clears arr in case of accidental button press between games
        this.emptyTurnArrs();
        this.computerTurn();
    },
    //Loops array and lights up div according to data-value
    //Sets time between each of the computers turns 
    //Sets a waiting period between players last btn press and the computers turn
    computerArrLightUp: function () {
        setTimeout(function () {
            model.computerTurns.forEach(function (turn, turnIndex) {
                (function (turnIndex) {
                    setTimeout(function () {
                        view.btnElems.forEach(function (btn, btnIndex) {
                            if (model.computerTurns[turnIndex] === Number(view.btnElems[btnIndex].getAttribute('data-value'))) {
                                view.btnElems[btnIndex].classList.add('light-up');
                                view.btnElems[btnIndex].addEventListener("webkitAnimationEnd", view.divColorAnimationEnd);
                            }
                        })
                        controller.btnIterator(view.playSound);
                    }, 1000 * turnIndex);
                }(turnIndex))
            })
        }, 800);
    },
    //Pushes the generated number into computersTurn array
    computerTurn: function () {
        model.computerTurns.push(this.randomComputerChoice());
        this.computerArrLightUp();
    },
    //Keeps track of score
    playerScore: function () {
        model.score++;
        view.currentScore.innerHTML = model.score;
    },
    //Checks the btn press of player to see if corrrect
    //If player is correct update current score and empty players array else reset game
    checkPlayerInput: function () {
        var computerturn = JSON.stringify(model.computerTurns);
        var playerTurn = JSON.stringify(model.playerTurns);
        if (computerturn === playerTurn &&
            computerturn.length === playerTurn.length) {
            this.playerScore();
            model.nextTurn++;
            model.playerTurns = [];
            this.computerTurn();
        } else if (computerturn !== playerTurn &&
            computerturn.length === playerTurn.length) {
            this.resetGame();

        }
    },
    //Clears Arrays
    emptyTurnArrs: function () {
        model.computerTurns = [];
        model.playerTurns = [];
    },
    //Reset score and check for a new high score
    checkScore: function (score) {
        view.currentScore.innerHTML = 0;
        model.score = 0;
        if (score > view.highScore.innerHTML) {
            view.highScore.innerHTML = score;
        }
    },
    //Resets score, checks for highscore and emptys computer's/player's array
    resetGame: function () {
        controller.checkScore(model.score);
        controller.emptyTurnArrs();
        view.gameOverSound.play();
        this.btnIterator(view.gameOverLightUp);
        view.startBtn.disabled = false;
    },
    //Generate randomw number for computer
    randomComputerChoice: function () {
        return model.randomNumber = Math.floor(Math.random() * 4);
    },
    //Goes through the btnElems array and calls a function on the btnElem
    btnIterator: function (callback) {
        view.btnElems.forEach(function (elem) {
            callback(elem);
        })
    }
};

var view = {
    //Adding elems to variables and click events 
    initGame: function () {
        this.greenSound = document.getElementsByClassName('green-btn')[0];
        this.redSound = document.getElementsByClassName('red-btn')[0];
        this.blueSound = document.getElementsByClassName('blue-btn')[0];
        this.yellowSound = document.getElementsByClassName('yellow-btn')[0];
        this.currentScore = document.getElementsByClassName('score')[0];
        this.highScore = document.getElementsByClassName('high-score')[0];
        this.gameOverSound = document.getElementsByClassName('game-over-sound')[0];
        // Turns node list into a array
        this.btnElems = Array.from(document.getElementsByClassName('btn-selection'));
        this.startBtn = document.getElementById('startBtn');
        this.startBtn.addEventListener('click', function () {
            startBtn.disabled = true;
            controller.startComputer();
        })

        controller.btnIterator(this.getPlayerClickInfo);
    },
    //Adding click listner and getting clicked button data
    getPlayerClickInfo: function (btnElem) {
        btnElem.addEventListener('click', function (event) {
            var clickedElem = event.target || event.srcElement;
            var btnClickId = clickedElem.dataset.value;
            model.playerTurns.push(Number(btnClickId));
            clickedElem.classList.add('light-up');
            controller.btnIterator(view.playSound);
            clickedElem.addEventListener("webkitAnimationEnd", view.divColorAnimationEnd);
            controller.checkPlayerInput();
        });
    },
    //Removes animated class if present
    divColorAnimationEnd: function () {
        if (this.classList.contains('light-up')) {
            this.classList.remove('light-up');
        }
        if (this.classList.contains('game-over-light-up')) {
            this.classList.remove('game-over-light-up');
        }
    },
    //Plays correct sound for selected btn
    playSound: function (btnElem) {
        if (btnElem.classList.contains('light-up') && btnElem.id === 'green') {
            view.greenSound.play();
        } else if (btnElem.classList.contains('light-up') && btnElem.id === 'red') {
            view.redSound.play();
        } else if (btnElem.classList.contains('light-up') && btnElem.id === 'blue') {
            view.blueSound.play();
        } else if (btnElem.classList.contains('light-up') && btnElem.id === 'yellow') {
            view.yellowSound.play();
        }
    },
    //Game over animations
    gameOverLightUp: function (btnElem) {
        btnElem.classList.add('game-over-light-up');
        btnElem.addEventListener("webkitAnimationEnd", view.divColorAnimationEnd);
    }
}
view.initGame();
