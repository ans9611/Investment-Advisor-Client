const store = require("./../store");
const config = require("./../config");

const signUp = function (data) {
  return $.ajax({
    url: config.apiUrl + "/sign-up",
    method: "POST",
    data: data,
  });
};

const signIn = function (data) {
  return $.ajax({
    url: config.apiUrl + "/sign-in",
    method: "POST",
    data: data,
  });
};

const signOut = function () {
  return $.ajax({
    url: config.apiUrl + "/sign-out",
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + store.token,
    },
  });
};

const newPortfolio = function (data) {
  return $.ajax({
    url: config.apiUrl + "/members",
    method: "POST",
    headers: {
      Authorization: "Bearer " + store.token,
    },
    data: data,
  });
};

const showData = function () {
    return $.ajax({
      url: config.apiUrl + "/members",
      method: "GET",
      headers: {
        Authorization: "Bearer " + store.token,
      },
    });
}

module.exports = {
  signUp,
  signIn,
  signOut,
  newPortfolio,
  showData
}
