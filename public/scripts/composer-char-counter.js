$(document).ready(function() {
  const $textForm = $("#tweet-text");

  $textForm.on('input', function() {                             // Note: Use function() instead of => whenever you need context of 'this'
    const maxStr = 140;
    let counter = $(this).parent().find('.counter').val();       // Using 'this' to travel within DOM tree and find counter value
    let letterCount = event.target.value.length;
    counter = maxStr - letterCount;
    $(this).parent().find('.counter').text(counter);             // Update the html text with value

    // Change counter to color red if it reaches below 0
    if (counter < 0) {
      $(this).parent().find('.counter').css("color", "red");
    } else {
      $(this).parent().find('.counter').css("color", "");
    }
  });
});