# Agri Advisory

A full-stack agricultural advisory application that helps farmers:

- register and log in securely,
- select crops,
- pick and save farm locations on a map,
- view weather overlays,
- generate 5-day crop-aware advisories.

## Tech Stack

- Frontend: React, Vite, React Router, Axios, React Leaflet, Leaflet Velocity
- Backend: Node.js, Express, JWT auth, PostgreSQL, Axios
- External APIs:
  - OpenWeather (forecast + weather map tiles)
  - OpenStreetMap Nominatim (reverse geocoding)

## Project Structure

- `backend/` - Express API, business logic, PostgreSQL access
- `frontend/` - React app (dashboard, map, advisory UI)

## Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL running locally
- OpenWeather API key

## Environment Variables

### Backend (`backend/.env`)

Create `backend/.env`:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
WEATHER_API_KEY=your_openweather_api_key
```

### Frontend (`frontend/.env`)

Create `frontend/.env`:

```env
VITE_WEATHER_API_KEY=your_openweather_api_key
```

## Database Setup

The backend uses PostgreSQL. Current DB connection values are defined in `backend/src/config/db.js`.

Default values in code:

- user: `postgres`
- password: `postgres`
- host: `localhost`
- port: `5432`
- database: `agri_advisory`

Create the database and required tables before running the app.

## Install Dependencies

From project root:

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Run Locally

Open two terminals.

### 1) Start Backend

```bash
cd backend
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2) Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at the Vite URL shown in terminal (typically `http://localhost:5173`).

## Main Features

- User registration and login
- JWT-protected dashboard access
- Crop selection per user
- Interactive map location selection
- Save and reuse farm locations
- District/state auto-fill using reverse geocoding
- Weather map layers (normal, rain, temperature, wind)
- 5-day advisory generation using weather forecast + crop rules

## API Overview

Base URL: `http://localhost:5000/api`

### Health

- `GET /` -> API status message

### Auth

- `POST /auth/register` -> register user
- `POST /auth/login` -> login, returns JWT token
- `GET /auth/me` -> validate token and return user payload (protected)

### Farm (Protected)

- `GET /farm/crops` -> list crops
- `POST /farm/select-crop` -> save selected crop for user
- `POST /farm/location` -> save location from latitude/longitude
- `GET /farm/locations` -> list saved user locations

### Weather

- `GET /weather?lat=<lat>&lon=<lon>` -> 5-day weather summary

### Advisory (Protected)

- `GET /advisory?lat=<lat>&lon=<lon>` -> 5-day advisory (weather + rule-based guidance)

## Authentication

Use Bearer token for protected routes:

```http
Authorization: Bearer <token>
```

Frontend automatically attaches token from `localStorage`.

## Troubleshooting

- Backend fails to start:
  - Check `backend/.env` values (`JWT_SECRET`, `WEATHER_API_KEY`).
  - Ensure PostgreSQL is running.
- Database errors:
  - Verify DB name/user/password in `backend/src/config/db.js`.
  - Confirm required tables exist (`users`, `crops`, `locations`, `user_crops`).
- Advisory or weather errors:
  - Confirm OpenWeather key is valid and active.
  - Check request includes valid `lat` and `lon`.
- Frontend cannot reach backend:
  - Ensure backend is running on `http://localhost:5000`.
  - Confirm frontend Axios base URL in `frontend/src/services/api.js`.

## Testing

Run the automated tests from each app folder:

```bash
cd backend && npm test
cd frontend && npm test
```

For watch mode:

```bash
cd backend && npm run test:watch
cd frontend && npm run test:watch
```

## Notes

- Current API has no automated tests configured.
- Frontend `frontend/README.md` is still the default Vite template and can be replaced later if needed.
