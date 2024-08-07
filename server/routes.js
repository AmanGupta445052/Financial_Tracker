const express = require('express');
const router = express.Router();
const connectToDatabase = require('./mongoClient'); // Ensure this path is correct

// Get summary data for dashboard
router.get('/summary', async (req, res) => {
  try {
    const db = await connectToDatabase();

    // Fetch data from MongoDB
    const usersCollection = db.collection('Users');
    const transactionsCollection = db.collection('Transactions');

    // Example queries
    const totalIncome = await transactionsCollection.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]).toArray();

    const totalExpense = await transactionsCollection.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]).toArray();

    const totalIncomeAmount = totalIncome.length ? totalIncome[0].total : 0;
    const totalExpenseAmount = totalExpense.length ? totalExpense[0].total : 0;
    const currentBalance = totalIncomeAmount - totalExpenseAmount;

    res.json({ total_income: totalIncomeAmount, total_expense: totalExpenseAmount, current_balance: currentBalance });
  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).send(err);
  }
});

module.exports = router;
