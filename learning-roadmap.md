# Weather Project Learning Roadmap

You’re in a great spot already. This roadmap is based on your current weather + calculator projects.

## What you already do well

- `async/await` + `fetch`
- API integration (MET + Nominatim)
- DOM updates from live data
- Event listeners + basic UI structure
- Vite workflow

## What to learn next

### 1) App structure (biggest upgrade)

Split `script.js` into modules:

- `api.js`
- `ui.js`
- `state.js`
- `main.js`

### 2) State management (no framework yet)

Use one state object for:

- selected city
- unit (`C` / `F`)
- forecast range
- loading
- error

Render from state instead of scattered DOM writes.

### 3) Better UX patterns

- loading spinner
- error banner (not only `alert`)
- disable button while fetching
- retry button

### 4) Data handling

- validate input before fetch
- transform API response into your own clean format
- consistent unit conversion everywhere

### 5) Local persistence

- save last city + unit in `localStorage`
- restore on page load

### 6) Accessibility + keyboard support

- Enter key in location input
- visible focus states
- better ARIA labels

### 7) Testing basics

Start with pure helper functions:

- `celsiusToFahrenheit()`
- `formatWind()`
- `parseWeatherResponse()`

## Best next project: Weather Dashboard v2

Build on this project and add:

- city search + recent 5 searches
- 24h / 7-day toggle
- °C / °F toggle
- loading / error / empty states
- chart metric switch (temperature, wind, humidity)
- “Use my location” (Geolocation API)
- `localStorage` persistence

This gives you real practice in structure, state, async flows, browser APIs, and data visualization.

## Step-by-step build guide (with small code patterns)

Use these as building blocks. Don’t copy-paste everything at once—build one feature at a time.

### 1) Refactor to modules first

Create files:

- `src/main.js`
- `src/state.js`
- `src/api.js`
- `src/ui.js`
- `src/utils.js`

In `state.js` start simple:

```js
export const state = {
  city: 'Tromsø',
  unit: 'C',
  range: '24h',
  metric: 'temp',
  loading: false,
  error: null,
  weather: null,
  recent: [],
}
```

In `main.js`, use one flow function:

```js
async function loadWeather(city) {
  state.loading = true
  state.error = null
  render(state)

  try {
    const coords = await getCoords(city)
    const raw = await getForecast(coords)
    state.weather = normalizeWeather(raw)
  } catch (err) {
    state.error = err.message
  } finally {
    state.loading = false
    render(state)
  }
}
```

### 2) Add loading + error UI

In HTML add placeholders:

```html
<p id="status" aria-live="polite"></p>
<p id="error" role="alert"></p>
```

In `render(state)`:

```js
statusEl.textContent = state.loading ? 'Loading weather...' : ''
errorEl.textContent = state.error ?? ''
searchBtn.disabled = state.loading
```

### 3) City search + Enter key

Pattern:

```js
searchBtn.addEventListener('click', () => loadWeather(input.value.trim()))
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') loadWeather(input.value.trim())
})
```

Validate input before fetching:

```js
if (!city || city.length < 2) {
  state.error = 'Please enter a valid city name'
  render(state)
  return
}
```

### 4) Unit toggle (°C/°F)

Utility function:

```js
export function toF(c) {
  return (c * 9) / 5 + 32
}
```

Rendering idea:

```js
const temp = state.unit === 'C' ? item.tempC : toF(item.tempC)
const symbol = state.unit === 'C' ? '°C' : '°F'
```

### 5) Recent searches (max 5)

When weather loads successfully:

```js
state.recent = [city, ...state.recent.filter((c) => c !== city)].slice(0, 5)
```

Render buttons from array and reuse `loadWeather(city)` on click.

### 6) localStorage persistence

Save:

```js
localStorage.setItem(
  'weather_settings',
  JSON.stringify({
    city: state.city,
    unit: state.unit,
    recent: state.recent,
  }),
)
```

Restore on startup:

```js
const saved = JSON.parse(localStorage.getItem('weather_settings') || 'null')
if (saved) Object.assign(state, saved)
```

### 7) 24h / 7-day range toggle

Keep all forecast points in `state.weather`, then filter for display:

```js
function getVisiblePoints(points, range) {
  return range === '24h' ? points.slice(0, 24) : points.slice(0, 7 * 24)
}
```

(If your API steps are not hourly, adjust by timestamps instead of `slice`.)

### 8) Chart metric switch (temp/wind/humidity)

Select metric from state:

```js
function pickMetric(point, metric) {
  if (metric === 'wind') return point.wind
  if (metric === 'humidity') return point.humidity
  return point.tempC
}
```

Map data for chart:

```js
const labels = visiblePoints.map((p) => p.timeLabel)
const values = visiblePoints.map((p) => pickMetric(p, state.metric))
```

### 9) Geolocation button

Pattern:

```js
navigator.geolocation.getCurrentPosition(
  async ({ coords }) => {
    const raw = await getForecast({
      lat: coords.latitude,
      lon: coords.longitude,
    })
    state.weather = normalizeWeather(raw)
    render(state)
  },
  () => {
    state.error = 'Could not access your location'
    render(state)
  },
)
```

### 10) Normalize API response once

Do this in `normalizeWeather(raw)` so UI code stays clean:

```js
return timeseries.map((t) => ({
  time: t.time,
  timeLabel: new Date(t.time).toLocaleString(),
  tempC: t.data.instant.details.air_temperature,
  wind: t.data.instant.details.wind_speed,
  humidity: t.data.instant.details.relative_humidity,
}))
```

---

## Recommended build order (do this exact order)

1. Refactor into modules
2. Add loading + error states
3. Add search + Enter key
4. Add unit toggle
5. Add recent searches
6. Add localStorage restore/save
7. Add range toggle (24h/7-day)
8. Add metric switch for chart
9. Add geolocation button
10. Final cleanup + deploy

If you get stuck, debug in this order:

- check console errors first
- log API response shape
- test helper functions separately
- then test full UI flow

## Suggested 4-week plan

### Week 1

- Refactor into modules
- Add loading + error states

### Week 2

- Add unit toggle
- Add `localStorage`
- Add recent searches

### Week 3

- Add chart metric switching
- Add geolocation support

### Week 4

- Add helper-function tests
- Polish UI
- Deploy

## After this project

Rebuild your calculator with cleaner architecture:

- remove inline `onclick`
- use event delegation
- add keyboard input
- add history + memory buttons (`M+`, `MR`, `MC`)
- save history to `localStorage`
