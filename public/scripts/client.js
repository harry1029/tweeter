/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      renderTweet(tweet);
    }
  }

  // Helper function that renders a single tweet
  const renderTweet = function(tweet) {
    const $tweet = createTweetElement(tweet);       // calls createTweetElement for each tweet
    $('#tweets-container').prepend($tweet);         // takes return value and appends it to the tweets container
    $("p.tw").first().text(tweet.content.text);     // Escape text to prevent XSS
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
        <p class="tw"></p>
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
      $('.error').css("display", "none");                                      // Reset position the error message after every click

      // Check for empty string and show error message
      if (!$('#tweet-text').val()) {
        $('.error > p').text("Please tweet something!");
        $('.error').slideDown("slow");
        return;
      }
      // Check when when counter going pass limit
      if ($('.counter').val() < 0) {
        $('.error > p').text("Exceed character limit! Please keep below 140 characters!");
        $('.error').slideDown("slow");
        return;
      }

      const serialized = $('#tweet-text').serialize();
      // console.log(serialized);
      const post = $.post('/tweets', serialized);                               // POST serialized data to server
      post.done(function() {                                                    // Calls render after POST to ensure last tweet is posted first
        render();
      });

      $("#new-tweet-form").trigger("reset");                                    // Reset form
      $(".counter").text(140);                                                  // Reset counter
    })
  })

  const render = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (data) => {
        console.log('this request succeeded and here\'s the data', data);
        renderTweet(data.at(-1));
      },
      error: (error) => {
        console.log('this request failed and this was the error', error);
      }
    });
  }

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