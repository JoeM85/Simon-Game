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
            controller.computerTurn();
            //   view.addClickToBtns();
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
                            view.playSoundFile();
                            lightBackground.on("webkitAnimationEnd", view.divColorAnimationEnd);
                        }, 1000 * i);
                    }(i));
                }
            }, 800);
        },
        //Pushes the generated number into computersTurn array
        computerTurn: function () {
            model.computerTurns.push(this.randomComputerChoice());
            controller.computerArrLightUp();
        },
        //Adds animation and sound to player btn clicks
        /*    playerTurn: function () {
                $('.btn-selection').click(function () {
                    //    controller.playSoundFile($(this).attr('id'));
                    console.log($(this).attr('id'));
                    $(this).addClass('light-up');
                    view.playSoundFile();
                    $(this).on("webkitAnimationEnd", view.divColorAnimationEnd);

                })
            },*/
        //Checks the btn press of player to see if corrrect
        checkPlayerInput: function () {
            var computerturn = JSON.stringify(model.computerTurns);
            var playerTurn = JSON.stringify(model.playerTurns);
            if (computerturn === playerTurn &&
                computerturn.length === playerTurn.length) {
                //      this.totalPlayerScore();
                model.nextTurn++;
                model.playerTurns = [];
                console.log(model.playerTurns);
                this.computerTurn();
                //    console.log(model.nextTurn);
            } else if (computerturn !== playerTurn &&
                computerturn.length === playerTurn.length) {}
        },
        //Generate randomw number for computer
        randomComputerChoice: function () {
            return model.randomNumber = Math.floor(Math.random() * 4);
        },

        gameStart: function () {
            view.init();
        }
    };

    var view = {
        //Adding elems to variables
        init: function () {
            this.greenSound = document.getElementsByClassName('green-btn')[0];
            this.redSound = document.getElementsByClassName('red-btn')[0];
            this.blueSound = document.getElementsByClassName('blue-btn')[0];
            this.yellowSound = document.getElementsByClassName('yellow-btn')[0];
            this.currentScore = document.getElementsByClassName('score')[0];
            this.highScore = document.getElementsByClassName('high-score')[0];
            this.gameOverSound = document.getElementsByClassName('game-over-sound')[0];
            var btnElems = document.getElementsByClassName('btn-selection');

             for (var i = 0; i < btnElems.length; i++) {
                 btnElems[i].addEventListener('click', function (event) {
                    console.log(btnElems)
                    var good = btnElems[i];
                    var clickedElem = event.target || event.srcElement;
                    var btnClickId = clickedElem.dataset.value;
                    controller.checkPlayerInput();
                    clickedElem.classList.add('ligh-up');
                    view.playSoundFile();
                   //  view.divColorAnimationEnd(btnElems);
                     good.addEventListener("webkitAnimationEnd", view.divColorAnimationEnd(btnElems));
                //    $(this).on("webkitAnimationEnd", view.divColorAnimationEnd);
                    // this.
                })
            }

            this.startBtn = document.getElementById('startBtn');
            //Adding listener for the start button
            this.startBtn.addEventListener('click', function () {
                controller.computerTurn();
                console.log(btnElems)
            })
            /*
                        $('.btn-selection').click(function (event) {
                            var clickedElem = event.target || event.srcElement;
                            var btnClickId = clickedElem.dataset.value;
                            model.playerTurns.push(Number(btnClickId));
                            console.log(model.playerTurns);
                            controller.checkPlayerInput();
                            console.log($(this).attr('id'));
                            $(this).addClass('light-up');
                            view.playSoundFile();
                            $(this).on("webkitAnimationEnd", view.divColorAnimationEnd);

                        })*/
          
        },
        //Adds listeners to div's and gets player data-value to be pushed to array
        // this.addClickToBtns = function () {
        /*   for (var i = 0; i < this.btnElems.length; i++) {
               this.btnElems[i].addEventListener('click', function (event) {
                   var clickedElem = event.target || event.srcElement;
                   var btnClickId = clickedElem.dataset.value;
                //   view.playSoundFile();
                   model.playerTurns.push(Number(btnClickId));
                   console.log(model.playerTurns);
                   controller.checkPlayerInput();
               });
           }*/
        /*     this.btnElems.addEventListener('click' function() {
             
             
             })*/
        playSoundFile: function () {
            if ($('#green').hasClass('light-up')) {
                view.greenSound.play();
            } else if ($('#red').hasClass('light-up')) {
                view.redSound.play();
            } else if ($('#yellow').hasClass('light-up')) {
                view.yellowSound.play();
            } else if ($('#blue').hasClass('light-up')) {
                view.blueSound.play();
            }
        },
        //Removes animated class if present
        divColorAnimationEnd: function (good) {
         //   for (var i = 0; i < good.length; i++) {
                if (good.classList.contains('light-up')) {
                    good.classList.remove('light-up');
                    
                }
            
        }
    }
    //   view.addClickToStart();
    //    view.addClickToBtns();
    controller.gameStart();
});
