const addEvents = require("./auth/events")

$(() => {
  $("#sign-up").on("submit", addEvents.onSignUp);
  $("#sign-in").on("submit", addEvents.onSignIn);
  $("#sign-out").on("submit", addEvents.onSignOut);
  $("#new-portfolio").on("submit", addEvents.onNewPortfolio);
  $("#show-data").on("submit", addEvents.onShowData);

  $("#account-info").on("click", ".delete-member", addEvents.onDeleteData);
  $("#account-info").on("submit", ".update-member", addEvents.onUpdateData);

   $(".navbar_tooleBtn").on("click", () => {
     $(".navbar_menu").toggle("active");
     $(".navbar_icons").toggle("active");
   });


 
});
