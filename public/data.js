document.getElementById("camera").addEventListener("click", () => {
  window.location.href = "camera.html";
});

document.getElementById("schedule").addEventListener("click", () => {
  window.location.href = "schedule.html";
});

document.getElementById("chatbot").addEventListener("click", () => {
  window.location.href = "chatbot.html";
});

document.getElementById("profile").addEventListener("click", () => {
  window.location.href = "profile.html";
});

const lineXValues = [10, 20, 30, 40, 50];
const lineYValues = [7, 10, 8, 12, 15];

new Chart("lineChart", {
  type: "line",
  data: {
    labels: lineXValues,
    datasets: [
      {
        data: lineYValues,
        backgroundColor: "rgb(0,0,255)",
        fill: false,
      },
    ],
  },
});

var barXValues = ["Italy", "France", "Spain", "USA", "Argentina"];
var barYValues = [55, 49, 44, 24, 15];
var barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("barChart", {
  type: "bar",
  data: {
    labels: barXValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: barYValues,
      },
    ],
  },
});
