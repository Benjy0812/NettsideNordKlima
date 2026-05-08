let chart;

async function fetchWeather() {
  // Get latitude and longitude from input fields, round to 4 decimals for better API caching
  const lat = parseFloat(document.getElementById("lat").value).toFixed(4);
  const lon = parseFloat(document.getElementById("lon").value).toFixed(4);
  const res = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
  );
  const data = await res.json();

  // Show location and latest temperature
  const latest = data.properties.timeseries[0];
  const latestTemp = latest.data.instant.details.air_temperature;
  const latestTime = new Date(latest.time).toLocaleTimeString("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("temp").textContent =
    `${latestTemp} °C kl. ${latestTime}`;

  // Make a series of time and temperature for the next 24 hours (48 data points)
  const series = data.properties.timeseries.map((t) => ({
    time: new Date(t.time),
    temp: t.data.instant.details.air_temperature,
  }));

  // Make labels and data arrays for Chart.js
  const labels = series.map((d) =>
    d.time.toLocaleString("no-NO", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  const temps = series.map((d) => d.temp);

  // Render the chart, destroy previous if it exists
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
    options: { responsive: true, maintainAspectRatio: false },
  });
}

// Get and show weather data when the page loads
fetchWeather();
