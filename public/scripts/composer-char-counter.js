$(document).ready(function() {

  $('#tweet-text').keyup(function() {
    const $maxValue = 140;
    let $currentValue = $maxValue - $(this).val().length; // Get remaining characters
    let $counterOutput = $(this).parent().parent().children('div').children('output'); // Traverse from textarea to output tag (HTML)

    if($currentValue < 0) {
      $counterOutput.css('color', 'red');
      $counterOutput.empty();
      $counterOutput.append(`<output name="counter" class="counter" for="tweet-text">${$currentValue}</output>`);
    } else {
      $counterOutput.css('color', '#545149');
      $counterOutput.empty();
      $counterOutput.append(`<output name="counter" class="counter" for="tweet-text">${$currentValue}</output>`);
    }
  });
});