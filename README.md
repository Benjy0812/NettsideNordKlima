# NordicWeather

A small single-page app that fetches temperature forecast data from the MET (locationforecast) API and displays it as a line chart.

## What it shows

- Current temperature and time for the configured coordinates.
- A 10-day temperature forecast line chart.

## Prerequisites

- Node.js (recommended) or Bun
- `bun` for installing dev dependencies

## Install

Run in the project root:

```bash
bun install
```

## Run (development)

- Start the dev server:

```bash
bun run dev
# or
bun run dev:open  # opens the browser automatically
```

Open `index.html` directly in a browser if you prefer not to run a dev server, though Chart.js (via CDN) will work without a bundler.

## Build

```bash
bun run build
```

## Format

```bash
bun run format
```

## Deploy

The project includes a `deploy` script that uses `gh-pages` to publish the `dist` folder.

```bash
bun run deploy
```

## Files of interest

- `index.html` — main HTML UI
- `script.js` — fetches data and renders the chart
- `style.css` — basic styling

## License

This project is private.
