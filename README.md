# React Movie App

A responsive movie browsing application built with React and Vite. Users can create a local account, log in, browse popular movies, search movies from TMDB, and save favourite movies in the browser.

## Features

- Login and signup flow using browser localStorage
- Protected movie pages for authenticated users
- Popular movie listing from The Movie Database API
- Movie search by title
- Rotating hero section using popular movie backdrops
- Favourite movie management
- Persistent favourites with localStorage
- Loading skeleton cards while movies are fetched
- Responsive navigation and movie card layout
- Vercel-friendly routing configuration

## Tech Stack

- React 19
- Vite 7
- React Router DOM
- JavaScript
- CSS
- TMDB API
- ESLint

## Project Structure

```text
REACT-PROJECT/
|-- public/
|-- src/
|   |-- Components/
|   |   |-- MovieCard.jsx
|   |   |-- MovieCardSkeleton.jsx
|   |   |-- NavBar.jsx
|   |   |-- ProtectedRoute.jsx
|   |   `-- Toast.jsx
|   |-- Context/
|   |   |-- AuthContext.jsx
|   |   `-- MovieContext.jsx
|   |-- CSS/
|   |-- Pages/
|   |   |-- Auth.jsx
|   |   |-- Favourites.jsx
|   |   |-- Home.jsx
|   |   |-- Login.jsx
|   |   `-- Register.jsx
|   |-- Services/
|   |   `-- API.js
|   |-- App.jsx
|   `-- main.jsx
|-- index.html
|-- package.json
|-- vite.config.js
|-- vercel.json
`-- README.md
```

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

Install dependencies:

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev
```

Runs the app in development mode.

```bash
npm run build
```

Builds the app for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## App Routes

- `/` - Login/signup screen
- `/home` - Protected movie browsing page
- `/favourites` - Protected favourites page

## API

Movie data is fetched from The Movie Database API in:

```text
src/Services/API.js
```

The app currently supports:

- Fetching popular movies
- Searching movies by query
- Loading poster images from TMDB image URLs
- Loading hero backdrop images from TMDB image URLs

## Authentication

This project uses browser localStorage for simple client-side authentication:

- Registered users are stored in `site_users`
- The active session is stored in `user`
- Protected routes redirect unauthenticated users to login

This is suitable for a frontend demo project. For production, authentication should be handled by a backend service with secure password storage and server-side sessions or tokens.

## Favourites

Favourite movies are stored in browser localStorage under:

```text
favorites
```

This keeps favourites available after refreshing the browser.

## Build and Deployment

Create a production build:

```bash
npm run build
```

The production files are generated in:

```text
dist/
```

The project includes `vercel.json` and redirect files for single-page app routing on static hosts.

## Notes

- Keep API keys private for production projects.
- Move API configuration to environment variables before deploying a real app.
- This project is frontend-only and stores user data in the browser.
