const KPI_ICONS = {
  'Total revenue': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>',
  'Net profit': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v6c0 1.66 3.13 3 7 3s7-1.34 7-3V6"/><path d="M5 12v6c0 1.66 3.13 3 7 3s7-1.34 7-3v-6"/></svg>',
  'Operating margin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><line x1="8" y1="16" x2="16" y2="8"/><circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none"/><circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none"/></svg>',
  'Cash balance': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M16 12h3"/></svg>'
};

async function loadUser() {
  const res = await fetch('/api/auth/me');
  if (!res.ok) {
    window.location.href = '/';
    return;
  }
  const data = await res.json();
  document.getElementById('userName').textContent = data.name;
}

async function loadDashboard() {
  const res = await fetch('/api/dashboard-data');
  if (res.status === 401) {
    window.location.href = '/';
    return;
  }
  const data = await res.json();

  const kpiGrid = document.getElementById('kpiGrid');
  kpiGrid.innerHTML = data.kpis.map(k => `
    <div class="kpi-card">
      <div class="kpi-icon">${KPI_ICONS[k.label] || ''}</div>
      <p class="kpi-label">${k.label}</p>
      <p class="kpi-value">${k.value}</p>
      <p class="kpi-change ${k.change.startsWith('-') ? 'negative' : 'positive'}">${k.change}</p>
    </div>
  `).join('');

  new Chart(document.getElementById('revenueChart'), {
    type: 'line',
    data: {
      labels: data.revenueTrend.labels,
      datasets: [{
        label: 'Revenue (\u20B9 Lakh)',
        data: data.revenueTrend.values,
        borderColor: '#C81D42',
        backgroundColor: 'rgba(200, 29, 66, 0.06)',
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: '#C81D42'
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: '#E7E3DB' } }
      }
    }
  });

  const tbody = document.querySelector('#entityTable tbody');
  tbody.innerHTML = data.entities.map(e => `
    <tr>
      <td>${e.name}</td>
      <td>${e.revenue}</td>
      <td>${e.profit}</td>
      <td><span class="status-pill">${e.status}</span></td>
    </tr>
  `).join('');

  const list = document.getElementById('boardSummary');
  list.innerHTML = data.boardSummary.map(item => `
    <li>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><polyline points="8 12 11 15 16 9"/></svg>
      <span>${item}</span>
    </li>
  `).join('');
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
  await fetch('/api/auth/logout', { method: 'POST' });
  window.location.href = '/';
});

loadUser();
loadDashboard();