$(document).ready(function () {

    var model = {
        hasGameStarted: false,
        computerTurns: [],
        playerTurns: [],
        nextTurn: 0,
        randomNumber: 0,
        score: 0,
    }

    var controller = {
        //Starts game 
        startGame: function () {
            model.nextTurn = 1;
            model.hasGameStarted = true;
            this.preventReClick();
            controller.computerTurn()
        },
        //Stops from restarting game mid match
        preventReClick: function () {
           if(model.hasGameStarted) {
               view.startBtn.addEventListener("click", function(e){
                   e.stopImmediatePropagation();
            e.preventDefault();
               });
           }
        },
        //Loops array and lights up div according to data-value
        computerArrLightUp: function () {
            setTimeout(function () {
                for (i = 0; i < model.computerTurns.length; i++) {
                    (function (i) {
                        setTimeout(function () {
                            var lightBackground = $('div[data-value=' + '"' + model.computerTurns[i] + '"]');
                            console.log(lightBackground);

                            lightBackground.addClass('light-up');
                            controller.playSoundFile();
                            lightBackground.on("webkitAnimationEnd", view.divColorAnimationEnd);
                        }, 1000 * i);
                    }(i));
                }
            }, 800);
        },
        //Pushes the generated number into computersTurn array
        computerTurn: function () {
            model.computerTurns.push(this.randomComputerChoice());
            console.log(model.computerTurns);
            this.computerArrLightUp();
        },
        //Adds animation and sound to player btn clicks
        playerTurn: function () {
            $('.btn-selection').click(function () {
            //    controller.playSoundFile($(this).attr('id'));
                controller.playSoundFile();
                console.log($(this).attr('id'));
                $(this).addClass('light-up');
                $(this).on("webkitAnimationEnd", view.divColorAnimationEnd);
            })
        },
        //Keeps track of score
        totalPlayerScore: function () {
            model.score++;
            view.currentScore.innerHTML = model.score;
        },
        //Checks the btn press of player to see if corrrect
        checkPlayerInput: function () {
            this.playerTurn();
            var computerturn = JSON.stringify(model.computerTurns);
            var playerTurn = JSON.stringify(model.playerTurns);
            if (computerturn === playerTurn &&
                computerturn.length === playerTurn.length) {
                this.totalPlayerScore();
                model.nextTurn++;
                model.playerTurns = [];
                this.computerTurn();
            //    console.log(model.nextTurn);
            } else if (computerturn !== playerTurn &&
                computerturn.length === playerTurn.length) {
                this.resetGame(model.score);
            }
        },
        //Resets score, checks for highscore and emptys computer's/player's array
        resetGame: function (score) {
            if (score > view.highScore.innerHTML) {
                view.highScore.innerHTML = score;
            }
            view.currentScore.innerHTML = 0;
            model.computerTurns = [];
            model.playerTurns = [];
            view.gameOverSound.play();
            this.gameOverLightUp();
        },
        //Generate randomw number for computer
        randomComputerChoice: function () {
            return model.randomNumber = Math.floor(Math.random() * 4);
        },
        
        gameOverLightUp: function () {
             //   $(view.btnElems).addClass('light-up');
            console.log(view.btnElems);
            view.btnElems.className += ' light-up';
        },
        //Plays color sounds if selected
        playSoundFile: function () {
        //        var sound = document.getElementsByClassName('' + variable + '-btn')[0];
        //     if ($('#' + variable + '').hasClass('light-up')) {
        //             sound.play();
        //     }
           
            if ($('#green').hasClass('light-up')) {
                view.greenSound.play();
            } else if ($('#red').hasClass('light-up')) {
                view.redSound.play();
            } else if ($('#yellow').hasClass('light-up')) {
                view.yellowSound.play();
            } else if ($('#blue').hasClass('light-up')) {
                view.blueSound.play();
            }
        }
    };

    var view = {
        //Adding elems to variables
        greenSound: document.getElementsByClassName('green-btn')[0],
        redSound: document.getElementsByClassName('red-btn')[0],
        blueSound: document.getElementsByClassName('blue-btn')[0],
        yellowSound: document.getElementsByClassName('yellow-btn')[0],
        currentScore: document.getElementsByClassName('score')[0],
        highScore: document.getElementsByClassName('high-score')[0],
        gameOverSound: document.getElementsByClassName('game-over-sound')[0],
        btnElems: document.getElementsByClassName('btn-selection'),
        startBtn: document.getElementById('startBtn'),
        //Adding listener for the start button
        addClickToStart: function () {
            startBtn.addEventListener('click', function () {
                controller.startGame();
                view.addClickToBtns();
            })
        },
        //Adds listeners to div's and gets player data-value to be pushed to array
        addClickToBtns: function () {
            for (var i = 0; i < this.btnElems.length; i++) {
                this.btnElems[i].addEventListener('click', function () {
                    var btnClickId = $(this).data("value");
                    model.playerTurns.push(Number(btnClickId));
                    console.log(model.playerTurns);
                    controller.checkPlayerInput();
                });
            }
        },
        //Removes animated class if present
        divColorAnimationEnd: function () {
            if ($('div').hasClass('light-up')) {
                $('div').removeClass('light-up');
            }
        },
    }
    view.addClickToStart();
//    view.addClickToBtns();
  //  controller.startGame();
    controller.playerTurn();
});
