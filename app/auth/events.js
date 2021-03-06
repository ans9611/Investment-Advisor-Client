const store = require("../store");
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
  api.signOut().then(ui.onSignOutSuccess).catch(ui.onSignOutFailure);
};

const onNewPortfolio = function(event) {
  event.preventDefault();
  const form = event.target;
  const data = getFormFields(form);

  store.balance = data.member.balance;

  api
    .newPortfolio(data)
    .then(ui.onNewPortfolioSuccess)
    .catch(ui.onNewPortfolioFailure);
}

const onAddRisk = function(event) {
  event.preventDefault();
  const box = $(event.target)
  const risk = box.data("risk")
  let data = {
    member: {
      risk: risk
    }}
    api.newPortfolio(data)
      .then(ui.onNewPortfolioSuccess)
      .catch(ui.onNewPortfolioFailure);

}

const onShowData = function(event) {
  event.preventDefault();
  api.showData()
  .then(ui.onShowDataSuccess);
  // .catch(ui.onShowDataFailure);
}

const onDeleteData = function (event) {
  event.preventDefault();

  store.memberID = $(event.target).data("id");

  api.deleteData(store.memberID)
    .then(ui.onDeleteDataSuccess)
    .catch(ui.onDeleteDataFailure);
};


const onUpdateData = function (event) {
  event.preventDefault();

  const form = event.target;
  const data = getFormFields(form);
  const id = $(event.target).data("id");

   api.updateData(id, data)
     .then(ui.onUpdateDataSuccess)
     .catch(ui.onUpdateDataFailure);
}

const onChangePassword = function (event) {
  event.preventDefault()

  const form = event.target;
  const data = getFormFields(form);

  api
    .onChangePassword(data)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure);
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onNewPortfolio,
  onShowData,
  onDeleteData,
  onUpdateData,
  onAddRisk,
  onChangePassword,
};
