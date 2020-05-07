var currentQuestion;
var max;
var score = 0;
var highScore = 0;
var timeLeft = 10;

var randomGen = function (max) {
  return Math.ceil(Math.random() * max);
}

var questionGen = function (max) {
  var question = {};
  var num1 = randomGen(max);
  var num2 = randomGen(max);

  question.answer = num1 + num2;
  question.equation = String(num1) + ' + ' + String(num2);
  console.log('Equation is: ' + question.equation);
  console.log('Answer is: ' + question.answer);
  return question;
}

var newQuestion = function (max) {
  currentQuestion = questionGen(max);
  $('.problem').text(currentQuestion.equation);
}

var checkAnswer = function (userInput, answer) {
  if (Number(userInput) === answer) {
    score++;
    $('.user-input').val('');
    newQuestion(max);
    $('.current-score').text('Current Score: ' + score);
  }
}

var interval = setInterval(function () {
  timeLeft--;
  $('.time').text(timeLeft);
  if (timeLeft === 0) {
    clearInterval(interval);
  }
  console.log(timeLeft);
}, 1000);


//Start
$(document).ready(function () {
  max = $('#numRange').val();
  $('label').last().text(max);
  newQuestion(max);

  $('.user-input').keyup(function () {
    checkAnswer($(this).val(), currentQuestion.answer);
  });

  $('#numRange').change(function () {
    max = $(this).val();
    $('label').last().text(max);
  });
});
