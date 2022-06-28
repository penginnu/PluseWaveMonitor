import { Chart } from "chart.js";
import ChartStreaming from "chartjs-plugin-streaming";

Chart.register(ChartStreaming);

function pluseHeart() {
  document.getElementById("heart")!.animate([
    { transform: "scale(1, 1)" },
    { transform: "scale(1.2, 1.2)" },
    { transform: "scale(1, 1)" }
  ], {
    duration: 300
    });
}