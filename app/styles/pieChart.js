var ctxP = document.getElementById("labelChart").getContext("2d");
var myPieChart = new Chart(ctxP, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
    datasets: [
      {
        data: [210, 130, 120, 160, 120],
        backgroundColor: [
          "#F7464A",
          "#46BFBD",
          "#FDB45C",
          "#949FB1",
          "#4D5360",
        ],
        hoverBackgroundColor: [
          "#FF5A5E",
          "#5AD3D1",
          "#FFC870",
          "#A8B3C5",
          "#616774",
        ],
      },
    ],
  },
  options: {
    responsive: true,
    legend: {
      position: "right",
      labels: {
        padding: 20,
        boxWidth: 10,
      },
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "white",
        labels: {
          title: {
            font: {
              size: "16",
            },
          },
        },
      },
    },
  },
});

module.exports = {
  ctxP,
  myPieChart,
};
