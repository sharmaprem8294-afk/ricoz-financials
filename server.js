const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');
const { requireAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Trust the hosting platform's proxy (Render, Railway, etc.) so secure
// cookies work correctly once deployed.
app.set('trust proxy', 1);

// Session-based auth. In production, set a SESSION_SECRET environment
// variable on your host instead of relying on the fallback below.
app.use(session({
    secret: process.env.SESSION_SECRET || 'local-dev-only-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  }
}));

// Static assets (CSS/JS). HTML pages are served explicitly below so the
// dashboard page itself can be protected, not just its data.
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.get('/dashboard.html', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.listen(PORT, () => {
  console.log(`RicozFinancials running at http://localhost:${PORT}`);
});
