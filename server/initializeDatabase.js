const connectToDatabase = require('./mongoClient');

async function insertInitialData() {
  const db = await connectToDatabase();
  console.log('Connected to MongoDB for data insertion');

  const users = [
    { name: 'John Doe', email: 'john@example.com', password: 'password123' },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'password1234' }
  ];

  const categories = [
    { category_name: 'Groceries' },
    { category_name: 'Rent' },
    { category_name: 'Salary' },
    { category_name: 'Entertainment' },
    { category_name: 'Utilities' },
    { category_name: 'Transport' },
    { category_name: 'Health' }
  ];

  const transactions = [
    { user_id: 1, date: '2024-07-01', amount: 50.00, category_id: 1, type: 'expense' },
    { user_id: 1, date: '2024-07-02', amount: 2000.00, category_id: 3, type: 'income' },
    { user_id: 1, date: '2024-07-03', amount: 700.00, category_id: 2, type: 'expense' },
    { user_id: 2, date: '2024-07-02', amount: 100.00, category_id: 2, type: 'expense' },
    { user_id: 2, date: '2024-07-02', amount: 2000.00, category_id: 3, type: 'income' }
  ];

  const budgets = [
    { user_id: 1, category_id: 1, amount: 500.00, month: 7, year: 2024 }
  ];

  const goals = [
    { user_id: 1, goal_description: 'Save for vacation', target_amount: 3000.00, current_amount: 1500.00, deadline: '2024-12-31' }
  ];

  try {
    await db.collection('Users').insertMany(users);
    await db.collection('Categories').insertMany(categories);
    await db.collection('Transactions').insertMany(transactions);
    await db.collection('Budgets').insertMany(budgets);
    await db.collection('Goals').insertMany(goals);

    console.log('Initial data inserted successfully');
  } catch (err) {
    console.error('Error inserting data:', err);
  }
}

insertInitialData().catch(console.error);
