$(document).ready(function () {

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
            controller.computerTurn()
        },
        //Loops array and lights up div according to data-value
        computerArrLightUp: function () {
            setTimeout(function () {
                for (i = 0; i < model.computerTurns.length; i++) {
                    (function (i) {
                        setTimeout(function () {          
                            for(var j = 0; j < view.btnElems.length; j++) {           
                                if(model.computerTurns[i] === Number(view.btnElems[j].getAttribute('data-value'))) {
                                    view.btnElems[j].classList.add('light-up');
                                    view.btnElems[j].addEventListener("webkitAnimationEnd", view.divColorAnimationEnd)    
                                }                                
                            }    
                            view.playSound();
                        }, 1000 * i);
                    }(i))
                }
            }, 800);
        },
        //Pushes the generated number into computersTurn array
        computerTurn: function () {
            model.computerTurns.push(this.randomComputerChoice());
            console.log(model.computerTurns);
            this.computerArrLightUp();
        },
        //Keeps track of score
        playerScore: function () {
            model.score++;
            view.currentScore.innerHTML = model.score;
        },
        //Checks the btn press of player to see if corrrect
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
                localStorage.setItem('high score', JSON.stringify(view.highScore.innerHTML))
            }
        },
        //Resets score, checks for highscore and emptys computer's/player's array
        resetGame: function () {
            controller.checkScore(model.score)
            controller.emptyTurnArrs();
            console.log(model.playerTurns);
            view.gameOverSound.play();
            view.gameOverLightUp();
            view.startBtn.disabled = false;
        },
        //Generate randomw number for computer
        randomComputerChoice: function () {
            return model.randomNumber = Math.floor(Math.random() * 4);
        }
    };

    var view = {
        //Adding elems to variables
        initGame: function () {
            this.greenSound = document.getElementsByClassName('green-btn')[0],
                this.redSound = document.getElementsByClassName('red-btn')[0],
                this.blueSound = document.getElementsByClassName('blue-btn')[0],
                this.yellowSound = document.getElementsByClassName('yellow-btn')[0],
                this.currentScore = document.getElementsByClassName('score')[0],
                this.highScore = document.getElementsByClassName('high-score')[0],
                this.gameOverSound = document.getElementsByClassName('game-over-sound')[0],
                this.btnElems = document.getElementsByClassName('btn-selection'),
                this.startBtn = document.getElementById('startBtn'),
                //Adding listener for the start button
                this.startBtn.addEventListener('click', function () {
                    view.startBtn.disabled = true;
                    controller.startComputer();
                })
            //Looping though btnElms getting player click data and pushing to player arr
            for (var i = 0; i < this.btnElems.length; i++) {
                this.btnElems[i].addEventListener('click', function (event) {
                    var clickedElem = event.target || event.srcElement;
                    var btnClickId = clickedElem.dataset.value;
                    model.playerTurns.push(Number(btnClickId));
                    console.log(model.playerTurns);
                    clickedElem.classList.add('light-up');
                    view.playSound();
                    clickedElem.addEventListener("webkitAnimationEnd", view.divColorAnimationEnd);
                    controller.checkPlayerInput();
                });
            }
        },
        //Removes animated class if present
        divColorAnimationEnd: function () {
            var animatedBtn = view.btnElems;
            for (var i = 0; i < animatedBtn.length; i++) {
                if (animatedBtn[i].classList.contains('light-up')) {
                    animatedBtn[i].classList.remove('light-up')
                } else if (animatedBtn[i].classList.contains('game-over-light-up')) {
                    animatedBtn[i].classList.remove('game-over-light-up')
                }
            }
        },
        //Plays correct sound for selected btn
        playSound: function () {   
            for (var i = 0; i < view.btnElems.length; i++) { 
                var btnSelection = view.btnElems[i];
                
                if(btnSelection.classList.contains('light-up') && btnSelection.id === 'green') {
                    view.greenSound.play();
                } else if(btnSelection.classList.contains('light-up') && btnSelection.id === 'red') {
                    view.redSound.play();
                } else if(btnSelection.classList.contains('light-up') && btnSelection.id === 'blue') {
                    view.blueSound.play();
                } else if(btnSelection.classList.contains('light-up') && btnSelection.id === 'yellow') {
                    view.yellowSound.play();
                }
            }
        },
        //Game over animations
        gameOverLightUp: function () {
            for (var i = 0; i < view.btnElems.length; i++) {
                view.btnElems[i].classList.add('game-over-light-up');
                view.btnElems[i].addEventListener("webkitAnimationEnd", view.divColorAnimationEnd);
            }
        }
    }
    view.initGame();
});
