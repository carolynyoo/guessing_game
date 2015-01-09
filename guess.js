// remaining questions: this vs 'game' global variable, stack was not reset when resetting game
//.replaceWith() not working vs .text()

var game;
function Game () {
  this.guessCount = 5;
  this.correctNum = Math.floor((Math.random() * 100) + 1);
  this.stack=[]; 
  this.guess;
  $('#numGuesses').text(this.guessCount);
}


Game.prototype.numberCheck = function () {
  var that = this;
  $('input:submit').on('click', function (event) {
    that.guess=$('input:text').val();
    $("input:text").val("");
    event.preventDefault();
    if (isNaN(that.guess) || !that.guess.trim() || that.guess.length===0) {
      $('#warning').remove();
      $('.message').prepend($('<h5 id="warning">Not a number. Please input number between 1 and 100</h5>'));
    } else {
      that.guess=parseInt(that.guess, 10);
      $('#warning').remove();
      that.numberCompare();
    }
  })
}

Game.prototype.numberCompare = function () {
  var msg;
  if (this.guess < 1 || this.guess > 100) {
    $('.message').prepend($('<h5 id="warning">Please input number between 1 and 100</h5>'));
  } else if (game.stack.indexOf(this.guess) > -1) {
    $('.message').prepend($('<h5 id="warning">Already guessed. Please input new number</h5>'));
  } else if (game.guessCount === 0) {
    $(".message").prepend('<h5 id="warning">You have used all your guesses. Sorry!</h5>');
  } else if ($('#finalMsg').length) {
    $(".message").prepend('<h5 id="warning">You have already won. Play a new game!</h5>');
  } else {
    $('#warning').remove();
    $('.hintMsg').remove();
    game.guessCount--;
    $('#numGuesses').text(game.guessCount);
    game.stack.push(this.guess);

    var diff = Math.abs(this.guess-game.correctNum);
    if (diff===0) {
      correct();
    } else if (game.stack.length > 1) {
      var prevDiff = Math.abs(game.stack[game.stack.length-2]-game.correctNum);
    //  debugger;
      msg = $("<h5 class='msg'>"+hotterColder(prevDiff, diff)+hotCold(diff)+highLow()+"</h5>");
      $(".message").append(msg);
    } else {
      msg = $("<h5 class='msg'>"+hotCold(diff)+highLow()+"</h5>");
      $(".message").append(msg);
    }
  }
}

function hotCold (diff) {
  return diff <= 5 ? "Super Hot, " : diff <= 10  ? "Hot, " : diff <= 15 ? "Warm, " : diff <= 25 ? "Cold, " : "Super Cold, ";
}

function hotterColder (prevDiff, diff) {
  return prevDiff > diff ? "Getting hotter: " : "Getting colder: ";
}

function highLow () {
  return game.guess > game.correctNum ? "Guess Lower" : "Guess Higher";
}

function correct() {
  $('.hintMsg').remove();
  $('#msg').remove();
  $('.message').append($('<h4 id="finalMsg">Correct! You win!</h4>'));
  $('.main-bg').css('background-color', '#f2f2f2');
 }

Game.prototype.reset = function () {
  $('.reset').on ('click', function (event) {
    event.preventDefault();
    $('.main-bg').css('background-color', '');
    $('.hintMsg').remove();
    $('.msg').remove();
    $('#warning').remove();
    $('#finalMsg').remove();
    game = new Game();
  })
}

Game.prototype.hint = function () {
  $('.hint').on('click', function (event) {
    event.preventDefault();
    $('.hintMsg').remove();
    $('.message').prepend($('<h4 class="hintMsg">The answer is '+game.correctNum+'</h4>'));
  })
}

$(document).ready(function () {
  game = new Game();
  game.numberCheck();
  game.reset();
  game.hint();
})