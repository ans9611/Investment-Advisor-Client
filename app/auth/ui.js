const store = require("../store");
const api = require("./api");
const app = require("../app")

const storeData = function (response) {
  store.member = response.member;
  let tableFirst =
  `<table class="styled-table">
    <thead>
        <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Balance</th>
            <th>Update</th>
            <th>Delete</th>
        </tr>
    </thead>`;

  store.memberHtml = "";
  let tableLast = `</table>`;

    store.member.forEach((member) => {
      store.memberHtml += `
    <tbody>
        <tr>
            <td>2016</td>
            <td>${member.name}</td>
            <td>${member.balance}</td>
            <td><form class='update-member' data-id=${member._id}>
      <input name="member[balance]" type="balance" placeholder="balance">
      <input type="submit" value="Update">
      </td>
            <td><button class='delete-member' data-id=${member._id}>Remove</button></td>
      </tr>
    </tbody>
`;});

  let table = tableFirst + store.memberHtml + tableLast;

  $("#account-info").html(table);
};



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
$("#new-portfolio").show();
   $("#show-data").show();
   $("#sign-in").hide()
   $("#sign-out").show()

};

const onSignInFailure = () => {
  $("#message").text(`Unable to sign in :( check email or password again!`);

};

const onSignOutSuccess = () => {
  $("#message").text("Successfully Signed out! Thank you! Come Again!");
  $("#sign-out").hide();
  $("#new-portfolio").hide();
  $("#show-data").hide();
  $("#sign-in").show()
  $("#account-info").hide();
};
const onSignOutFailure = () => {
  $("#message").text(
    "Unable to Signed out! :)"
  );
};

const onChangePasswordSuccess = () => {
  $("#message").text("Successfully Changed Password!");
}

const onChangePasswordFailure = () => {
  $("#message").text("Not Successfully Changed Password!");
};

const onNewPortfolioSuccess = (response) => {
  console.log(response)
  store.balance = response.member.balance
  store.risk = response.member.risk;
  store.name = response.member.name;
  console.log(store.name)
  console.log(store)
   const data = response.member;
   let totalBalance = 0;
   for (let i = 0; i < data.length; i++) {
     let num = Number(data[i].balance);
     totalBalance += num;
   }
$("#new-portfolio").show();
  $("#message").text("Successfully Get the portfolio");
};


const onNewPortfolioFailure = () => {
  $("#message").text(`Unable to get Portfolio`);
};

const onShowDataSuccess = (response) => {
  const data = response.member
  let totalBalance = 0
  for (let i = 0; i < data.length; i++) {
    let num = Number(data[i].balance);
    totalBalance += num;
  }
  console.log(data)
  console.log(totalBalance);
  app.totalBalance = totalBalance
  $("#message").text("Successfully Get the Data");
  storeData(response)

     store.totalBalance = totalBalance;
     console.log(store.totalBalance);
     $("#account-info").show()
};





const onShowDataFailure = () => {
  $("#message").text("Unable to Get the Data");
};


const onDeleteDataSuccess = () => {
  $("#message").text("Data Deleted!");
  api.showData().then(storeData);
};

const onDeleteDataFailure = () => {
  $("#message").text("Unable to delete the Data");
};

const onUpdateDataSuccess = (response) => {
   $("#message").text("Data Updated!");
   api.showData().then(storeData);
}
const onUpdateDataFailure = () => {
  $("#message").text("Unable to Update the Data");
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
  onShowDataFailure,
  onDeleteDataSuccess,
  onDeleteDataFailure,
  onUpdateDataSuccess,
  onUpdateDataFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
};
