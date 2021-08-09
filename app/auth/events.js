const store = require("./../store");
const api = require("./api");
const ui = require("./ui");
const getFormFields = require("../../lib/get-form-fields");

const onSignUp = function (event) {
  event.preventDefault();

  const form = event.target;
  const data = getFormFields(form);

  api.signUp(data).then(ui.onSignUpSuccess).catch(ui.onSighUpFailure);
};

const onSignIn = function (event) {
  event.preventDefault();
  form = event.target;
  data = getFormFields(form);

  api.signIn(data).then(ui.onSignInSuccess).catch(ui.onSignInFailure);
};

const onSignOut = function (event) {
  event.preventDefault();
  api.signOut().then(ui.onSignOutSuccess).catch(ui.onSignOutFailure);
};

const onNewPortfolio = function(event) {
  event.preventDefault();
  const form = event.target;
  const data = getFormFields(form);
  console.log(data)

  api.newPortfolio(data)
    .then(ui.onNewPortfolioSuccess)
    .catch(ui.onNewPortfolioFailure);

}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onNewPortfolio,
};
