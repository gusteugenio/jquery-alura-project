
var digitationField = $('.digitationField');
var initialTime = $('#digitationTime').text();
var intervalId;

$(function() {
  updatePhraseSize();
  setCounters();
  setTimer();
  $("#resetButton").click(resetGame);
});

function updatePhraseSize() {
  var frase = $(".phrase").text();
  /* /\S+/ is a regular expression to not count whitespace */
  var numWords = frase.split(/\S+/).length - 1;
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
        digitationField.attr("disabled", true);
        clearInterval(intervalId);
      }
    }, 1000)
  })
}

function resetGame() {
  clearInterval(intervalId);
  digitationField.attr("disabled", false);
  digitationField.val("");

  $("#characterCount").text("0")
  $("#wordCount").text("0");

  $('#digitationTime').text(initialTime);
  setTimer();
}
