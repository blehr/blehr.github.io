$(function() {
  var challenge = [];
  var count = 1;
  var numPresses = 0;
  var strict = 0;
  var timeouts = [];

  var game = {

    start: function start() {
      function randomPos() {
        challenge.push(Math.floor(Math.random() * (4 - 1 + 1)) + 1);
      }
      (function createChallenge() {
        for (var x = 0; x < 20; x++) {
          randomPos();
        }
      })();
    },
    displayChallenge: function displayChallenge() {
      this.displayCount();
      numPresses = 0;
      var challengeValue;
      for (var x = 0; x < count; x++) {
        challengeValue = challenge[x];
        timeouts.push(setTimeout(this.convertToButtonPress(challengeValue), 800 * x));
      }
      setTimeout(function() {
        game.enableButtons();
      }, 800 * count);
    },
    delayedDisplayChallenge: function delayedDisplayChallenge() {
      game.displayChallenge();
    },
    disableButtons: function disableButtons() {
      return $('.button').addClass('no-mouse');
    },

    enableButtons: function enableButtons() {
      return $('.button').removeClass('no-mouse');
    },
    convertToButtonPress: function convertToButtonPress(num) {
      if (num === 1) {
        return buttonPress.playGreen;
      }
      if (num === 2) {
        return buttonPress.playRed;
      }
      if (num === 3) {
        return buttonPress.playYellow;
      }
      if (num === 4) {
        return buttonPress.playBlue;
      }
    },
    displayCount: function displayCount() {
      $('.count').val(count);
    },
    strictStart: function strictStart() {
      if (!$('.strict').hasClass('strict-on')) {
        $('.strict').addClass('strict-on');
      }
      if ($('.start').hasClass('strict-on')) {
        $('.start').removeClass('strict-on');
      }
      challenge.length = 0;
      count = 1;
      strict = 1;
      game.start();
      game.displayChallenge();
    },
    checkPress: function checkPress(num) {
      if (num === challenge[numPresses]) {
        numPresses++;
        game.convertToButtonPress(num)();
        if (numPresses === count) {
          count++;
          if (count === 21) {
            buttonPress.displayWin();
            $('.count').val('WIN');
            game.disableButtons();
          } else {
            game.disableButtons();
            setTimeout(game.delayedDisplayChallenge, 1500);
          }
        }
      } else {
        if (strict === 1) {
          buttonPress.playError();
          $('.count').val('ERR');
          setTimeout(function() {
            game.strictStart();
          }, 2000);
        } else {
          buttonPress.playError();
          $('.count').val('ERR');
          setTimeout(game.delayedDisplayChallenge, 3000);
        }
      }
    },
    clearAllTimeouts: function() {
      timeouts.forEach(function(timer) {
        clearTimeout(timer);
      })
    }

  };

  var powerButton = {
    currentText: function currentText() {
      return $('.btn-power').text();
    },
    onText: "on",
    offText: "off",
    switchPower: function switchPower() {   
      if (this.currentText() === this.offText) {
        count = '';
        $('.btn-power').text(this.onText).toggleClass('power-on');
        $('.controls').addClass('no-mouse');
        if ($('.strict').hasClass('strict-on')) {
          $('.strict').removeClass('strict-on');
        }
        if ($('.start').hasClass('strict-on')) {
          $('.start').removeClass('strict-on');
        }   
        game.displayCount();
        game.disableButtons();
        game.clearAllTimeouts();

      } else {
        $('.btn-power').text(this.offText).toggleClass('power-on');
        $('.controls').removeClass('no-mouse');
      }
    }
  };

  var buttonPress = {
    playGreen: function playGreen() {
      $('.left-top-green').toggleClass('green-press');
      $('.audio-green')[0].play();
      setTimeout(function() {
        $('.left-top-green').toggleClass('green-press');
      }, 500);
    },
    playRed: function playRed() {
      $('.right-top-red').toggleClass('red-press');
      $('.audio-red')[0].play();
      setTimeout(function() {
        $('.right-top-red').toggleClass('red-press');
      }, 500);
    },
    playYellow: function playYellow() {
      $('.left-bottom-yellow').toggleClass('yellow-press');
      $('.audio-yellow')[0].play();
      setTimeout(function() {
        $('.left-bottom-yellow').toggleClass('yellow-press');
      }, 500);
    },
    playBlue: function playBlue() {
      $('.right-bottom-blue').toggleClass('blue-press');
      $('.audio-blue')[0].play();
      setTimeout(function() {
        $('.right-bottom-blue').toggleClass('blue-press');
      }, 500);
    },
    error: function error() {
      $('.left-top-green').toggleClass('green-press');
      $('.audio-green')[0].play();
      setTimeout(function() {
        $('.left-top-green').toggleClass('green-press');
      }, 500);
      $('.right-top-red').toggleClass('red-press');
      setTimeout(function() {
        $('.right-top-red').toggleClass('red-press');
      }, 500);
      $('.left-bottom-yellow').toggleClass('yellow-press');
      setTimeout(function() {
        $('.left-bottom-yellow').toggleClass('yellow-press');
      }, 500);
      $('.right-bottom-blue').toggleClass('blue-press');
      setTimeout(function() {
        $('.right-bottom-blue').toggleClass('blue-press');
      }, 500);
    },
    playError: function playError() {
      buttonPress.error();
      setTimeout(function() {
        buttonPress.error();
      }, 800);
      setTimeout(function() {
        buttonPress.error();
      }, 1600);
    },
    win: function win() {
      this.delayedPress(buttonPress.playGreen, 1);
      this.delayedPress(buttonPress.playRed, 2);
      this.delayedPress(buttonPress.playBlue, 3);
      this.delayedPress(buttonPress.playYellow, 4);
    },
    displayWin: function displayWin() {
      this.win();
      setTimeout(function() {
        buttonPress.win();
      }, 1500);
      setTimeout(function() {
        buttonPress.win();
      }, 2800);
    },
    delayedPress: function delayedPress(color, num) {
      setTimeout(function() {
        color();
      }, num * 300);
    }
  };

  $('.left-top-green').click(function() {
    game.checkPress(1);
  });

  $('.right-top-red').click(function() {
    game.checkPress(2);
  });

  $('.left-bottom-yellow').click(function() {
    game.checkPress(3);
  });

  $('.right-bottom-blue').click(function() {
    game.checkPress(4);
  });

  $('.btn-power').click(function() {
    powerButton.switchPower();
  });

  $('.start').click(function() {
    if ($('.strict').hasClass('strict-on')) {
      $('.strict').removeClass('strict-on');
    }
    if (!$('.start').hasClass('strict-on')) {
      $('.start').addClass('strict-on');
    }
    challenge.length = 0;
    count = 1;
    strict = 0;
    game.start();
    game.displayChallenge();
  });

  $('.strict').click(function() {
    game.strictStart();
  });

  game.disableButtons();

});