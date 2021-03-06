const addEvents = require('./auth/events')
const store = require('./store')
let totalBalance = 0;
let cash = 0;
let bonds = 0;
let stocks = 0;
let ai = 0;

$(() => {
  $('#sign-up').on('submit', addEvents.onSignUp)
  $('#sign-in').on('submit', addEvents.onSignIn)
  $('#sign-out').on('submit', addEvents.onSignOut)
  $('#new-portfolio').on('submit', addEvents.onNewPortfolio)
  $('#show-data').on('submit', addEvents.onShowData)
  $('#change-password').on('submit', addEvents.onChangePassword)

  $('#account-info').on('click', '.delete-member', addEvents.onDeleteData)
  $('#account-info').on('submit', '.update-member', addEvents.onUpdateData)

  $('#sign-out').hide()
  $('#new-portfolio').hide()
  $('#show-data').hide()
  $('#change-password').hide()
  $(".portfolio-page").hide();
  $(".portfolio-graph").hide();
  $("#show-portfolio").hide()
  $("#show-portfolio").on("submit", (event) => {
    $(".portfolio-graph").show();
    event.preventDefault()
    setTimeout(function () {
      totalBalance = store.totalBalance;
      cash = (store.totalBalance * 0.1).toFixed(2);
      bonds = (store.totalBalance * 0.4).toFixed(2);
      stocks = (store.totalBalance * 0.3).toFixed(2);
      ai = (store.totalBalance * 0.2).toFixed(2);
      drawChart();
      drawChart2();
      drawChart3();
      drawChart4();
    }, 500);

  });


  $('.navbar_tooleBtn').on('click', () => {
    $('.navbar_menu').toggle('active')
    $('.navbar_icons').toggle('active')
  })

  $('.sign-message a').on('click', () => {
    $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow')
    $("#change-password").hide();
    $("#sign-out").hide();
  })
  $('.update-message').on('click', () => {
    $('#change-password').show()
  })
})


google.charts.load('current', { packages: ['corechart'] })
google.charts.setOnLoadCallback(drawChart)
function drawChart () {
  const data = google.visualization.arrayToDataTable([
    [`Total Account: ${totalBalance} `, 'Dollars'],
    [`Cash: $${cash}`, 30],
    [`Bonds: $${bonds}`, 40],
    [`Stocks: $${stocks}`, 15],
    [`Alternative Investments: $${ai}`, 15]
  ])

  const options = {
    title: 'Portfolio for Conservative Investor',
    is3D: true
  }

  const chart = new google.visualization.PieChart(
    document.getElementById('piechart_3d')
  )
  chart.draw(data, options)
}

google.charts.setOnLoadCallback(drawChart2)
function drawChart2 () {
  const data = google.visualization.arrayToDataTable([
    [`Total Account: ${totalBalance} `, 'Dollars'],
    [`Cash: $${cash}`, 10],
    [`Bonds: $${bonds}`, 40],
    [`Stocks: $${stocks}`, 30],
    [`Alternative Investments: $${ai}`, 20]
  ])

  const options = {
    title: 'Portfolio for Moderate Investor',
    is3D: true
  }

  const chart = new google.visualization.PieChart(
    document.getElementById('piechart_low')
  )
  chart.draw(data, options)
}

google.charts.setOnLoadCallback(drawChart3)
function drawChart3 () {
  const data = google.visualization.arrayToDataTable([
    [`Total Account: ${totalBalance} `, 'Dollars'],
    [`Cash: $${cash}`, 0],
    [`Bonds: $${bonds}`, 20],
    [`Stocks: $${stocks}`, 50],
    [`Alternative Investments: $${ai}`, 30]
  ])

  const options = {
    title: 'Portfolio for Aggresive Investor',
    is3D: true
  }

  const chart = new google.visualization.PieChart(
    document.getElementById('piechart_high')
  )
  chart.draw(data, options)
}

google.charts.setOnLoadCallback(drawChart4)
function drawChart4 () {
  const data = google.visualization.arrayToDataTable([
    [`Lottery Tickets: $${totalBalance} `, 'Dollars'],
    [`Lottery Tickets: $${totalBalance}`, 100]
  ])

  const options = {
    title: 'Portfolio for Impulsive Man',
    is3D: true
  }

  const chart = new google.visualization.PieChart(
    document.getElementById('piechart_crazy')
  )
  chart.draw(data, options)
}
