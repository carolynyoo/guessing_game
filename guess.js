var correctNum = Math.floor((Math.random() * 100) + 1);
var guessCount=0;
var stack=[];

$(document).ready(function {
  var guess=$('#guess-field').val();
  if (guess < 1 || guess > 100) {
    $('.message').prepend($('<h4>Please input a number between 1 and 100</h4>'));
  } else if (stack.indexOf(guess) > -1) {
    $('.message').prepend($('<h4>Please input a new guess</h4>'));
  } else if (guess===correctNum) {
    $('.message').prepend($('<h4>Correct! You win!</h4>'));
  } else if (guess < correctNum) {
    $('message').prepend($('<h4>Cold: guess higher</h4>'));
  } else {
    $('message').prepend($('<h4>Hot: guess lower</h4>'));
  }
})