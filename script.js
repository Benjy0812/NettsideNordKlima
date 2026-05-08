let chart;

async function fetchWeather() {
  const lat = parseFloat(document.getElementById("lat").value).toFixed(4);
  const lon = parseFloat(document.getElementById("lon").value).toFixed(4);
  const res = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
  );
  const data = await res.json();
  const timeseries = data.properties.timeseries;

  const latest = timeseries[0];
  document.getElementById("temp").textContent =
    `${latest.data.instant.details.air_temperature} °C kl. ` +
    new Date(latest.time).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const labels = timeseries.map((t) =>
    new Date(t.time).toLocaleString("no-NO", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  const temps = timeseries.map((t) => t.data.instant.details.air_temperature);

  if (chart) chart.destroy();
  chart = new Chart(document.getElementById("chart"), {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Temperatur (°C)",
          data: temps,
          borderColor: "#378ADD",
          fill: false,
          tension: 0.3,
        },
      ],
    },
    options: { responsive: true, maintainAspectRatio: true },
  });

  return data;
}

function downloadJSON(data, filename = "weather-data.json") {
  const a = Object.assign(document.createElement("a"), {
    href: URL.createObjectURL(
      new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
    ),
    download: filename,
  });
  a.click();
  URL.revokeObjectURL(a.href);
}

document
  .getElementById("fetch-weather")
  .addEventListener("click", () => fetchWeather());
document
  .getElementById("download-json")
  .addEventListener("click", async () => downloadJSON(await fetchWeather()));

fetchWeather();
