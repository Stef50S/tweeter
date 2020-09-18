/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  $('form').submit(function(event) {
    console.log("Button has been clicked, creating AJAX request.");
    event.preventDefault();
    let $submission = $('form').serialize();
    $.ajax({
      url: '/tweets/',
      method: 'POST',
      data: $submission,
      dataType: 'html',
      error: function() { // When no text is submitted
        if($submission.text === undefined) {
          alert("This tweet is empty. Please enter some text.");
        }
      }
    })
    .then(function() {
      console.log('Success! The tweet has been sent.');
      $('.tweet-container').empty(); // Avoid showing other tweets twice
      loadTweets();
    });
  });

  const createTweetElement = function(data) {
    const $tweet = $(`<article class="tweet"></article>`);
  
    const html =
     `<header class="user-info">
        <div>
          <img src="${data.user.avatars}" alt="User's Profile Picture">
          <p>${data.user.name}</p>
        </div>
        <p class="handle">${data.user.handle}</p>
      </header>
      <p>${escapeUnsafeText(data.content.text)}</p>
      <footer>
        <p>${data.created_at}</p>
        <div class="icons">
          <i class="fa fa-flag"></i>
          <i class="fa fa-retweet"></i>
          <i class="fa fa-heart"></i>
        </div>
      </footer>`;
    
    $tweet.append(html);
    return $tweet;
  }
  
  const renderTweets = function(tweets) {
    for(tweet of tweets) { 
      const htmlTweet = createTweetElement(tweet);
      $('.tweet-container').prepend(htmlTweet);
    }
  }

  const loadTweets = function() {
    $.ajax({
      url: '/tweets/',
      method: 'GET',
      dataType: 'json'
    })
    .then(function(response) {
      renderTweets(response);
    })
  }

  const escapeUnsafeText = function(input) {
    let paragraph = document.createElement('p');
    paragraph.appendChild(document.createTextNode(input));
    return paragraph.innerHTML;
  }

  loadTweets(); // Load tweets when user enters the page

});
