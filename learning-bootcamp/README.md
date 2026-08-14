# Learning Bootcamp

An Arabic React learning platform with roadmaps, schedules, quizzes, browser-based labs, security exercises, and a CTF tracker. The frontend stores personal progress in browser local storage. CTF data is held in a bounded in-memory list by the local API and resets when that process stops.

## Requirements

- Node.js 20.19 or newer (Node.js 22.12+ is also supported)
- npm 11 or a compatible npm release

## Development

Install both projects:

```bash
npm ci
npm --prefix backend ci
```

Run the API in one terminal:

```bash
npm --prefix backend run dev
```

Run the frontend in another terminal:

```bash
npm run dev
```

Vite serves the frontend at `http://localhost:5173` and proxies `/api` requests to the API at `http://localhost:3001`.

The API binds to `127.0.0.1` by default. Set `HOST` explicitly only when another interface is required, for example `HOST=0.0.0.0`. The API has no authentication and is intended only for local development; exposing it lets any reachable client read or modify its in-memory data.

## Checks

```bash
npm run lint
npm run build
```
