# RicozFinancials (demo)

A small enterprise financial reporting dashboard built with Node.js, Express, and plain HTML/CSS/JavaScript. Includes user authentication (sign up, log in, sessions) and a protected dashboard covering management accounts, consolidated reporting, board summaries, and KPI tracking — based on the assigned project brief.

## Tech stack
- **Backend:** Node.js + Express
- **Auth:** express-session (cookie sessions) + bcryptjs (password hashing)
- **Storage:** a local JSON file (`data/users.json`) — no database setup needed
- **Frontend:** plain HTML, CSS, JavaScript (no framework)
- **Charts:** Chart.js, loaded from a CDN (needs internet the first time it loads)

## Folder structure
```
ricoz-financials/
├── server.js              # Express app entry point
├── middleware/auth.js     # Route protection
├── routes/auth.js         # Register, login, logout, current user
├── routes/api.js          # Mock dashboard data (protected)
├── data/users.json        # Registered users (created automatically)
└── public/                # Frontend
    ├── index.html          # Login page
    ├── register.html       # Sign-up page
    ├── dashboard.html      # Protected dashboard
    ├── css/style.css
    └── js/ (login.js, register.js, dashboard.js)
```

## Setup

1. Install [Node.js](https://nodejs.org) (v18 or newer) if you don't already have it.
2. Unzip this project and open a terminal in the folder.
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open **http://localhost:3000** in your browser.
6. Click "Create an account" to register, then sign in.

## How the authentication works
- Passwords are hashed with bcrypt before being saved — never stored as plain text.
- On login, a session cookie is issued (`express-session`). Both the dashboard page and its data API check this session and reject/redirect if you're not logged in.
- Logging out destroys the session.

## Deploying (Render)

1. Push this project to a GitHub repo.
2. On [render.com](https://render.com), create a **New Web Service** and connect that repo.
3. Set:
   - **Build command:** `npm install`
   - **Start command:** `npm start`
4. Add an environment variable:
   - `SESSION_SECRET` = a long random string (anything unguessable)
   - `NODE_ENV` = `production`
5. Deploy. Render gives you a live `https://...onrender.com` URL.

Note: `data/users.json` resets whenever the service restarts or redeploys on most free hosting, since the filesystem isn't persistent. Fine for a demo; swap in a real database before relying on it for actual users.

## Before using this for anything real
This was built to be simple to run and easy to understand, not production-hardened:
- Move the session secret in `server.js` into an environment variable.
- Replace `data/users.json` with a real database — a JSON file isn't safe for concurrent writes, and the default session store resets on restart.
- Replace the mock data in `routes/api.js` with your real financial data source.
- Add HTTPS and rate-limiting on login before deploying anywhere public.

## About the data
The dashboard currently shows sample numbers (revenue, profit, KPIs) defined in `routes/api.js`, since the brief didn't include a real data source. Replace the `financialData` object there once you have real figures or a database to query.
