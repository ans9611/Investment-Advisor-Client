const store = require("./../store");

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

};

const onSignInFailure = () => {
  $("#message").text(`Unable to sign in :( check email or password again!`);

};

const onSignOutSuccess = () => {
  $("#message").text("Successfully Signed out! Thank you! Come Again!");

};
const onSignOutFailure = () => {
  $("#message").text(
    "Unable to Signed out! :)"
  );
};

const onNewPortfolioSuccess = () => {
  $("#message").text("Successfully Get the portfolio");
}

const onNewPortfolioFailure = () => {
  $("#message").text(`Unable to get Portfolio`);
};

const onShowDataSuccess = () => {
   $("#message").text("Successfully Get the Data");
}
const onShowDataFailure = () => {
  $("#message").text("Unable to Get the Data");
};

module.exports = {
  onSignUpSuccess,
  onSighUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onNewPortfolioSuccess,
  onNewPortfolioFailure,
  onShowDataSuccess,
  onShowDataFailure
};
