let chart;

async function fetchWeather() {
  // Hent bredde- og lengdegrad fra input-feltene
  const lat = parseFloat(document.getElementById("lat").value).toFixed(4);
  const lon = parseFloat(document.getElementById("lon").value).toFixed(4);
  const res = await fetch(
    `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${lon}`,
  );
  const data = await res.json();

  // Vis siste temperatur og tidspunkt
  const latest = data.properties.timeseries[0];
  const latestTemp = latest.data.instant.details.air_temperature;
  const latestTime = new Date(latest.time).toLocaleTimeString("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
  document.getElementById("temp").textContent =
    `${latestTemp} °C kl. ${latestTime}`;

  // Lag dataserie for grafen
  const series = data.properties.timeseries.map((t) => ({
    time: new Date(t.time),
    temp: t.data.instant.details.air_temperature,
  }));

  // Lag grafen
  const labels = series.map((d) =>
    d.time.toLocaleString("no-NO", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
    }),
  );
  const temps = series.map((d) => d.temp);

  // Ødelegg eksisterende graf hvis den finnes
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

// Hent og vis værdata ved innlastning
fetchWeather();
