//.replaceWith() not working vs .text()

// when the new keyword is used
// it sets "this" = {}
// if nothing else is returned, it returns "this"(which is the populated object);
// function constructor(name){
//   // this = {}
//   this.name = name;
//   this.sayHey = function(){
//     return this.name;
//   }
//   // return this
// }


function Game () {
  this.guessCount = 5;
  this.correctNum = Math.floor((Math.random() * 100) + 1);
  this.stack=[]; 
  this.guess;
  $('#numGuesses').text(this.guessCount);
}

// game.numberCheck();

Game.prototype.numberCheck = function () {
  var that = this;
  $('input:submit').off().on('click', function (event) {
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
  //.bind(this))
}

Game.prototype.numberCompare = function () {
  //debugger;
  var msg;
  if (this.guess < 1 || this.guess > 100) {
    $('.message').prepend($('<h5 id="warning">Please input number between 1 and 100</h5>'));
  } else if (this.stack.indexOf(this.guess) > -1) {
    $('.message').prepend($('<h5 id="warning">Already guessed. Please input new number</h5>'));
  } else if (this.guessCount === 0) {
    $(".message").prepend('<h5 id="warning">You have used all your guesses. Sorry!</h5>');
  } else if ($('#finalMsg').length) {
    $(".message").prepend('<h5 id="warning">You have already won. Play a new game!</h5>');
  } else {
    $('#warning').remove();
    $('.hintMsg').remove();
    this.guessCount--;
    $('#numGuesses').text(this.guessCount);
    this.stack.push(this.guess);

    var diff = Math.abs(this.guess-this.correctNum);
    if (diff===0) {
      correct();
    } else if (this.stack.length > 1) {
      var prevDiff = Math.abs(this.stack[this.stack.length-2]-this.correctNum);
    //  debugger;
      msg = $("<h5 class='msg'>"+hotterColder(prevDiff, diff)+hotCold(diff)+this.highLow()+"</h5>");
      $(".message").append(msg);
    } else {
      msg = $("<h5 class='msg'>"+hotCold(diff)+this.highLow()+"</h5>");
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

Game.prototype.highLow = function () {
  return this.guess > this.correctNum ? "Guess Lower" : "Guess Higher";
}

function correct() {
  $('.hintMsg').remove();
  $('#msg').remove();
  $('.message').append($('<h4 id="finalMsg">Correct! You win!</h4>'));
  $('.main-bg').css('background-color', '#f2f2f2');
 }

Game.prototype.reset = function () {
  event.preventDefault();
  $('.main-bg').css('background-color', '');
  $('.hintMsg').remove();
  $('.msg').remove();
  $('#warning').remove();
  $('#finalMsg').remove();
  return new Game();
}

// Game.prototype.hint = function () {
//   var that=this;
//   $('.hint').on('click', function (event) {
//     event.preventDefault();
//     $('.hintMsg').remove();
//     $('.message').prepend($('<h4 class="hintMsg">The answer is '+that.correctNum+'</h4>'));
//   })
//  //.bind(this))
// }

$(document).ready(function () {
  var game = new Game();
  $('.reset').on ('click', function (event) {
    game = game.reset();
    game.numberCheck();
  })
  $('.hint').on('click', function (event) {
    event.preventDefault();
    $('.hintMsg').remove();
    $('.message').prepend($('<h4 class="hintMsg">The answer is '+game.correctNum+'</h4>'));
  })
  game.numberCheck();
})
