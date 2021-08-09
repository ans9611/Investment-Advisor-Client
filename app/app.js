const addEvents = require("./auth/events")

$(() => {
  $("#sign-up").on("submit", addEvents.onSignUp);
  $("#sign-in").on("submit", addEvents.onSignIn);
  $("#sign-out").on("submit", addEvents.onSignOut);
  $("#new-portfolio").on("submit", addEvents.onNewPortfolio);
  $("#show-data").on("submit", addEvents.onShowData);
});
