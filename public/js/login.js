document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.hidden = true;

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.error || 'Login failed';
      errorMsg.hidden = false;
      return;
    }
    window.location.href = '/dashboard.html';
  } catch (err) {
    errorMsg.textContent = 'Could not reach the server. Try again.';
    errorMsg.hidden = false;
  }
});
