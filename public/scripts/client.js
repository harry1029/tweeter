/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);      // calls createTweetElement for each tweet
      $('#tweets-container').prepend($tweet);         // takes return value and appends it to the tweets container
    }
  }

  /* Takes in tweet object and return a tweet <article> element */
  const createTweetElement = function(tweet) {
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div>
          <img src="${tweet.user.avatars}" alt="avatar.png">
          ${tweet.user.name}
        </div>
        ${tweet.user.handle}
      </header>
      <div class="tweet-content">
        <p>${tweet.content.text}</p>
      </div>
      <footer>
        <p>${timeago.format(tweet.created_at)}</p>
        <div>
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);
    return $tweet;
  }
  // Listens to form submit and send serialized data to the server
  $(function() {
    $('#new-tweet-form').submit(function(event) {
      event.preventDefault();
      // Check for empty string
      if (!$('#tweet-text').val()) {
        alert("Invalid entry!");
        return;
      }
      // Check when when counter going pass limit
      if ($('.counter').val() < 0) {
        alert("Passed maximum allowed characters!")
        return;
      }

      const serialized = $('#tweet-text').serialize();
      // console.log(serialized);
      $.post('/tweets', serialized);                                  // POST serialized data to server
      $.getJSON('/tweets', function(tweet) {
        const $tweet = createTweetElement(tweet.at(-1));              // Create tweet element from last position of the DOM
        $('#tweets-container').prepend($tweet);                       // Prepend the created tweet in front of html container
      })

      $("#new-tweet-form").trigger("reset");                          // Reset form
      $(".counter").text(140);                                        // Reset counter
    })
  })

  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('this request succeeded and here\'s the data', data);
        renderTweets(data);
      },
      error: (error) => {
        console.log('this request failed and this was the error', error);
      }
    });
  }


  // Test / driver code (temporary)
  loadTweets();
});