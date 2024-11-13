
var digitationField = $('.digitationField');
var initialTime = $('#digitationTime').text();
var phrase = $(".phrase").text();
var intervalId;

$(function() {
  updatePhraseSize();
  setCounters();
  setTimer();
  $("#resetButton").click(resetGame);
  initializeMarkers();
});

function updatePhraseSize() {
  /* /\S+/ is a regular expression to not count whitespace */
  var numWords = phrase.split(/\S+/).length - 1;
  var phraseSize = $("#phraseSize");
  phraseSize.text(numWords); 
}

function setCounters() {
  digitationField.on("input", function() {
    var text = digitationField.val();
    var characterCount = text.length;
    var wordCount = text.split(/\S+/).length - 1;
  
    $("#characterCount").text(characterCount);
    $("#wordCount").text(wordCount);
  })
}

function setTimer() {
  var digitationTime = initialTime;

  digitationField.one("focus", function() {
    intervalId = setInterval(function() {
      digitationTime--;
      $('#digitationTime').text(digitationTime);
  
      if (digitationTime < 1) {
        clearInterval(intervalId);
        endGame();
      }
    }, 1000)
  })
}

function endGame() {
  digitationField.attr("disabled", true);
  digitationField.addClass("disabled-field");
  insertIntoScore();
}

function initializeMarkers() {
  digitationField.on("input", function() {
    var enteredValue =  digitationField.val();
    var valueToCompare = phrase.substr(0, enteredValue.length);
  
    if (valueToCompare == enteredValue) {
      digitationField.removeClass("wrong-value");
      digitationField.addClass("right-value");
    }
    else {
      digitationField.removeClass("right-value");
      digitationField.addClass("wrong-value");
    }
  });
}

function resetGame() {
  clearInterval(intervalId);
  digitationField.attr("disabled", false);
  digitationField.removeClass("disabled-field");
  digitationField.val("");

  $("#characterCount").text("0")
  $("#wordCount").text("0");

  $('#digitationTime').text(initialTime);
  setTimer();
}

