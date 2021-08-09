const store = require("./../store");
// const game = require('./../gameStore')

const onSignUpSuccess = (response) => {
  $("#message").text(
    `Thank you for signing Up! ${response.user.email} Sign in To play Game!!`
  );
};

const onSighUpFailure = () => {
  $("#message").text(`Unable to Sign Up...:( Check email or password`);
  $("#sign-up").trigger("reset");
};

const onSignInSuccess = (response) => {
  $("#message").text(`Welcome Back! ${response.user.email}`);
  store.token = response.user.token;
  store.id = response.user._id;
  $("#sign-up").trigger("reset");
  $("#sign-in").hide();
  $("#sign-up").hide();
  $("#sign-out").show();
  $("#new-game").show();
};

const onSignInFailure = () => {
  $("#message").text(`Unable to sign in :( check email or password again!`);

};

const onSignOutSuccess = () => {
  $("#message").text("Successfully Signed out! Thank you! Come Again!");

};
const onSignOutFailure = () => {
  $("#message").text(
    "Unable to Signed out! You are destined to play one more game :)"
  );
};

module.exports = {
  onSignUpSuccess,
  onSighUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure
};
