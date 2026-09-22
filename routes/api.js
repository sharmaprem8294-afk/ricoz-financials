const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

// Mock data standing in for a real data source (database, accounting
// system, etc). Replace this object once you have real figures to show.
const financialData = {
  kpis: [
    { label: 'Total revenue', value: '\u20B94.82 Cr', change: '+8.4%' },
    { label: 'Net profit', value: '\u20B91.15 Cr', change: '+5.1%' },
    { label: 'Operating margin', value: '23.9%', change: '+1.2%' },
    { label: 'Cash balance', value: '\u20B92.30 Cr', change: '-2.3%' }
  ],
  revenueTrend: {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [38, 41, 44, 40, 47, 52]
  },
  entities: [
    { name: 'Entity A \u2014 Mumbai', revenue: '\u20B91.9 Cr', profit: '\u20B90.42 Cr', status: 'On track' },
    { name: 'Entity B \u2014 Delhi', revenue: '\u20B91.3 Cr', profit: '\u20B90.28 Cr', status: 'On track' },
    { name: 'Entity C \u2014 Bangalore', revenue: '\u20B91.6 Cr', profit: '\u20B90.45 Cr', status: 'Ahead' }
  ],
  boardSummary: [
    'Consolidated revenue up 8.4% quarter-on-quarter across all entities.',
    'Entity C is outperforming forecast; Entity B is slightly behind on margin.',
    'Cash position is stable with no covenant breaches this quarter.'
  ]
};

router.get('/dashboard-data', requireAuth, (req, res) => {
  res.json(financialData);
});

module.exports = router;
