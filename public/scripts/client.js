/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);      // calls createTweetElement for each tweet
      $('#tweets-container').append($tweet);         // takes return value and appends it to the tweets container
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
      const serialized = $('#tweet-text').serialize();
      // console.log(serialized);
      $.post('/tweets', serialized);
    })
  })


  // Test / driver code (temporary)
  renderTweets(data);
});