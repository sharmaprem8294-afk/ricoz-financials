document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.hidden = true;

  if (password !== confirmPassword) {
    errorMsg.textContent = 'Passwords do not match';
    errorMsg.hidden = false;
    return;
  }

  try {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();

    if (!res.ok) {
      errorMsg.textContent = data.error || 'Registration failed';
      errorMsg.hidden = false;
      return;
    }
    window.location.href = '/';
  } catch (err) {
    errorMsg.textContent = 'Could not reach the server. Try again.';
    errorMsg.hidden = false;
  }
});
