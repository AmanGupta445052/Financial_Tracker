const express = require('express');
const router = express.Router();
const db = require('./db'); // Ensure this path is correct

// Get summary data for dashboard
router.get('/summary', (req, res) => {
    const userId = 1; // Change as needed
    const query = `
        SELECT 
            (SELECT SUM(amount) FROM Transactions WHERE user_id = ? AND type = 'income') AS total_income,
            (SELECT SUM(amount) FROM Transactions WHERE user_id = ? AND type = 'expense') AS total_expense
    `;
    db.query(query, [userId, userId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        const total_income = results[0].total_income || 0;
        const total_expense = results[0].total_expense || 0;
        const current_balance = total_income - total_expense;
        res.json({ total_income, total_expense, current_balance });
    });
});

// Export router
module.exports = router;
