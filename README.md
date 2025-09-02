# Camillas-Weather-App

## 🌟Overview

A full-stack weather forecast web application that provides real-time weather data and supports user-specific features such as account creation and city favorites.
Designed to be lightweight, responsive, and API-secure, built as an end-to-end portfolio project.

### 🔍including:

- 🌡 Current temperature & daily temperature range
- 💧 Humidity
- 💨 Wind speed
- 🔆 UV index
- 🏷 Somatosensory temperature
- ☁ Weather conditions

## 🚀 Key Features

- User Authentication (Sign up / Log in) via Supabase Auth
- Personalized City Favorites: Add/Delete cities to your list
- Live Weather Data powered by OpenWeather API (proxied securely)
- Dynamic UI: Weather-based backgrounds and real-time updates
- Mobile-Friendly Layout using Tailwind CSS

## 🛠 Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Supabase (Auth + Database), Vercel Serverless Functions
- External APIs: OpenWeather APIs
- Deployment: Vercel

## 🌐 Live Demo

https://camillas-weather-app.vercel.app/

## 🔧 Local Development & Test

1. Clone this repository

```bash
git clone https://github.com/CamillaWan/weather-app.git
cd weather-app
```

2. Install dependencies

```bash
npm install
```

3. Set up your .env file with:

- OpenWeather API key
- Supabase project URL & anon key

4. Install Vercel CLI (for local API functions):

```bash
npm install -g vercel
```

5. Start the development server

- Frontend

```bash
npm run start
```

- optional, to serve API routes locally

```bash
vercel dev
```

This runs the app in development mode. Open http://localhost:3000 to view it in your browser.

6. Run tests

```bash
npm test
```

Runs tests in interactive watch mode.

## 🔐 About API Security

All external API requests are proxied via Vercel Serverless Functions to prevent exposure of API keys in the frontend. Check the /api/ directory for implementation details.

## ✨ Notes

This project was built as part of my job applications, to showcase my ability to deliver a full-stack product independently.
It reflects my learning journey and hands-on skills with modern web technologies.

