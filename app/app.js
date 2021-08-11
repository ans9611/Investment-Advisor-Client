const addEvents = require("./auth/events")
const store = require("./store")

$(() => {
  $("#sign-up").on("submit", addEvents.onSignUp);
  $("#sign-in").on("submit", addEvents.onSignIn);
  $("#sign-out").on("submit", addEvents.onSignOut);
  $("#new-portfolio").on("submit", addEvents.onNewPortfolio);
  $("#show-data").on("submit", addEvents.onShowData);

  $("#account-info").on("click", ".delete-member", addEvents.onDeleteData);
  $("#account-info").on("submit", ".update-member", addEvents.onUpdateData);
  $(".box").on("click", addEvents.onAddRisk);

   $(".navbar_tooleBtn").on("click", () => {
     $(".navbar_menu").toggle("active");
     $(".navbar_icons").toggle("active");
   });



});

let totalBalance = 0;
let cash = 0;
let bonds = 0;
let stocks = 0;
let ai = 0
setTimeout(function () {
  console.log(store)
  console.log(store.totalBalance);
  totalBalance = store.totalBalance
  cash = (store.totalBalance * 0.1).toFixed(2);
  bonds = (store.totalBalance * 0.4).toFixed(2);
  stocks = (store.totalBalance * 0.3).toFixed(2);
  ai = (store.totalBalance * 0.2).toFixed(2);
  drawChart();
}, 9000);

 google.charts.load("current", { packages: ["corechart"] });
 google.charts.setOnLoadCallback(drawChart);
function drawChart() {
   var data = google.visualization.arrayToDataTable([
     [`Total Account: ${totalBalance} `, "Dollars"],
     [`Cash: $${cash}`, 10],
     [`Bonds: $${bonds}`, 40],
     [`Stocks: $${stocks}`, 30],
     [`Alternative Investments: $${ai}`, 20],
   ]);

   var options = {
     title: "Portfolio",
     is3D: true,
   };

   var chart = new google.visualization.PieChart(
     document.getElementById("piechart_3d")
   );
   chart.draw(data, options);
 }
