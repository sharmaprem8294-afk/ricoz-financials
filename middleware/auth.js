function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  // API calls get a JSON error; page requests get redirected to login.
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  return res.redirect('/');
}

module.exports = { requireAuth };
