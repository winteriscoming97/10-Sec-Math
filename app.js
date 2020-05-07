var currentQuestion;
var max;
var score = 0;
var highScore = 0;
var interval;
var timeLeft = 10;

var randomGen = function (max) {
  return Math.ceil(Math.random() * max);
}

//converting checked boxes into array of symbols
var operationGen = function () {
  var operations =  [];

  $('form').children('input').get().forEach( function (operation) {
    if (operation.checked) {
      operations.push(operation.value);
    }
  });
  if (operations.length <= 0) {
    operations.push('+');
  }
  return operations;
}

var questionGen = function (max) {
  var question = {};
  var num1 = randomGen(max);
  var num2 = randomGen(max);
  var operation = operationGen();
  operation = operation[randomGen(operation.length - 1)];

  switch (operation) {
    case '+':
      question.answer = num1 + num2;
      question.equation = String(num1) + ' + ' + String(num2);
      break;
    case '-':
      question.answer = num1 - num2;
      question.equation = String(num1) + ' - ' + String(num2);
      break;
    case 'x':
      question.answer = num1 * num2;
      question.equation = String(num1) + ' * ' + String(num2);
      break;
    case '/':
      question.answer = num2;
      question.equation = String(num1 * num2) + ' / ' + String(num1);
      break;
  }



  console.log('Equation is: ' + question.equation);
  console.log('Answer is: ' + question.answer);
  return question;
}

var newQuestion = function (max) {
  currentQuestion = questionGen(max);
  $('.problem').text(currentQuestion.equation);
}

var startGame = function () {
  if (!interval) {
    if (timeLeft === 0) {
      updateTimeLeft(10);
    }
    interval = setInterval(function () {
    updateTimeLeft(-1);
    $('.time').text(timeLeft);
    if (timeLeft === 0) {
      clearInterval(interval);
      interval = undefined;
      if (highScore < score) {
        highScore = score;
      }
      score = 0;
      $('.current-score').text('Current Score: ' + score);
      $('.high-score').text('High Score: ' + highScore);
    }
    console.log(timeLeft);
    }, 1000);
  }
}


var updateTimeLeft = function (amount) {
  timeLeft += amount;
  $('.time').text(timeLeft);
}

var checkAnswer = function (userInput, answer) {
  if (Number(userInput) === answer) {
    score++;
    $('.user-input').val('');
    updateTimeLeft(1);
    newQuestion(max);
    $('.current-score').text('Current Score: ' + score);
  }
}


//Start
$(document).ready(function () {
  max = $('#numRange').val();
  $('label').last().text(max);
  newQuestion(max);
  operationGen();
  $('.user-input').keyup(function () {
    startGame();
    checkAnswer($(this).val(), currentQuestion.answer);
  });

  $('#numRange').change(function () {
    max = $(this).val();
    $('label').last().text(max);
  });
});
